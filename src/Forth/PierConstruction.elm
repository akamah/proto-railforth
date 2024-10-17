module Forth.PierConstruction exposing (toPierPlacement)

import Dict exposing (Dict)
import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation, PierMargin)
import Forth.Geometry.Rot45 as Rot45
import Types.Pier as Pier exposing (Pier)
import Types.PierPlacement exposing (PierPlacement)


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
            case f x b of
                Ok b2 ->
                    foldlResult f b2 xs

                Err err ->
                    Err err


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
                                Err <| "橋脚の方向が一致しません " ++ pierKey loc.location
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
    constructSinglePierRec [] 0 0 <| mergePierLocations list


constructSinglePierRec : List PierPlacement -> Int -> Int -> List ( Int, PierLocation ) -> Result String (List PierPlacement)
constructSinglePierRec accum current top locs =
    case locs of
        [] ->
            Ok accum

        ( h, l ) :: ls ->
            if top > h - l.margin.bottom then
                -- もし交差していて設置できなかったらエラーとする
                Err "ブロックの付いたレールとかの位置関係的に配置ができません"

            else
                -- current から h0 - l0.margin.bottom まで建設する。
                constructSinglePierRec
                    (buildSingleUpto l accum (h - l.margin.bottom) current)
                    h
                    (h + l.margin.top)
                    ls


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
            case List.head pierLocs of
                Nothing ->
                    Err "複線橋脚の構築で内部的なエラーが発生しました"

                -- something is wrong
                Just pierLoc ->
                    -- 巡回済みでないことを確認する
                    if Dict.member key open then
                        let
                            leftKey =
                                pierKey (Location.moveLeftByDoubleTrackLength pierLoc.location)
                        in
                        case ( Dict.get leftKey single, Dict.get leftKey open ) of
                            ( Just ( dir2, pierLocs2 ), _ ) ->
                                -- single　の方にすでに入れられたものと併合する。
                                if dir == dir2 then
                                    doubleTrackPiersRec
                                        (Dict.remove leftKey single)
                                        (Dict.insert key ( dir, pierLocs, pierLocs2 ) double)
                                        (Dict.remove key open)
                                        xs

                                else
                                    Err "複線橋脚の構築時に隣のレールとの方向が合いません"

                            ( _, Just ( dir2, pierLocs2 ) ) ->
                                -- open の方にまだ残っていたものと併合する
                                if dir == dir2 then
                                    doubleTrackPiersRec
                                        single
                                        (Dict.insert key ( dir, pierLocs, pierLocs2 ) double)
                                        (Dict.remove leftKey <| Dict.remove key open)
                                        xs

                                else
                                    Err "複線橋脚の構築時に隣のレールとの方向が合いません"

                            ( _, _ ) ->
                                -- 横方向にはなさそうなので、singleに追加する
                                doubleTrackPiersRec
                                    (Dict.insert key ( dir, pierLocs ) single)
                                    double
                                    (Dict.remove key open)
                                    xs

                    else
                        doubleTrackPiersRec single double open xs


doublePier : Dict String ( Dir, List PierLocation, List PierLocation ) -> Result String (List PierPlacement)
doublePier double =
    foldlResult
        (\( _, ( _, centerLocs, leftLocs ) ) result ->
            Result.map (\r1 -> List.append r1 result) (constructDoublePier centerLocs leftLocs)
        )
        []
    <|
        Dict.toList double


{-| 現状では、複線橋脚だけで建設することにする
-}
constructDoublePier : List PierLocation -> List PierLocation -> Result String (List PierPlacement)
constructDoublePier center left =
    let
        maxHeight =
            Basics.max (maximumHeight center) (maximumHeight left)
    in
    case List.head center of
        Nothing ->
            Err "複線橋脚の構築で内部的なエラーが発生しました"

        Just loc ->
            Ok <| buildDoubleUpto loc [] maxHeight 0


buildDoubleUpto : PierLocation -> List PierPlacement -> Int -> Int -> List PierPlacement
buildDoubleUpto template accum to from =
    if from >= to then
        accum

    else
        buildDoubleUpto
            template
            (pierLocationToPlacement Pier.Wide (PierLocation.setHeight from template) :: accum)
            to
            (from + Pier.getHeight Pier.Wide)


maximumHeight : List PierLocation -> Int
maximumHeight ls =
    List.foldl (\loc -> Basics.max loc.location.height) 0 ls



-- {-| 現状では、複線橋脚だけで建設することにする
-- -}
-- constructDoublePierRec : List PierPlacement -> Int -> Int -> List ( Int, PierLocation ) -> List ( Int, PierLocation ) -> Result String (List PierPlacement)
-- constructDoublePierRec accum current top centers lefts =
--     case ( centers, lefts ) of
--         ( [], [] ) ->
--             Ok accum
--         ( [], ( h1, l1 ) :: ys ) ->
--             ys
--         ( ( h0, l0 ) :: xs, [] ) ->
--             ys
--         ( [], ( h1, l1 ) :: ys ) ->
--             ys


{-| the main function of pier-construction
-}
toPierPlacement : List PierLocation -> Result String (List PierPlacement)
toPierPlacement list =
    list
        |> cleansePierPlacements
        |> divideIntoDict
        |> Result.andThen doubleTrackPiers
        |> Result.andThen
            (\( single, double ) ->
                Result.map2 (\s d -> s ++ d)
                    (singlePier single)
                    (doublePier double)
            )
