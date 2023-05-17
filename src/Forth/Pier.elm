module Forth.Pier exposing (..)

import Dict exposing (Dict)
import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Location as Location
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 exposing (Vec3)



{- 後から追加されるレールによって橋脚が単線から複線になったりすることも考えられるため、オンライン処理は諦めて最後に一括で行うことにした。 -}


type alias Dir4 =
    Dir


type alias PierLocation =
    { single : Rot45
    , double : Rot45
    , height : Int
    , dir : Dir4
    , spaceTop : Int
    , spaceBottom : Int
    }


type alias PierPlacement =
    { pier : Pier
    , position : Vec3
    , angle : Float
    }


pierLocationToPlacement : PierLocation -> PierPlacement
pierLocationToPlacement loc =
    { pier = Single

    -- STUB! very kitanai
    , position =
        Location.toVec3
            { single = loc.single
            , double = loc.double
            , height = loc.height
            }
    , angle = Dir.toRadian loc.dir
    }


type Pier
    = Single
    | Wide
    | Mini


pierKey : Rot45 -> Rot45 -> String
pierKey x y =
    Rot45.toString x ++ "," ++ Rot45.toString y


construct : List PierLocation -> Dict String ( Dir4, List PierLocation )
construct piers =
    List.foldl constructRec Dict.empty piers


constructRec : PierLocation -> Dict String ( Dir4, List PierLocation ) -> Dict String ( Dir4, List PierLocation )
constructRec loc state =
    Dict.update (pierKey loc.single loc.double)
        (\maybe ->
            case maybe of
                Nothing ->
                    Just ( loc.dir, [ loc ] )

                Just ( dir, lis ) ->
                    if dir == loc.dir then
                        Just ( dir, loc :: lis )

                    else
                        -- ERROR!!!
                        Just ( dir, [] )
        )
        state


singlePier : Dict String ( Dir4, List PierLocation ) -> List PierPlacement
singlePier single =
    List.concatMap (\( _, ( _, loc ) ) -> List.map pierLocationToPlacement loc) <| Dict.toList single


toPierPlacement : List PierLocation -> List PierPlacement
toPierPlacement list =
    singlePier <| construct list


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
