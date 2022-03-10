import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import SideBarWrap from "./sidewrap";
import Navbar from "./navbar";
import geoJson from "../data/stations.json";
mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbmF2MTI5OCIsImEiOiJja3NjMWxjOTMwYzRkMm9xcTUxNXFpYzl5In0._gL-06fXtg1yBszkiiFjEQ";

const allFilter = ["Forest", "Airport"];
export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [filter, setFilter] = useState(allFilter);
  const [lng, setLng] = useState(82.5699);
  const [lat, setLat] = useState(22.1957);
  const [zoom, setZoom] = useState(3.35);

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
      map.current.addControl(new mapboxgl.NavigationControl());
      // Add the vector tileset as a source.
      map.current.addSource("category", {
        type: "geojson",
        data: geoJson,
      });
      map.current.addLayer({
        id: "category",
        type: "circle",
        source: "category",
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
            "Airport",
            "red",
            "Forest",
            "blue",
            /* other */ "#ccc",
          ],
        },
      });
      map.current.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.current.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });

      map.current.on("click", "category", (e) => {
        const popUpMarkup = `${e.features[0].properties.address}`;
        // const coordinates = e.features[0].geometry.coordinates.slice();
        const coordinates = [
          e.features[0].geometry.coordinates[0],
          e.features[0].geometry.coordinates[1],
        ];
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(coordinates)
          .setHTML(popUpMarkup)
          .addTo(map.current)
      });
    });
  });

  return (
    <div>
      <div className="map">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <Navbar />
      <SideBarWrap />
    </div>
  );
}
