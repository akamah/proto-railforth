module Forth.PierConstruction.ImplTest exposing (suite)

import Dict
import Expect exposing (..)
import Forth.Geometry.Location as L exposing (Location)
import Forth.Geometry.PierLocation exposing (PierLocation)
import Forth.LocationDefinition as LD
import Forth.PierConstraction.Impl as Impl exposing (PierConstructionResult, construct)
import Forth.PierConstraint exposing (PierConstraint)
import Forth.PierConstraintDefinition exposing (flat, slopeCurve)
import Forth.PierPlacement as PP exposing (PierPlacement)
import Http.Progress exposing (Progress(..))
import List.Nonempty as Nonempty
import Test exposing (..)
import Types.Pier exposing (Pier(..))
import Types.Rail exposing (IsFlipped(..), Rail(..))


expectOk : List PierPlacement -> PierConstructionResult -> Expectation
expectOk placements =
    Expect.all
        [ \result -> Expect.equal Nothing result.error
        , \result -> Expect.equal (sortPierPlacement placements) (sortPierPlacement result.pierPlacements)
        ]


sortPierPlacement : List PierPlacement -> List PierPlacement
sortPierPlacement =
    List.sortWith PP.compare


must : List PierLocation -> PierConstraint
must pierLocations =
    { must = pierLocations, may = [], mustNot = [] }


may : List PierLocation -> List PierLocation -> PierConstraint
may pierLocations locations =
    { must = pierLocations, may = locations, mustNot = [] }


mustNot : List PierLocation -> List Location -> PierConstraint
mustNot pierLocations locations =
    { must = pierLocations, may = [], mustNot = locations }


constructSuite : Test
constructSuite =
    describe "construct"
        [ test "construct empty" <|
            \_ ->
                construct (must [])
                    |> expectOk []
        , test "constructing a straight rail on the ground results in empty " <|
            \_ ->
                construct
                    (must
                        [ LD.straight 4 |> flat
                        ]
                    )
                    |> expectOk []
        , test "construct a pier" <|
            \_ ->
                construct
                    (must
                        [ LD.straight 4 |> L.setHeight 4 |> flat
                        ]
                    )
                    |> expectOk
                        [ LD.straight 4 |> PP.make Single
                        ]
        , test "construct a wide pier" <|
            \_ ->
                construct
                    (must
                        [ LD.straight 4 |> L.setHeight 4 |> flat
                        , LD.straightDoubleLeft 4 |> L.setHeight 4 |> flat
                        ]
                    )
                    |> expectOk
                        [ LD.straight 4 |> PP.make Wide
                        ]
        , test "construct mini and single piers" <|
            \_ ->
                construct
                    (must
                        [ LD.straight 4 |> L.setHeight 0 |> flat
                        , LD.straight 4 |> L.setHeight 5 |> flat
                        , LD.straight 4 |> L.setHeight 15 |> flat
                        ]
                    )
                    |> expectOk
                        [ LD.straight 4 |> L.setHeight 0 |> PP.make Single
                        , LD.straight 4 |> L.setHeight 4 |> PP.make Mini
                        , LD.straight 4 |> L.setHeight 5 |> PP.make Single
                        , LD.straight 4 |> L.setHeight 9 |> PP.make Single
                        , LD.straight 4 |> L.setHeight 13 |> PP.make Mini
                        , LD.straight 4 |> L.setHeight 14 |> PP.make Mini
                        ]

        -- -- XFAIL
        -- , test "construct a single pier on a wide pier" <|
        --     \_ ->
        --         construct
        --             (must
        --                 [ LD.straight 4 |> L.setHeight 0 |> flat
        --                 , LD.straightDoubleLeft 4 |> L.setHeight 0 |> flat
        --                 , LD.straight 4 |> L.setHeight 8 |> flat
        --                 ]
        --             )
        --             |> expectOk
        --                 [ LD.straight 4 |> PP.make Wide
        --                 , LD.straight 4 |> L.setHeight 4 |> PP.make Single
        --                 ]
        -- -- XFAIL
        -- , test "construct a wide pier if necessary" <|
        --     \_ ->
        --         construct
        --             (may
        --                 [ LD.straight 4 |> L.setHeight 4 |> flat
        --                 ]
        --                 [ LD.straightDoubleLeft 4 |> L.setHeight 4 ]
        --             )
        --             |> expectOk
        --                 [ LD.straight 4 |> PP.make Wide
        --                 ]
        ]


