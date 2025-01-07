module Forth.PierConstraction.Impl exposing
    ( PierConstructionResult
    , construct
    , constructDoublePier
    , constructDoubleTrackPiers
    , constructSinglePier
    , findNeighborMayLocations
    , pierPlanarKey
    )

-- このモジュールでは、端点の集合（もしくはリスト）から橋脚の集合を構築する。

import Dict exposing (Dict)
import Forth.Geometry.Dir as Dir
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.PierLocation as PL exposing (PierLocation)
import Forth.Geometry.Rot45 as Rot45
import Forth.PierConstraint exposing (PierConstraint)
import Forth.PierPlacement as PierPlacement exposing (PierPlacement)
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Set
import Types.Pier as Pier exposing (Pier(..))
import Util



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
✅ この関数は今後も使う。
TODO: Dirにもっと良い型がほしい
-}
cleansePierLocations : PierLocation -> PierLocation
cleansePierLocations placement =
    let
        loc =
            placement.location
    in
    { placement | location = { loc | dir = Dir.toUndirectedDir loc.dir } }


type alias PierPlanarKey =
    String


type alias PierSpatialKey =
    String


{-| 座標の位置を文字列にエンコードする。主にDictのキーにするために使う
-}
pierPlanarKey : Location -> PierPlanarKey
pierPlanarKey { single, double, dir } =
    String.join "," [ Rot45.toString single, Rot45.toString double, Dir.toString dir ]


pierSpatialKey : Location -> PierSpatialKey
pierSpatialKey { single, double, dir, height } =
    String.join "," [ Rot45.toString single, Rot45.toString double, Dir.toString dir, String.fromInt height ]


{-| pierLocationsをDictに変換してソートもするやつ。主にこれを使う。
locationでもPierLocationでも使えるようにgetterを持たせておいた
-}
buildPierKeyDict : (location -> comparable) -> (location -> location -> Order) -> List location -> Dict comparable (Nonempty location)
buildPierKeyDict keyOf comparator locs =
    Util.splitByKey keyOf locs
        |> Dict.map (\_ list -> Nonempty.sortWith comparator list |> Nonempty.dedup)


{-| 単線の橋脚の位置の集合から、(単線,複線) の橋脚の位置の集合を計算する。

具体的には、

1.  initialSet が与えられる。
2.  initialSetから　1つ取り出し、sとする
3.  sの左隣の位置がinitialSetに入っているならば、取り出してdとする。
      - sとdをdoubleSetに移動する。

```ruby
def combine(initialSet)
  singleSet = {}
  doubleSet = {}

  while s = initialSet.pop()
    l = left(s)

    # あれよね、sの右にあったらエラーよね。もしsの右が処理済みだったとしたら、sはdoubleとして裁かれてるので、
    # sの右は処理済みではない。なのでエラー処理するにしてもinitialSetから見て確認する必要がある。
    if initialSet[right(s)]
      error
    end

    if d = initialSet[l]
      initialSet.remove(d)
      # あと、dの左にあるかもしれない。そうなったらエラーや。
      # そこに関しては、処理済みかどうかはあまり関係ないと思うので全部から確認する。
      if initialSet[left(d)] or singleSet[left(d)] or doubleSet[left(d)]
        error
      end

      # そうでないならば、いい感じに構築できる。
      doubleSet << s
    else
      singleSet << s
    end
  end

  return singleSet, doubleSet
```

色々終わったら (singleSet, doubleSet) を返却する

-}
getLeft : Location -> Location
getLeft location =
    Location.moveLeftByDoubleTrackLength location


getRight : Location -> Location
getRight location =
    Location.moveRightByDoubleTrackLength location


{-| mustに入っているそれぞれの座標の、ちょうど左右の隣にあるmayの座標を、必ず設置するように変換する.
まあ左右両方に合った場合はエラーなのですが、橋脚が構築される方が嬉しいためそのように振る舞う。
-}
findNeighborMayLocations : List PierLocation -> List PierLocation -> List PierLocation
findNeighborMayLocations mustList mayList =
    let
        initialMayDict =
            Dict.fromList <| List.map (\pl -> ( pierSpatialKey pl.location, pl )) mayList

        transferIfFound location ( accum, mayDict ) =
            case Dict.get (pierSpatialKey location) mayDict of
                Just foundLocation ->
                    ( foundLocation :: accum, Dict.remove (pierSpatialKey location) mayDict )

                Nothing ->
                    ( accum, mayDict )

        rec list ( accum, mayDict ) =
            case list of
                [] ->
                    accum

                loc :: locs ->
                    rec locs <|
                        transferIfFound (getRight loc.location) <|
                            transferIfFound (getLeft loc.location) ( accum, mayDict )
    in
    rec mustList ( [], initialMayDict )


