module Forth.PierConstruction.ImplTest exposing (suite)

import Expect exposing (..)
import Forth.Geometry.Location as L exposing (Location)
import Forth.Geometry.PierLocation exposing (PierLocation)
import Forth.LocationDefinition as LD
import Forth.PierConstraction.Impl exposing (PierConstructionResult, construct)
import Forth.PierConstraint exposing (PierConstraint)
import Forth.PierConstraintDefinition exposing (flat)
import Forth.PierPlacement as PP exposing (PierPlacement)
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


may : List PierLocation -> List Location -> PierConstraint
may pierLocations locations =
    { must = pierLocations, may = locations, mustNot = [] }


mustNot : List PierLocation -> List Location -> PierConstraint
mustNot pierLocations locations =
    { must = pierLocations, may = [], mustNot = locations }


suite : Test
suite =
    describe "PierConstruction.Impl"
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
