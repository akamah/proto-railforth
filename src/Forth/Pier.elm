module Forth.Pier exposing
    ( Pier(..)
    , PierPlacement
    , toPierPlacement
    , toString
    )

import Dict exposing (Dict)
import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.PierLocation as PierLocation exposing (Dir4, PierLocation)
import Forth.Geometry.Rot45 as Rot45
import Math.Vector3 exposing (Vec3)



{- 後から追加されるレールによって橋脚が単線から複線になったりすることも考えられるため、オンライン処理は諦めて最後に一括で行うことにした。 | -}


type alias PierPlacement =
    { pier : Pier
    , position : Vec3
    , angle : Float
    }


pierLocationToPlacement : PierLocation -> PierPlacement
pierLocationToPlacement loc =
    { pier = Single -- stub!
    , position = PierLocation.toVec3 loc
    , angle = Dir.toRadian loc.dir
    }


type Pier
    = Single
    | Wide
    | Mini


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
                            Ok ( loc.dir, [ loc ] )

                        Just ( dir, lis ) ->
                            if dir == loc.dir then
                                Ok ( dir, loc :: lis )

                            else
                                Err <| "pier direction mismatch at " ++ pierKey loc
                )
        )
        Dict.empty


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
        |> Debug.log "pier"


toString : Pier -> String
toString pier =
    case pier of
        Single ->
            "pier"

        Wide ->
            "pier_wide"

        Mini ->
            "pier_4"



-- doubleTrackConstruct : Dict String ( Dir4, List PierLocation ) -> ( Dict String ( Dir4, List PierLocation ), Dict String ( Dir4, List PierLocation, List PierLocation ) )
-- doubleTrackConstruct state = doubleTrackConstructRec state Dict.empty Dict.empty
-- doubleTrackConstructRec state single double =
