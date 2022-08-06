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
  const [lng, setLng] = useState(79.5699);
  const [lat, setLat] = useState(22.1957);
  const [zoom, setZoom] = useState(2.0);
  const [popupData, setPopupData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [layerIDMap, setLayerIDMap] = useState({});

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: "mapbox://styles/mapbox/streets-v11",
      style: "mapbox://styles/pranav1298/cl5zjtnt9001515o13718d28v",
      // style: "mapbox://styles/pranav1298/cl61wt1ud002414nuqjeui04p",
      center: [lng, lat],
      zoom: zoom,
      projection: "globe",
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
      map.current.setFog({
        "horizon-blend": 0.1,
        "star-intensity": 1.1,
        color: "white",
        "high-color": "rgba(66, 88, 106, 1.0)",
        "space-color": "rgba(66, 88, 106, 1.0)",
      });
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
        const layer = `${layerID}1`;
        if (!map.current.getLayer(layer)) {
          //LAYER 1
          map.current.addLayer({
            id: `${layerID}1`,
            type: "circle",
            source: "category",
            filter: ["==", "category", filterCategory],
            paint: {
              // Make circles larger as the user zooms from z12 to z22.
              "circle-radius": {
                base: 17.75,
                stops: [
                  [12, 17],
                  [22, 180],
                ],
              },
              // Color circles by ethnicity, using a `match` expression.
              "circle-color": [
                "match",
                ["get", "category"],
                "Agriculture",
                "#affc41",
                "Dump Sites",
                "#fb5607",
                "Mineral Extraction Sites",
                "#db00b6",
                "Urban City",
                "#2d00f7",
                /*other*/ "#ccc",
              ],
              "circle-blur": 0.8,
              "circle-opacity": 0.2,
            },
          });

          //LAYER 2
          map.current.addLayer({
            id: `${layerID}2`,
            type: "circle",
            source: "category",
            filter: ["==", "category", filterCategory],
            paint: {
              // Make circles larger as the user zooms from z12 to z22.
              "circle-radius": {
                base: 15.75,
                stops: [
                  [12, 15],
                  [22, 180],
                ],
              },
              // Color circles by ethnicity, using a `match` expression.
              "circle-color": [
                "match",
                ["get", "category"],
                "Agriculture",
                "#affc41",
                "Dump Sites",
                "#fb5607",
                "Mineral Extraction Sites",
                "#db00b6",
                "Urban City",
                "#2d00f7",
                /*other*/ "#ccc",
              ],
              "circle-blur": 0.7,
              "circle-opacity": 0.3,
            },
          });

          //LAYER 3
          map.current.addLayer({
            id: `${layerID}3`,
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
                "#affc41",
                "Dump Sites",
                "#fb5607",
                "Mineral Extraction Sites",
                "#db00b6",
                "Urban City",
                "#2d00f7",
                /*other*/ "#ccc",
              ],
              "circle-blur": 0.5,
              "circle-opacity": 0.4,
            },
          });

          //LAYER 4
          map.current.addLayer({
            id: `${layerID}4`,
            type: "circle",
            source: "category",
            filter: ["==", "category", filterCategory],
            paint: {
              // Make circles larger as the user zooms from z12 to z22.
              "circle-radius": {
                base: 5.75,
                stops: [
                  [12, 5],
                  [22, 90],
                ],
              },
              // Color circles by ethnicity, using a `match` expression.
              "circle-color": [
                "match",
                ["get", "category"],
                "Agriculture",
                "#affc41",
                "Dump Sites",
                "#fb5607",
                "Mineral Extraction Sites",
                "#db00b6",
                "Urban City",
                "#2d00f7",
                /*other*/ "#ccc",
              ],
              "circle-blur": 0.2,
              "circle-opacity": 0.2,
            },
          });

          //LAYER 5
          map.current.addLayer({
            id: `${layerID}5`,
            type: "circle",
            source: "category",
            filter: ["==", "category", filterCategory],
            paint: {
              // Make circles larger as the user zooms from z12 to z22.
              "circle-radius": {
                base: 2,
                stops: [
                  [12, 2],
                  [22, 50],
                ],
              },
              // Color circles by ethnicity, using a `match` expression.
              "circle-color": [
                "match",
                ["get", "category"],
                "Agriculture",
                "#ffffff",
                "Dump Sites",
                "#ffffff",
                "Mineral Extraction Sites",
                "#ffffff",
                "Urban City",
                "#ffffff",
                /*other*/ "#ccc",
              ],
              "circle-blur": 0.3,
              "circle-opacity": 0.5,
            },
          });

          //LAYER 6
          map.current.addLayer({
            id: `${layerID}6`,
            type: "circle",
            source: "category",
            filter: ["==", "category", filterCategory],
            paint: {
              // Make circles larger as the user zooms from z12 to z22.
              "circle-radius": {
                base: 1,
                stops: [
                  [12, 1.5],
                  [22, 20],
                ],
              },
              // Color circles by ethnicity, using a `match` expression.
              "circle-color": [
                "match",
                ["get", "category"],
                "Agriculture",
                "#ffffff",
                "Dump Sites",
                "#ffffff",
                "Mineral Extraction Sites",
                "#ffffff",
                "Urban City",
                "#ffffff",
                /*other*/ "#ccc",
              ],
              "circle-blur": 0.8,
              "circle-opacity": 0.8,
            },
          });

          const filterGroup = document.getElementById("filter-group");
          const input = document.createElement("input");
          input.type = "checkbox";
          input.id = `${layerID}1`;
          input.checked = true;
          filterGroup.appendChild(input);

          const label = document.createElement("label");
          label.setAttribute("for", `${layerID}1`);
          label.textContent = filterCategory;
          filterGroup.appendChild(label);
          // console.log(checkedLayerId, "CHC");
          input.addEventListener("change", (e) => {
            map.current.setLayoutProperty(
              `${layerID}1`,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
            map.current.setLayoutProperty(
              `${layerID}2`,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
            map.current.setLayoutProperty(
              `${layerID}3`,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
            map.current.setLayoutProperty(
              `${layerID}4`,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
            map.current.setLayoutProperty(
              `${layerID}5`,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
            map.current.setLayoutProperty(
              `${layerID}6`,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
          });

          map.current.on("click", `${layerID}1`, async (e) => {
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
      {/* <Carousel /> */}
      <div>
        <div class="analysis">
          <Analysis />
        </div>
      </div>
      {showPopup && <Popup data={popupData} showPopup={popup} />}
    </div>
  );
}