constructDoubleTrackPiersSuite : Test
constructDoubleTrackPiersSuite =
    let
        center =
            LD.straight 4

        left =
            LD.straightDoubleLeft 4
    in
    describe "constructDoubleTrackPiers"
        [ test "empty" <|
            \_ ->
                Impl.constructDoubleTrackPiers Dict.empty
                    |> Expect.equal
                        { single = Dict.empty, double = Dict.empty }
        , test "one" <|
            \_ ->
                Impl.constructDoubleTrackPiers
                    (Dict.singleton (Impl.pierPlanarKey center) <| Nonempty.singleton (center |> flat))
                    |> Expect.equal
                        { single = Dict.singleton (Impl.pierPlanarKey center) <| Nonempty.singleton (center |> flat), double = Dict.empty }
        , test "double" <|
            \_ ->
                Impl.constructDoubleTrackPiers
                    (Dict.fromList
                        [ ( Impl.pierPlanarKey center, Nonempty.singleton (center |> flat) )
                        , ( Impl.pierPlanarKey left, Nonempty.singleton (left |> flat) )
                        ]
                    )
                    |> Expect.equal
                        { single = Dict.empty, double = Dict.singleton (Impl.pierPlanarKey center) <| ( Nonempty.singleton (center |> flat), Nonempty.singleton (left |> flat) ) }
        ]


findNeighborMayLocationsSuite : Test
findNeighborMayLocationsSuite =
    describe "findNeighborMayLocationsSuite"
        [ test "found left" <|
            \_ ->
                Impl.findNeighborMayLocations
                    [ LD.straight 4 |> flat ]
                    [ LD.straightDoubleLeft 4 |> flat ]
                    |> Expect.equal [ LD.straightDoubleLeft 4 |> flat ]
        , test "found right" <|
            \_ ->
                Impl.findNeighborMayLocations
                    [ LD.straight 4 |> flat ]
                    [ LD.straightDoubleRight 4 |> flat ]
                    |> Expect.equal [ LD.straightDoubleRight 4 |> flat ]
        , test "found right and left" <|
            \_ ->
                Impl.findNeighborMayLocations
                    [ LD.straight 4 |> flat ]
                    [ LD.straightDoubleLeft 4 |> flat, LD.straightDoubleRight 4 |> flat ]
                    -- TODO: ここは順不同でテストしたい
                    |> Expect.equal [ LD.straightDoubleRight 4 |> flat, LD.straightDoubleLeft 4 |> flat ]
        , test "didn't find if the height is different" <|
            \_ ->
                Impl.findNeighborMayLocations
                    [ LD.straight 4 |> flat ]
                    [ LD.straight 4 |> L.setHeight 4 |> flat ]
                    |> Expect.equal []
        ]


constructSinglePier2Suite : Test
constructSinglePier2Suite =
    describe "constructSinglePier2"
        [ test "empty" <|
            \_ ->
                Impl.constructSinglePier2 [] |> Expect.equal []
        , test "on the ground" <|
            \_ ->
                Impl.constructSinglePier2
                    [ LD.straight 4 |> flat ]
                    |> Expect.equal []
        , test "one location" <|
            \_ ->
                Impl.constructSinglePier2
                    [ LD.straight 4 |> L.setHeight 10 |> flat ]
                    |> Expect.equal
                        [ LD.straight 4 |> L.setHeight 0 |> PP.make Single
                        , LD.straight 4 |> L.setHeight 4 |> PP.make Single
                        , LD.straight 4 |> L.setHeight 8 |> PP.make Mini
                        , LD.straight 4 |> L.setHeight 9 |> PP.make Mini
                        ]
        , test "two locations" <|
            \_ ->
                Impl.constructSinglePier2
                    [ LD.straight 4 |> L.setHeight 3 |> flat
                    , LD.straight 4 |> L.setHeight 10 |> flat
                    ]
                    |> Expect.equal
                        [ LD.straight 4 |> L.setHeight 0 |> PP.make Mini
                        , LD.straight 4 |> L.setHeight 1 |> PP.make Mini
                        , LD.straight 4 |> L.setHeight 2 |> PP.make Mini
                        , LD.straight 4 |> L.setHeight 3 |> PP.make Single
                        , LD.straight 4 |> L.setHeight 7 |> PP.make Mini
                        , LD.straight 4 |> L.setHeight 8 |> PP.make Mini
                        , LD.straight 4 |> L.setHeight 9 |> PP.make Mini
                        ]
        , test "slope curve" <|
            \_ ->
                Impl.constructSinglePier2
                    [ LD.straight 4 |> L.setHeight 5 |> slopeCurve
                    , LD.straight 4 |> L.setHeight 11 |> slopeCurve
                    ]
                    |> Expect.equal
                        [ LD.straight 4 |> L.setHeight 0 |> PP.make Single
                        , LD.straight 4 |> L.setHeight 5 |> PP.make Single
                        , LD.straight 4 |> L.setHeight 9 |> PP.make Mini
                        ]
        ]


constructDoublePier2Suite : Test
constructDoublePier2Suite =
    describe "constructDoublePier2Suite"
        [ test "empty" <|
            \_ ->
                Impl.constructDoublePier2 [] [] |> Expect.equal []
        , test "on the ground" <|
            \_ ->
                Impl.constructDoublePier2
                    [ LD.straight 4 |> flat ]
                    [ LD.straightDoubleRight 4 |> flat ]
                    |> Expect.equal []
        ]


suite : Test
suite =
    describe "PierConstruction.Impl"
        [ constructSuite
        , constructDoubleTrackPiersSuite
        , findNeighborMayLocationsSuite
        , constructSinglePier2Suite
        ]
