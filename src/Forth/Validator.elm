module Forth.Validator exposing (getUnmatchedRailTerminals)

import Dict exposing (Dict)
import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Joint as Joint exposing (Joint)
import Forth.Geometry.RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 as Rot45
import Forth.RailPiece as RailPiece
import Forth.RailPlacement exposing (RailPlacement)


getUnmatchedRailTerminals : List RailPlacement -> String
getUnmatchedRailTerminals railPlacements =
    List.concatMap RailPiece.getRailLocations railPlacements
        |> toDict
        |> findUnmatchedRailTerminals
        |> String.join "\n"


keyOf : RailLocation -> String
keyOf loc =
    Rot45.toString loc.location.single ++ "," ++ Rot45.toString loc.location.double ++ "," ++ String.fromInt loc.location.height


insertWith : (a -> a -> a) -> comparable -> a -> Dict comparable a -> Dict comparable a
insertWith combine key value dict =
    case Dict.get key dict of
        Just oldValue ->
            Dict.insert key (combine value oldValue) dict

        Nothing ->
            Dict.insert key value dict


toDict : List RailLocation -> Dict String (List ( Dir, Joint ))
toDict locs =
    List.foldl
        (\l accum ->
            insertWith (\value oldValue -> value ++ oldValue)
                (keyOf l)
                [ ( l.location.dir, l.joint ) ]
                accum
        )
        Dict.empty
        locs


findUnmatchedRailTerminals : Dict String (List ( Dir, Joint )) -> List String
findUnmatchedRailTerminals dict =
    Dict.toList dict
        |> List.filterMap
            (\( k, ls ) ->
                case ls of
                    [ ( d1, j1 ), ( d2, j2 ) ] ->
                        if Dir.match d1 d2 && Joint.match j1 j2 then
                            Nothing

                        else
                            Just k

                    _ ->
                        Just k
            )
