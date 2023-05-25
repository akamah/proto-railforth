module Forth.PierConstruction exposing (toPierPlacement)

import Dict exposing (Dict)
import Forth.Geometry.Dir as Dir exposing (Dir)
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


pierKey : PierLocation -> String
pierKey loc =
    Rot45.toString loc.location.single ++ "," ++ Rot45.toString loc.location.double


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
            updateWithResult (pierKey loc)
                (\maybe ->
                    case maybe of
                        Nothing ->
                            Ok ( loc.location.dir, [ loc ] )

                        Just ( dir, lis ) ->
                            if dir == loc.location.dir then
                                Ok ( dir, loc :: lis )

                            else
                                Err <| "pier direction mismatch at " ++ pierKey loc
                )
        )
        Dict.empty


pierLocationToPlacement : Pier -> PierLocation -> PierPlacement
pierLocationToPlacement kind loc =
    { pier = kind
    , position = PierLocation.toVec3 loc
    , angle = Dir.toRadian loc.location.dir
    }


constructSinglePier : List PierLocation -> List PierPlacement
constructSinglePier list =
    constructSinglePierRec [] 0 <| mergePierLocations list


constructSinglePierRec : List PierPlacement -> Int -> List ( Int, PierLocation ) -> List PierPlacement
constructSinglePierRec accum current locs =
    case locs of
        [] ->
            accum

        [ ( h, l ) ] ->
            buildSingleUpto l accum (h - l.margin.bottom) current

        ( h0, l0 ) :: ( h1, l1 ) :: ls ->
            if h0 + l0.margin.top > h1 - l1.margin.bottom then
                -- もし交差していて設置できなかったらエラーとする
                Debug.todo "error"

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
    Result.Ok <|
        List.concatMap (Tuple.second >> Tuple.second >> constructSinglePier) <|
            Dict.toList single


{-| the main function of pier-construction
-}
toPierPlacement : List PierLocation -> Result String (List PierPlacement)
toPierPlacement list =
    Result.Ok list
        |> Result.map cleansePierPlacements
        |> Result.andThen divideIntoDict
        |> Result.andThen singlePier
