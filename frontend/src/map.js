import React, { useRef,useEffect} from 'react';
import {loadModules} from "esri-loader"
function Map(){

    const MapEl=useRef(null)

    useEffect(
        ()=>{
            let view;
            loadModules(["esri/views/MapView","esri/WebMap","esri/layers/GeoJSONLayer"],{
                css:true
            }
            ).then(([MapView,WebMap,GeoJSONLayer])=>{
                const webMaps=new WebMap({
                    basemap:'topo-vector'
                })
                view=new MapView({
                    map:webMaps,
                    // center:[],
                    zoom:8,
                    container:MapEl.current
                })
                const geojson=new GeoJSONLayer({
                    
                })
            })
            return ()=>{
                if(!!view){
                    view.destroy()
                    view=null
                }
            }
        }
    )
    return (
        <div style={{height:800}} ref={MapEl}>

        </div>
    )
}
export default Map