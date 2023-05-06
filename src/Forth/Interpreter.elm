module Forth.Interpreter exposing (execute)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.Rot45 as Rot45
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import RailPlacement exposing (RailPlacement)


pair : a -> a -> Nonempty a
pair a b =
    Nonempty a [ b ]


triple : a -> a -> a -> Nonempty a
triple a b c =
    Nonempty a [ b, c ]


quadruple : a -> a -> a -> a -> Nonempty a
quadruple a b c d =
    Nonempty a [ b, c, d ]


type alias RailPiece =
    Nonempty Location


zero : Location
zero =
    Location.make Rot45.zero Rot45.zero 0 Dir.e Joint.Minus


straight : Nonempty Location
straight =
    pair
        zero
        (Location.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.e Joint.Plus)


curve : Nonempty Location
curve =
    pair
        zero
        (Location.make (Rot45.make 0 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus)


invert : IsInverted -> RailPiece -> RailPiece
invert inverted piece =
    case inverted of
        NotInverted ->
            piece

        Inverted ->
            Nonempty.map Location.invert piece


flip : IsFlipped -> RailPiece -> RailPiece
flip flipped piece =
    case flipped of
        NotFlipped ->
            piece

        Flipped ->
            Nonempty.map Location.flip piece


getLocalLocation : Rail IsInverted IsFlipped -> Location
getLocalLocation rail =
    case rail of
        Straight ->
            Location.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.e Joint.Plus

        Curve NotFlipped ->
            Location.make (Rot45.make 0 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus

        Curve Flipped ->
            Location.make (Rot45.make 0 4 -4 0) Rot45.zero 0 Dir.se Joint.Plus

        _ ->
            Debug.todo "getLocalLocation turnout"


getNextLocation : Location -> Rail IsInverted IsFlipped -> Location
getNextLocation loc rail =
    let
        local =
            getLocalLocation rail

        single2 =
            Rot45.add loc.single <|
                Rot45.mul (Dir.toRot45 loc.dir) local.single

        double2 =
            Rot45.add loc.double <|
                Rot45.mul (Dir.toRot45 loc.dir) local.double

        height2 =
            loc.height + local.height

        dir2 =
            Dir.mul loc.dir local.dir
    in
    Location.make single2 double2 height2 dir2 Joint.Plus


tokenize : String -> List String
tokenize =
    String.words


execute : String -> List RailPlacement
execute src =
    let
        tokens =
            tokenize src
    in
    executeRec (Location.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus) tokens


executeRec : Location -> List String -> List RailPlacement
executeRec loc toks =
    case toks of
        [] ->
            []

        t :: ts ->
            case t of
                "s" ->
                    let
                        rail =
                            Straight
                    in
                    RailPlacement.make rail (Location.originToVec3 loc) (Dir.toRadian loc.dir)
                        :: executeRec (getNextLocation loc rail) ts

                "l" ->
                    let
                        rail =
                            Curve NotFlipped
                    in
                    RailPlacement.make rail (Location.originToVec3 loc) (Dir.toRadian loc.dir)
                        :: executeRec (getNextLocation loc rail) ts

                "r" ->
                    let
                        rail =
                            Curve Flipped
                    in
                    RailPlacement.make rail (Location.originToVec3 loc) (Dir.toRadian loc.dir)
                        :: executeRec (getNextLocation loc rail) ts

                _ ->
                    executeRec loc ts
