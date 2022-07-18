import React, { useRef, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import SideBarWrap from "./sidewrap";
import Navbar from "./navbar";
import geoJson from "../data/markers.json";
import Popup from "./Popup";
import Carousel from "./carousel";
import Analysis from "./Toggle";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbmF2MTI5OCIsImEiOiJja3NjMWxjOTMwYzRkMm9xcTUxNXFpYzl5In0._gL-06fXtg1yBszkiiFjEQ";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(82.5699);
  const [lat, setLat] = useState(22.1957);
  const [zoom, setZoom] = useState(3.35);
  const [popupData, setPopupData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [layerIDMap, setLayerIDMap] = useState({});

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("load", () => {
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      // Add the vector tileset as a source.
      map.current.addSource("category", {
        type: "geojson",
        data: geoJson,
      });

      for (const feature of geoJson.features) {
        const filterCategory = feature.properties.category;
        const layerID = `poi-${filterCategory}`;
        const key = `${filterCategory}`;
        const value = `${layerID}`;
        setLayerIDMap((prevState) => ({
          ...prevState,
          [key]: value,
        }));
        if (!map.current.getLayer(layerID)) {
          map.current.addLayer({
            id: layerID,
            type: "circle",
            source: "category",
            filter: ["==", "category", filterCategory],
            paint: {
              // Make circles larger as the user zooms from z12 to z22.
              "circle-radius": {
                base: 10.75,
                stops: [
                  [12, 10],
                  [22, 180],
                ],
              },
              // Color circles by ethnicity, using a `match` expression.
              "circle-color": [
                "match",
                ["get", "category"],
                "Agriculture",
                "green",
                "Dump Sites",
                "red",
                "Mineral Extraction Sites",
                "blue",
                "Urban City",
                "yellow",
                /* other */ "#ccc",
              ],
            },
          });

          const filterGroup = document.getElementById("filter-group");
          const input = document.createElement("input");
          input.type = "checkbox";
          input.id = layerID;
          input.checked = true;
          filterGroup.appendChild(input);

          const label = document.createElement("label");
          label.setAttribute("for", layerID);
          label.textContent = filterCategory;
          filterGroup.appendChild(label);
          // console.log(checkedLayerId, "CHC");
          input.addEventListener("change", (e) => {
            map.current.setLayoutProperty(
              layerID,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
          });

          map.current.on("click", layerID, async (e) => {
            console.log("clicked");
            const popUpMarkup = `${e.features[0].properties.address}`;
            const coordinates = [
              e.features[0].geometry.coordinates[0],
              e.features[0].geometry.coordinates[1],
            ];
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`;
            const result = await axios.get(url);
            setPopupData(result.data.features[0]);
            setShowPopup(true);
          });
        }
      }
    });
  });

  const popup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="main">
      <div className="map">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <SideBarWrap />
      <Carousel />
      <div class="navbar navbar-default navbar-fixed-bottom">
        <div class="analysis">
          <Analysis />
        </div>
      </div>
      {showPopup && <Popup data={popupData} showPopup={popup} />}
    </div>
  );
}
