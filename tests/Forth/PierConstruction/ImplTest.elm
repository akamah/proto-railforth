module Forth.PierConstruction.ImplTest exposing (suite)

import Expect exposing (..)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.PierLocation exposing (PierLocation)
import Forth.LocationDefinition as LD
import Forth.PierConstraction.Impl exposing (PierConstructionResult, construct)
import Forth.PierConstraint as PierConstraint exposing (PierConstraint)
import Forth.PierConstraintDefinition exposing (flat, getPierConstraint)
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
                construct (must [ LD.straight 0 |> flat, LD.straight 4 |> flat ])
                    |> expectOk []
        , test "construct a straight rail" <|
            \_ ->
                construct (must [ LD.straightAndUp 4 0 |> flat, LD.straightAndUp 4 4 |> flat ])
                    |> expectOk
                        [ PP.make Single <| LD.straight 0
                        , PP.make Single <| LD.straight 4
                        ]
        ]
