module Forth.PierConstruction exposing (toPierPlacement)

import Dict exposing (Dict)
import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation, PierMargin)
import Forth.Geometry.Rot45 as Rot45
import Forth.Pier as Pier exposing (Pier)
import PierPlacement exposing (PierPlacement)


cleansePierPlacements : List PierLocation -> List PierLocation
cleansePierPlacements =
    List.map
        (\placement ->
            let
                loc =
                    placement.location
            in
            { placement | location = { loc | dir = Dir.toUndirectedDir loc.dir } }
        )


pierKey : Location -> String
pierKey loc =
    Rot45.toString loc.single ++ "," ++ Rot45.toString loc.double


foldlResult : (a -> b -> Result err b) -> b -> List a -> Result err b
foldlResult f b list =
    case list of
        [] ->
            Ok b

        x :: xs ->
            f x b
                |> Result.andThen (\b2 -> foldlResult f b2 xs)


updateWithResult : comparable -> (Maybe v -> Result e v) -> Dict comparable v -> Result e (Dict comparable v)
updateWithResult key f dict =
    f (Dict.get key dict)
        |> Result.map (\v -> Dict.insert key v dict)


divideIntoDict : List PierLocation -> Result String (Dict String ( Dir, List PierLocation ))
divideIntoDict =
    foldlResult
        (\loc ->
            updateWithResult (pierKey loc.location)
                (\maybe ->
                    case maybe of
                        Nothing ->
                            Ok ( loc.location.dir, [ loc ] )

                        Just ( dir, lis ) ->
                            if dir == loc.location.dir then
                                Ok ( dir, loc :: lis )

                            else
                                Err <| "pier direction mismatch at " ++ pierKey loc.location
                )
        )
        Dict.empty


pierLocationToPlacement : Pier -> PierLocation -> PierPlacement
pierLocationToPlacement kind loc =
    { pier = kind
    , position = PierLocation.toVec3 loc
    , angle = Dir.toRadian loc.location.dir
    }


constructSinglePier : List PierLocation -> Result String (List PierPlacement)
constructSinglePier list =
    constructSinglePierRec [] 0 <| mergePierLocations list


constructSinglePierRec : List PierPlacement -> Int -> List ( Int, PierLocation ) -> Result String (List PierPlacement)
constructSinglePierRec accum current locs =
    case locs of
        [] ->
            Ok accum

        [ ( h, l ) ] ->
            Ok <| buildSingleUpto l accum (h - l.margin.bottom) current

        ( h0, l0 ) :: ( h1, l1 ) :: ls ->
            if h0 + l0.margin.top > h1 - l1.margin.bottom then
                -- もし交差していて設置できなかったらエラーとする
                Err "error on pier construction"

            else
                -- current から h0 - l0.margin.bottom まで建設する。
                constructSinglePierRec
                    (buildSingleUpto l0 accum (h0 - l0.margin.bottom) current)
                    h0
                    (( h1, l1 ) :: ls)


buildSingleUpto : PierLocation -> List PierPlacement -> Int -> Int -> List PierPlacement
buildSingleUpto template accum to from =
    if from >= to then
        accum

    else if to >= from + Pier.getHeight Pier.Single then
        buildSingleUpto
            template
            (pierLocationToPlacement Pier.Single (PierLocation.setHeight from template) :: accum)
            to
            (from + Pier.getHeight Pier.Single)

    else
        buildSingleUpto
            template
            (pierLocationToPlacement Pier.Mini (PierLocation.setHeight from template) :: accum)
            to
            (from + Pier.getHeight Pier.Mini)


mergeMargin : PierMargin -> PierMargin -> PierMargin
mergeMargin x y =
    { top = max x.top y.top
    , bottom = max x.bottom y.bottom
    }


mergePierLocations : List PierLocation -> List ( Int, PierLocation )
mergePierLocations list =
    Dict.toList <|
        List.foldl
            (\loc ->
                Dict.update loc.location.height <|
                    \elem ->
                        case elem of
                            Nothing ->
                                Just loc

                            Just x ->
                                Just { x | margin = mergeMargin x.margin loc.margin }
            )
            Dict.empty
            list


singlePier : Dict String ( Dir, List PierLocation ) -> Result String (List PierPlacement)
singlePier single =
    foldlResult
        (\( _, ( _, pierLocs ) ) result ->
            Result.map (\r1 -> List.append r1 result) (constructSinglePier pierLocs)
        )
        []
    <|
        Dict.toList single


doubleTrackPiers : Dict String ( Dir, List PierLocation ) -> Result String ( Dict String ( Dir, List PierLocation ), Dict String ( Dir, List PierLocation, List PierLocation ) )
doubleTrackPiers dict =
    doubleTrackPiersRec Dict.empty Dict.empty dict (Dict.toList dict)


doubleTrackPiersRec :
    Dict String ( Dir, List PierLocation )
    -> Dict String ( Dir, List PierLocation, List PierLocation )
    -> Dict String ( Dir, List PierLocation )
    -> List ( String, ( Dir, List PierLocation ) )
    -> Result String ( Dict String ( Dir, List PierLocation ), Dict String ( Dir, List PierLocation, List PierLocation ) )
doubleTrackPiersRec single double open list =
    case list of
        [] ->
            Ok ( single, double )

        ( key, ( dir, pierLocs ) ) :: xs ->
            case pierLocs of
                [] ->
                    Err "pier list is empty"

                -- something is wrong
                pierLoc :: _ ->
                    -- 巡回済みでないことを確認する
                    if Dict.member key open then
                        let
                            leftKey =
                                pierKey (Location.moveLeftByDoubleTrackLength pierLoc.location)
                        in
                        case Dict.get leftKey single of
                            Just ( dir2, pierLocs2 ) ->
                                -- single　の方にすでに入れられたものと併合する。
                                if dir == dir2 then
                                    doubleTrackPiersRec
                                        (Dict.remove leftKey single)
                                        (Dict.insert key ( dir, pierLocs, pierLocs2 ) double)
                                        (Dict.remove key open)
                                        xs

                                else
                                    Err "direction mismatch with neighbor"

                            Nothing ->
                                case Dict.get leftKey open of
                                    Just ( dir2, pierLocs2 ) ->
                                        -- open の方にまだ残っていたものと併合する
                                        if dir == dir2 then
                                            doubleTrackPiersRec
                                                single
                                                (Dict.insert key ( dir, pierLocs, pierLocs2 ) double)
                                                (Dict.remove leftKey <| Dict.remove key open)
                                                xs

                                        else
                                            Err "direction mismatch with neighbor"

                                    Nothing ->
                                        -- 横方向にはなさそうなので、singleに追加する
                                        doubleTrackPiersRec
                                            (Dict.insert key ( dir, pierLocs ) single)
                                            double
                                            (Dict.remove key open)
                                            xs

                    else
                        doubleTrackPiersRec single double open xs


doublePier : Dict String ( Dir, List PierLocation, List PierLocation ) -> Result String (List PierPlacement)
doublePier dict =
    Ok []


{-| the main function of pier-construction
-}
toPierPlacement : List PierLocation -> Result String (List PierPlacement)
toPierPlacement list =
    Result.Ok list
        |> Result.map cleansePierPlacements
        |> Result.andThen divideIntoDict
        |> Result.andThen doubleTrackPiers
        |> Result.andThen
            (\( single, double ) ->
                Result.map2 (\s d -> s ++ d)
                    (singlePier single)
                    (doublePier double)
            )
