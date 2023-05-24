module Forth.PierConstruction exposing (..)

import Dict exposing (Dict)
import Forth.Geometry.Dir4 as Dir4 exposing (Dir4)
import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation)
import Forth.Geometry.Rot45 as Rot45
import Forth.Pier as Pier
import PierPlacement exposing (PierPlacement)


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


divideIntoDict : List PierLocation -> Result String (Dict String ( Dir4, List PierLocation ))
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


pierLocationToPlacement : PierLocation -> PierPlacement
pierLocationToPlacement loc =
    { pier = Pier.Single -- stub!
    , position = PierLocation.toVec3 loc
    , angle = Dir4.toRadian loc.location.dir
    }


singlePier : Dict String ( Dir4, List PierLocation ) -> Result String (List PierPlacement)
singlePier single =
    Result.Ok <|
        List.concatMap (Tuple.second >> Tuple.second >> List.map pierLocationToPlacement) <|
            Dict.toList single


{-| the main function of pier-construction
-}
toPierPlacement : List PierLocation -> Result String (List PierPlacement)
toPierPlacement list =
    Result.Ok list
        |> Result.andThen divideIntoDict
        |> Result.andThen singlePier
