module Forth.PierConstraction.Impl exposing (construct)

-- このモジュールでは、端点の集合（もしくはリスト）から橋脚の集合を構築する。

import Dict exposing (Dict)
import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation, PierMargin)
import Forth.Geometry.Rot45 as Rot45
import Types.Pier as Pier exposing (Pier)
import Types.PierRenderData exposing (PierRenderData)
import Util exposing (foldlResult, updateWithResult)



{-
   # 橋脚の構築

   レールの集合が与えられるので、そこから適切な橋脚を構築する必要がある。
   レールには端点がいくつかあり、8方向を向いているが、背中合わせのものは同一視できるので4種類となる。
   この端点の情報から橋脚を構築する。

   その際に以下のルールが求められる。

   1. 全ての端点について、平面座標が同じであれば同じ向きにならなければならない。
   2. 同じ平面座標における端点については、高さの一次元情報から橋脚の種類が必要最低限の形で求められる。
     - 単線の橋脚がどのように構築されるかは実際のアルゴリズムが別途存在する
   3.　1つの複線間隔を隔てられ、「横に」隣り合う端点は複線橋脚を共有するものとみなされる。
     - 複線の橋脚についても、構築のアルゴリズムが別途記述される
   4. 2つの複線橋脚が共有されるような点は存在できない; 幅が3つの伏線橋脚が存在しないため。

   さらに、複線幅を考慮するにあたってレールの途中にも置かなければならないパターンが存在する。

   5. 複線橋脚を考慮するにあたって、あるレールの途中に単点だけを見たら不要と思われる複線橋脚が置かれることがある。
     - 例えば、2倍直線レールの複線幅を隔てた隣に、1倍の直線レールが並んでいた際、
       2倍曲線レールの途中に配置可能であれば、1倍レールの端点に関しても複線幅を考慮した橋脚を設置しなければならない
   6. 逆に、複線幅を隔てた隣にあるレールに対して、こう言った処理が許可されない場合もある。
     - ターンアウトレールの途中に複線幅を隔てたレールの端点があったとしても、それは現実には構成不可能な橋脚なので拒否する。

-}


{-| 橋脚の方向を、8方向から4方向に直す
-}
cleansePierLocations : PierLocation -> PierLocation
cleansePierLocations placement =
    let
        loc =
            placement.location
    in
    { placement | location = { loc | dir = Dir.toUndirectedDir loc.dir } }


{-| 座標の位置を文字列にエンコードする。主にDictのキーにするために使う
-}
pierKey : Location -> String
pierKey loc =
    Rot45.toString loc.single ++ "," ++ Rot45.toString loc.double


{-| pierLocationを、平面座標ごとに一括りにする
-}
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


pierLocationToPlacement : Pier -> PierLocation -> PierRenderData
pierLocationToPlacement kind loc =
    { pier = kind
    , position = PierLocation.toVec3 loc
    , angle = Dir.toRadian loc.location.dir
    }


constructSinglePier : List PierLocation -> Result String (List PierRenderData)
constructSinglePier list =
    constructSinglePierRec [] 0 0 <| mergePierLocations list


constructSinglePierRec : List PierRenderData -> Int -> Int -> List ( Int, PierLocation ) -> Result String (List PierRenderData)
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


buildSingleUpto : PierLocation -> List PierRenderData -> Int -> Int -> List PierRenderData
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


singlePier : Dict String ( Dir, List PierLocation ) -> Result String (List PierRenderData)
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


doublePier : Dict String ( Dir, List PierLocation, List PierLocation ) -> Result String (List PierRenderData)
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
constructDoublePier : List PierLocation -> List PierLocation -> Result String (List PierRenderData)
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


buildDoubleUpto : PierLocation -> List PierRenderData -> Int -> Int -> List PierRenderData
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


type alias PierConstructionParams =
    { must : List PierLocation --| 必ず設置する場所のリスト
    , may : List Location --| 設置してもよい（複線の場合は配置しなければならない場所）のリスト
    , mustNot : List Location --| 設置してはならない場所のリスト
    }


type alias PierConstructionResult =
    { pierRenderData : List PierRenderData
    , error : Maybe PierConstructionError
    }


type alias PierConstructionError =
    String


{-| the main function of pier-construction
-}
construct : PierConstructionParams -> PierConstructionResult
construct { must } =
    case
        must
            |> List.map cleansePierLocations
            |> divideIntoDict
            |> Result.andThen doubleTrackPiers
            |> Result.andThen
                (\( single, double ) ->
                    Result.map2 (\s d -> s ++ d)
                        (singlePier single)
                        (doublePier double)
                )
    of
        Ok pierRenderData ->
            { pierRenderData = pierRenderData
            , error = Nothing
            }

        Err err ->
            { pierRenderData = []
            , error = Just err
            }
