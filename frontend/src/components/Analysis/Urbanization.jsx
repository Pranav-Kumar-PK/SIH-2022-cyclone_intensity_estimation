import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import SideBarWrap from "../sidewrap";
import geoJson from "../../data/markers.json";
import Analysis from "../Toggle";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbmF2MTI5OCIsImEiOiJja3NjMWxjOTMwYzRkMm9xcTUxNXFpYzl5In0._gL-06fXtg1yBszkiiFjEQ";

const Urbanization = () => {
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
      style: "mapbox://styles/pranav1298/cl5zjtnt9001515o13718d28v",
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

      map.current.addLayer(
        {
          id: "earthquakes-heat",
          type: "heatmap",
          source: "category",
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0,
              0,
              6,
              1,
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              0.2,
              "rgb(103,169,207)",
              0.4,
              "rgb(209,229,240)",
              0.6,
              "rgb(253,219,199)",
              0.8,
              "rgb(239,138,98)",
              1,
              "rgb(178,24,43)",
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              1,
              9,
              0,
            ],
          },
        },
        "waterway-label"
      );
    });
  });

  return (
    <div className="main">
      <div className="map">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <SideBarWrap />
      <div class="navbar navbar-default navbar-fixed-bottom">
        <div class="analysis">
          <Analysis currentPage="urbanization" />
        </div>
      </div>
      {/* {showPopup && <Popup data={popupData} showPopup={popup} />} */}
    </div>
  );
};

export default Urbanization;