{-| 単線を想定した橋脚の列から複線橋脚を抜き出す。
もし、複々線になることがあったら複線橋脚を構築できないためエラーなのだが、ここでは構築してしまう。
理由としては、実際に構築できなかったとしても可視化したいため。
残りの段のエラー処理等でリカバリすることを想定。
-}
constructDoubleTrackPiers :
    Dict PierPlanarKey (Nonempty PierLocation)
    ->
        { single : Dict PierPlanarKey (Nonempty PierLocation)
        , double : Dict PierPlanarKey ( Nonempty PierLocation, Nonempty PierLocation )
        }
constructDoubleTrackPiers locationDict =
    let
        rec closed single double list =
            case list of
                [] ->
                    { single = single, double = double }

                ( key, pierLocations ) :: rest ->
                    let
                        left =
                            pierPlanarKey <| getLeft (Nonempty.head pierLocations).location
                    in
                    if Set.member key closed then
                        -- skip if key is already visited
                        rec closed single double rest

                    else
                        case Dict.get left single of
                            Nothing ->
                                -- not found. construct a single pier
                                rec (Set.insert key closed)
                                    single
                                    double
                                    rest

                            Just doubleLocations ->
                                -- found a location next to loc. Construct a double pier
                                rec (Set.insert key <| Set.insert left closed)
                                    (Dict.remove key <| Dict.remove left single)
                                    (Dict.insert key ( pierLocations, doubleLocations ) double)
                                    rest
    in
    rec Set.empty locationDict Dict.empty (Dict.toList locationDict)


{-| 単線の橋脚を構築する。Locationはすべて同じ座標であることを仮定したい
現在高さ currentから、pierLocations（同じ平面座標に高さの昇順に並んでいると仮定）のそれぞれの点を満たすように、
単線の橋脚を構築してゆく。accumは末尾再帰にするための累積変数。
-}
constructSinglePierRec : Int -> List PierLocation -> List PierPlacement -> List PierPlacement
constructSinglePierRec current pierLocations accum =
    let
        -- 例えば、6つ上の位置に建築する場合だと、橋脚1つとミニ橋脚2つが必要になる。
        -- そういう感じで、ある地点からある地点までの橋脚を埋める。大きい橋脚から貪欲にやる。
        buildSingleUpto currentHeight targetLocation placementAccum =
            let
                canBuildPier targetPier =
                    -- 現在地点から数えて、pierLocationの下マージン + 高さの余裕があれば配置が可能。
                    currentHeight + Pier.getHeight targetPier <= targetLocation.location.height - targetLocation.margin.bottom

                buildPierAndRec targetPier =
                    let
                        nextLocation =
                            Location.setHeight currentHeight targetLocation.location
                    in
                    (PierPlacement.make targetPier nextLocation :: placementAccum)
                        |> buildSingleUpto (currentHeight + Pier.getHeight targetPier)
                            targetLocation
            in
            if canBuildPier Single then
                buildPierAndRec Single

            else if canBuildPier Mini then
                buildPierAndRec Mini

            else
                placementAccum
    in
    case pierLocations of
        [] ->
            List.reverse accum

        pierLocation :: rest ->
            buildSingleUpto current pierLocation accum
                |> constructSinglePierRec pierLocation.location.height rest


constructSinglePier : List PierLocation -> List PierPlacement
constructSinglePier locations =
    constructSinglePierRec 0 locations []


