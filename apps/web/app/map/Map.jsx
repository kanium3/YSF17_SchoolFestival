"use client"
import { CRS, LatLng, LatLngBounds, icon} from 'leaflet';
import React,{useState} from 'react';
import { MapContainer, ImageOverlay, LayersControl, Marker, Popup, useMapEvents} from 'react-leaflet'
import Link from 'next/link'
import Image from 'next/image'
import './Map.css';
import 'leaflet/dist/leaflet.css';  //リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)

const {BaseLayer} = LayersControl; //地図関連の値はLayersControlに入っているためそれを変数として定義

const layers = [{ name : "1階", url: "https://raw.githubusercontent.com/proirok/buffer/refs/heads/main/sample_map.svg"},
  {name : "2階", url: "https://raw.githubusercontent.com/proirok/buffer/refs/heads/main/sample_map2.svg"}]

function Control({setlayers}){  //地図レイヤーの名前をここで取得
  useMapEvents({layeradd(e){
    if(e.layer.options && e.layer.options.name){
      setlayers(e.layer.options.name)
    }
  }
})
}

export default function Map(){
  const [baselayer,setlayers] = useState(layers[0].name);

  const picwidth = 960;
  const picheight = 540;
  const position1 = [picheight/2,picwidth/2];

  const ICON = icon({
  iconUrl: "https://raw.githubusercontent.com/proirok/buffer/refs/heads/main/map_pin.svg",
  iconSize: [200, 200],
  iconAnchor: [100, 100],
  popupAnchor: [0, -50],
  });

  return (
    <MapContainer
    crs={CRS.Simple}
    center={new LatLng(picheight/2, picwidth/2)}
    zoom={0}
    style={{ width: picwidth, height: picheight }}
    maxBounds={[[0,0], [picheight, picwidth]]}
  >
    <LayersControl position="bottomright" collapsed="false">
      {layers.map(layer => (  //※1と対応。※1をleafletで地図にしたものを配列化することでして地図として表示させる
        <BaseLayer checked = {layer.name === layers[0].name} name={layer.name} key={layer.name}>
          <ImageOverlay url={layer.url} bounds={new LatLngBounds([[0, 0], [picheight, picwidth]])} />
        </BaseLayer>
      ))}
      {baselayer == "2階" && (
        <Marker position = {position1} icon={ICON}>
          <Popup>
            <Image src="https://raw.githubusercontent.com/proirok/buffer/refs/heads/main/map_pin.svg" alt="マップピンアイコン画像" width={200} height={100}/>
            <Link href="https://www.mrchildren.jp/" target="blank" rel="noopener noreferrer">
              Mr.Childrenのホームページ
            </Link>
          </Popup>
          </Marker>
      )}
    </LayersControl>
    <Control setlayers={setlayers} />
</MapContainer>
  )
};

/*
その他技術的なコメント
layerをグループ化する方法は存在し、LayerGroupで普通にできる
ひょっとするとLayerGroupをベースグループに使えれば普通にできるかも？
ワンチャンかけて試してみます
なんでベースレイヤーの変更だけ載っていないんですかねreactLeafletくん......
*/