{-| 複線の橋脚を構築する。
primaryは複線の右側、secondaryは左側。
正しければ構築し、間違っていたら後段のバリデーションに渡すため無茶苦茶でも構築を行う。
-}
constructDoublePier : List PierLocation -> List PierLocation -> List PierPlacement
constructDoublePier primaryPierLocations secondaryPierLocations =
    let
        buildUpto targetLocation placementAccum currentHeight =
            let
                -- TODO: この辺の関数は単線の橋脚と共通なのでコードも共通化したい
                canBuildPier targetPier =
                    -- 現在地点から数えて、pierLocationの下マージン + 高さの余裕があれば配置が可能。
                    currentHeight + targetLocation.margin.bottom + Pier.getHeight targetPier <= targetLocation.location.height - targetLocation.margin.bottom

                buildPierAndRec targetPier =
                    let
                        nextLocation =
                            Location.setHeight currentHeight targetLocation.location
                    in
                    buildUpto targetLocation
                        (PierPlacement.make targetPier nextLocation :: placementAccum)
                        (currentHeight + Pier.getHeight targetPier)

                buildDoublePierForTargetLocation targetPier =
                    let
                        doublePierLocationForArbitraryHeight =
                            Location.setHeight (targetLocation.location.height - Pier.getHeight targetPier) targetLocation.location
                    in
                    PierPlacement.make targetPier doublePierLocationForArbitraryHeight :: placementAccum
            in
            -- 複線橋脚の場合、4で割り切れないheightがやってくると構築はできない。
            -- そうした場合にもせめて表示はできるようにと、無茶苦茶な形でも構築を行う。
            -- そのため、うまく構築できる場合、ちょうど目標高度に達した場合、その間の1-3みたいな残り高さの3通りになる。
            if canBuildPier Wide then
                -- 設置する余裕があるので設置して再帰
                buildPierAndRec Wide

            else if targetLocation.location.height == currentHeight then
                -- 目標高度に達したため何もしない
                placementAccum

            else
                -- 無理やり建築を行う。
                buildDoublePierForTargetLocation Wide

        doubleRec current primary secondary accum =
            case ( primary, secondary ) of
                ( [], [] ) ->
                    List.reverse accum

                ( p :: pRest, s :: sRest ) ->
                    if p.location.height > s.location.height then
                        doubleRec s.location.height (p :: pRest) sRest <| buildUpto (p |> PL.setHeight s.location.height) accum current

                    else if p.location.height < s.location.height then
                        doubleRec p.location.height pRest (s :: sRest) <| buildUpto p accum current

                    else
                        -- p == s
                        doubleRec p.location.height pRest sRest <| buildUpto p accum current

                ( primaryLocation :: primaryLocations, [] ) ->
                    -- とりあえず1個の複線橋脚を設置 |> 4つ上の位置から、primaryLocationsに沿って単線橋脚を積んでいく
                    let
                        doublePierLocation =
                            Location.setHeight current primaryLocation.location
                    in
                    (PierPlacement.make Wide doublePierLocation :: accum)
                        |> constructSinglePierRec
                            (current + Pier.getHeight Wide)
                            (primaryLocation :: primaryLocations)

                ( [], secondaryLocation :: secondaryLocations ) ->
                    let
                        doublePierLocation =
                            Location.setHeight current secondaryLocation.location |> getLeft
                    in
                    (PierPlacement.make Wide doublePierLocation :: accum)
                        |> constructSinglePierRec
                            (current + Pier.getHeight Wide)
                            (secondaryLocation :: secondaryLocations)
    in
    doubleRec 0 primaryPierLocations secondaryPierLocations []


type alias PierConstructionResult =
    { pierPlacements : List PierPlacement
    , error : Maybe PierConstructionError
    }


type alias PierConstructionError =
    String


{-| the main function of pier-construction
-}
construct : PierConstraint -> PierConstructionResult
construct { must, may, mustNot } =
    let
        cleanesedMustLocations =
            List.map cleansePierLocations must

        cleanesedMayLocations =
            List.map cleansePierLocations may

        mayLocationsToBePlaced =
            findNeighborMayLocations cleanesedMustLocations cleanesedMayLocations

        mustPierKeyDict =
            buildPierKeyDict
                (\p -> pierPlanarKey p.location)
                (\x y -> PL.compare x y)
                (cleanesedMustLocations ++ mayLocationsToBePlaced)

        pierDict =
            constructDoubleTrackPiers mustPierKeyDict

        singlePlacements =
            Dict.values pierDict.single
                |> List.concatMap
                    (Nonempty.toList >> constructSinglePier)

        doublePlacements =
            Dict.values pierDict.double
                |> List.concatMap
                    (\( primary, secondary ) ->
                        constructDoublePier
                            (Nonempty.toList primary)
                            (Nonempty.toList secondary)
                    )

        finalResult =
            singlePlacements ++ doublePlacements
    in
    { pierPlacements = finalResult, error = Nothing }
