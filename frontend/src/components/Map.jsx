import React, { useRef, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import SideBarWrap from "./sidewrap";
import Navbar from "./navbar";
import geoJson from "../data/markers.json";
import marine_waters from "../data/Marine waters.json";
import inland_waters from "../data/Inland waters.json";
import coastal_wetlands from "../data/Coastal wetlands.json";
import inland_wetlands from "../data/Inland wetlands.json";
import transitional_woodland from "../data/Transitional woodland, shrub.json";
import moors_heathland from "../data/Moors, heathland and sclerophyllous vegetation.json";
import natural_grassland from "../data/Natural grassland and sparsely vegetated areas.json";
import mixed_forest from "../data/Mixed forest.json";
import coniferous_forest from "../data/Coniferous forest.json";
import pastures from "../data/Pastures.json";
import lpoa from "../data/Land principally occupied by agriculture, with significant areas of natural vegetation.json";
import complex_cultivation_patterns from "../data/Complex cultivation patterns.json";
import permanent_crops from "../data/Permanent crops.json";
import industrial_commercial from "../data/Industrial or commercial units.json";
import urban_fabric from "../data/Urban fabric.json";
import broad_leaved_forest from "../data/Broad-leaved forest.json";
import agro_forestry from "../data/Agro-forestry areas.json";
import arable_land from "../data/Arable land.json";
import beaches_dunes_sands from "../data/Beaches, dunes, sands.json";
import Popup from "./Popup";
import Carousel from "./carousel";
import Analysis from "./Toggle";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbmF2MTI5OCIsImEiOiJja3NjMWxjOTMwYzRkMm9xcTUxNXFpYzl5In0._gL-06fXtg1yBszkiiFjEQ";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(13.5699);
  const [lat, setLat] = useState(47.1957);
  const [zoom, setZoom] = useState(2.0);
  const [popupData, setPopupData] = useState({
    images: [],
    features: [],
    distribution: {},
    datetime: "",
    coordinates: [],
  });
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
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      // Add the vector tileset as a source.
      // map.current.addSource("category", {
      //   type: "geojson",
      //   data: geoJson,
      // });
      // map.current.addLayer({
      //   id: "category-layer",
      //   type: "circle",
      //   source: "category",
      //   paint: {
      //     "circle-radius": 4,
      // "circle-stroke-width": 2,
      //     "circle-color": "red",
      //     "circle-stroke-color": "white",
      //   },
      // });

      // Add the vector tileset as a source.
      map.current.addSource("marine_waters", {
        type: "geojson",
        data: marine_waters,
      });
      // Add the vector tileset as a source.
      map.current.addSource("inland_waters", {
        type: "geojson",
        data: inland_waters,
      });
      // Add the vector tileset as a source.
      map.current.addSource("coastal_wetlands", {
        type: "geojson",
        data: coastal_wetlands,
      });
      // Add the vector tileset as a source.
      map.current.addSource("inland_wetlands", {
        type: "geojson",
        data: inland_wetlands,
      });
      // Add the vector tileset as a source.
      map.current.addSource("transitional_woodland", {
        type: "geojson",
        data: transitional_woodland,
      });
      // Add the vector tileset as a source.
      map.current.addSource("moors_heathland", {
        type: "geojson",
        data: moors_heathland,
      });
      // Add the vector tileset as a source.
      map.current.addSource("natural_grassland", {
        type: "geojson",
        data: natural_grassland,
      });
      // Add the vector tileset as a source.
      map.current.addSource("mixed_forest", {
        type: "geojson",
        data: mixed_forest,
      });
      // Add the vector tileset as a source.
      map.current.addSource("coniferous_forest", {
        type: "geojson",
        data: coniferous_forest,
      });
      // Add the vector tileset as a source.
      map.current.addSource("pastures", {
        type: "geojson",
        data: pastures,
      });
      // Add the vector tileset as a source.
      map.current.addSource("lpoa", {
        type: "geojson",
        data: lpoa,
      });
      // Add the vector tileset as a source.
      map.current.addSource("complex_cultivation_patterns", {
        type: "geojson",
        data: complex_cultivation_patterns,
      });
      // Add the vector tileset as a source.
      map.current.addSource("permanent_crops", {
        type: "geojson",
        data: permanent_crops,
      });
      // Add the vector tileset as a source.
      map.current.addSource("industrial_commercial", {
        type: "geojson",
        data: industrial_commercial,
      });
      // Add the vector tileset as a source.
      map.current.addSource("urban_fabric", {
        type: "geojson",
        data: urban_fabric,
      });
      // Add the vector tileset as a source.
      map.current.addSource("broad_leaved_forest", {
        type: "geojson",
        data: broad_leaved_forest,
      });
      // Add the vector tileset as a source.
      map.current.addSource("agro_forestry", {
        type: "geojson",
        data: agro_forestry,
      });
      // Add the vector tileset as a source.
      map.current.addSource("arable_land", {
        type: "geojson",
        data: arable_land,
      });
      // Add the vector tileset as a source.
      map.current.addSource("beaches_dunes_sands", {
        type: "geojson",
        data: beaches_dunes_sands,
      });

      //////////////////////////

      map.current.addLayer({
        id: "marine_waters-layer",
        type: "circle",
        source: "marine_waters",
        paint: {
          "circle-radius": 4.1,
          // "circle-stroke-width": 2,
          "circle-color": "#7400b8",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "inland_waters-layer",
        type: "circle",
        source: "inland_waters",
        paint: {
          "circle-radius": 4,
          // "circle-stroke-width": 2,
          "circle-color": "#4ea8de",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "coastal_wetlands-layer",
        type: "circle",
        source: "coastal_wetlands",
        paint: {
          "circle-radius": 3.9,
          // "circle-stroke-width": 2,
          "circle-color": "#003049",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "inland_wetlands-layer",
        type: "circle",
        source: "inland_wetlands",
        paint: {
          "circle-radius": 3.8,
          // "circle-stroke-width": 2,
          "circle-color": "#80ffdb",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "transitional_woodland-layer",
        type: "circle",
        source: "transitional_woodland",
        paint: {
          "circle-radius": 3.7,
          // "circle-stroke-width": 2,
          "circle-color": "#ff9b54",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "moors_heathland-layer",
        type: "circle",
        source: "moors_heathland",
        paint: {
          "circle-radius": 3.6,
          // "circle-stroke-width": 2,
          "circle-color": "#081c15",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "natural_grassland-layer",
        type: "circle",
        source: "natural_grassland",
        paint: {
          "circle-radius": 3.5,
          // "circle-stroke-width": 2,
          "circle-color": "#1b4332",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "mixed_forest-layer",
        type: "circle",
        source: "mixed_forest",
        paint: {
          "circle-radius": 3.4,
          // "circle-stroke-width": 2,
          "circle-color": "#70e000",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "coniferous_forest-layer",
        type: "circle",
        source: "coniferous_forest",
        paint: {
          "circle-radius": 3.3,
          // "circle-stroke-width": 2,
          "circle-color": "#38b000",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "pastures-layer",
        type: "circle",
        source: "pastures",
        paint: {
          "circle-radius": 3.2,
          // "circle-stroke-width": 2,
          "circle-color": "#40916c",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "lpoa-layer",
        type: "circle",
        source: "lpoa",
        paint: {
          "circle-radius": 3.1,
          // "circle-stroke-width": 2,
          "circle-color": "#d81159",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "complex_cultivation_patterns-layer",
        type: "circle",
        source: "complex_cultivation_patterns",
        paint: {
          "circle-radius": 3,
          // "circle-stroke-width": 2,
          "circle-color": "#95d5b2",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "permanent_crops-layer",
        type: "circle",
        source: "permanent_crops",
        paint: {
          "circle-radius": 3.15,
          // "circle-stroke-width": 2,
          "circle-color": "#a47e1b",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "industrial_commercial-layer",
        type: "circle",
        source: "industrial_commercial",
        paint: {
          "circle-radius": 3.25,
          // "circle-stroke-width": 2,
          "circle-color": "#370617",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "urban_fabric-layer",
        type: "circle",
        source: "urban_fabric",
        paint: {
          "circle-radius": 3.35,
          // "circle-stroke-width": 2,
          "circle-color": "#9d0208",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "broad_leaved_forest-layer",
        type: "circle",
        source: "broad_leaved_forest",
        paint: {
          "circle-radius": 3.45,
          // "circle-stroke-width": 2,
          "circle-color": "#007200",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "agro_forestry-layer",
        type: "circle",
        source: "agro_forestry",
        paint: {
          "circle-radius": 3.55,
          // "circle-stroke-width": 2,
          "circle-color": "#004b23",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "arable_land-layer",
        type: "circle",
        source: "arable_land",
        paint: {
          "circle-radius": 2.9,
          // "circle-stroke-width": 2,
          "circle-color": "#ffe169",
          // "circle-stroke-color": "white",
        },
      });
      map.current.addLayer({
        id: "beaches_dunes_sands-layer",
        type: "circle",
        source: "beaches_dunes_sands",
        paint: {
          "circle-radius": 3.76,
          // "circle-stroke-width": 2,
          "circle-color": "#dbb42c",
          // "circle-stroke-color": "white",
        },
      });

      //////////////////////////////////////////////////////

      map.current.on("click", "marine_waters-layer", async (e) => {
        console.log(e.features[0].properties.labels);
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "inland_waters-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "coastal_wetlands-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "inland_wetlands-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "transitional_woodland-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "moors_heathland-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "natural_grassland-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "mixed_forest-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "coniferous_forest-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "pastures-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "lpoa-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on(
        "click",
        "complex_cultivation_patterns-layer",
        async (e) => {
          setPopupData({
            images: JSON.parse(e.features[0].properties.images),
            features: JSON.parse(e.features[0].properties.labels),
            distribution: e.features[0].properties.distribution,
            datetime: e.features[0].properties.datetime,
            coordinates: e.features[0].geometry.coordinates,
          });
          setShowPopup(true);
        }
      );
      map.current.on("click", "permanent_crops-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "industrial_commercial-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "urban_fabric-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "broad_leaved_forest-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "agro_forestry-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "arable_land-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      map.current.on("click", "beaches_dunes_sands-layer", async (e) => {
        setPopupData({
          images: JSON.parse(e.features[0].properties.images),
          features: JSON.parse(e.features[0].properties.labels),
          distribution: e.features[0].properties.distribution,
          datetime: e.features[0].properties.datetime,
          coordinates: e.features[0].geometry.coordinates,
        });
        setShowPopup(true);
      });
      const labelsArray = [
        "marine_waters",
        "inland_waters",
        "coastal_wetlands",
        "inland_wetlands",
        "transitional_woodland",
        "moors_heathland",
        "natural_grassland",
        "mixed_forest",
        "coniferous_forest",
        "pastures",
        "lpoa",
        "complex_cultivation_patterns",
        "permanent_crops",
        "industrial_commercial",
        "urban_fabric",
        "broad_leaved_forest",
        "agro_forestry",
        "arable_land",
        "beaches_dunes_sands",
      ];
      for (let labels of labelsArray) {
        const filterGroup = document.getElementById("filter-group");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = `${labels}`;
        input.checked = true;
        filterGroup.appendChild(input);

        const label = document.createElement("label");
        label.setAttribute("for", `${labels}`);
        label.textContent = labels;
        filterGroup.appendChild(label);
        // console.log(checkedLayerId, "CHC");
        input.addEventListener("change", (e) => {
          map.current.setLayoutProperty(
            `${labels}-layer`,
            "visibility",
            e.target.checked ? "visible" : "none"
          );
        });
      }

      // for (const feature of geoJson.features) {
      //   const filterCategory = feature.properties.category;
      //   const layerID = `poi-${filterCategory}`;
      //   const key = `${filterCategory}`;
      //   const value = `${layerID}`;
      //   setLayerIDMap((prevState) => ({
      //     ...prevState,
      //     [key]: value,
      //   }));
      //   const layer = `${layerID}1`;
      //   if (!map.current.getLayer(layer)) {
      //     //LAYER 1
      //     map.current.addLayer({
      //       id: `${layerID}1`,
      //       type: "circle",
      //       source: "category",
      //       filter: ["==", "category", filterCategory],
      //       paint: {
      //         // Make circles larger as the user zooms from z12 to z22.
      //         "circle-radius": {
      //           base: 17.75,
      //           stops: [
      //             [12, 17],
      //             [22, 180],
      //           ],
      //         },
      //         // Color circles by ethnicity, using a `match` expression.
      //         "circle-color": [
      //           "match",
      //           ["get", "category"],
      //           "Agriculture",
      //           "#affc41",
      //           "Dump Sites",
      //           "#fb5607",
      //           "Mineral Extraction Sites",
      //           "#db00b6",
      //           "Urban City",
      //           "#2d00f7",
      //           /*other*/ "#ccc",
      //         ],
      //         "circle-blur": 0.8,
      //         "circle-opacity": 0.2,
      //       },
      //     });

      //     //LAYER 2
      //     map.current.addLayer({
      //       id: `${layerID}2`,
      //       type: "circle",
      //       source: "category",
      //       filter: ["==", "category", filterCategory],
      //       paint: {
      //         // Make circles larger as the user zooms from z12 to z22.
      //         "circle-radius": {
      //           base: 15.75,
      //           stops: [
      //             [12, 15],
      //             [22, 180],
      //           ],
      //         },
      //         // Color circles by ethnicity, using a `match` expression.
      //         "circle-color": [
      //           "match",
      //           ["get", "category"],
      //           "Agriculture",
      //           "#affc41",
      //           "Dump Sites",
      //           "#fb5607",
      //           "Mineral Extraction Sites",
      //           "#db00b6",
      //           "Urban City",
      //           "#2d00f7",
      //           /*other*/ "#ccc",
      //         ],
      //         "circle-blur": 0.7,
      //         "circle-opacity": 0.3,
      //       },
      //     });

      //     //LAYER 3
      //     map.current.addLayer({
      //       id: `${layerID}3`,
      //       type: "circle",
      //       source: "category",
      //       filter: ["==", "category", filterCategory],
      //       paint: {
      //         // Make circles larger as the user zooms from z12 to z22.
      //         "circle-radius": {
      //           base: 10.75,
      //           stops: [
      //             [12, 10],
      //             [22, 180],
      //           ],
      //         },
      //         // Color circles by ethnicity, using a `match` expression.
      //         "circle-color": [
      //           "match",
      //           ["get", "category"],
      //           "Agriculture",
      //           "#affc41",
      //           "Dump Sites",
      //           "#fb5607",
      //           "Mineral Extraction Sites",
      //           "#db00b6",
      //           "Urban City",
      //           "#2d00f7",
      //           /*other*/ "#ccc",
      //         ],
      //         "circle-blur": 0.5,
      //         "circle-opacity": 0.4,
      //       },
      //     });

      //     //LAYER 4
      //     map.current.addLayer({
      //       id: `${layerID}4`,
      //       type: "circle",
      //       source: "category",
      //       filter: ["==", "category", filterCategory],
      //       paint: {
      //         // Make circles larger as the user zooms from z12 to z22.
      //         "circle-radius": {
      //           base: 5.75,
      //           stops: [
      //             [12, 5],
      //             [22, 90],
      //           ],
      //         },
      //         // Color circles by ethnicity, using a `match` expression.
      //         "circle-color": [
      //           "match",
      //           ["get", "category"],
      //           "Agriculture",
      //           "#affc41",
      //           "Dump Sites",
      //           "#fb5607",
      //           "Mineral Extraction Sites",
      //           "#db00b6",
      //           "Urban City",
      //           "#2d00f7",
      //           /*other*/ "#ccc",
      //         ],
      //         "circle-blur": 0.2,
      //         "circle-opacity": 0.2,
      //       },
      //     });

      //     //LAYER 5
      //     map.current.addLayer({
      //       id: `${layerID}5`,
      //       type: "circle",
      //       source: "category",
      //       filter: ["==", "category", filterCategory],
      //       paint: {
      //         // Make circles larger as the user zooms from z12 to z22.
      //         "circle-radius": {
      //           base: 2,
      //           stops: [
      //             [12, 2],
      //             [22, 50],
      //           ],
      //         },
      //         // Color circles by ethnicity, using a `match` expression.
      //         "circle-color": [
      //           "match",
      //           ["get", "category"],
      //           "Agriculture",
      //           "#ffffff",
      //           "Dump Sites",
      //           "#ffffff",
      //           "Mineral Extraction Sites",
      //           "#ffffff",
      //           "Urban City",
      //           "#ffffff",
      //           /*other*/ "#ccc",
      //         ],
      //         "circle-blur": 0.3,
      //         "circle-opacity": 0.5,
      //       },
      //     });

      //     //LAYER 6
      //     map.current.addLayer({
      //       id: `${layerID}6`,
      //       type: "circle",
      //       source: "category",
      //       filter: ["==", "category", filterCategory],
      //       paint: {
      //         // Make circles larger as the user zooms from z12 to z22.
      //         "circle-radius": {
      //           base: 1,
      //           stops: [
      //             [12, 1.5],
      //             [22, 20],
      //           ],
      //         },
      //         // Color circles by ethnicity, using a `match` expression.
      //         "circle-color": [
      //           "match",
      //           ["get", "category"],
      //           "Agriculture",
      //           "#ffffff",
      //           "Dump Sites",
      //           "#ffffff",
      //           "Mineral Extraction Sites",
      //           "#ffffff",
      //           "Urban City",
      //           "#ffffff",
      //           /*other*/ "#ccc",
      //         ],
      //         "circle-blur": 0.8,
      //         "circle-opacity": 0.8,
      //       },
      //     });

      //     const filterGroup = document.getElementById("filter-group");
      //     const input = document.createElement("input");
      //     input.type = "checkbox";
      //     input.id = `${layerID}1`;
      //     input.checked = true;
      //     filterGroup.appendChild(input);

      //     const label = document.createElement("label");
      //     label.setAttribute("for", `${layerID}1`);
      //     label.textContent = filterCategory;
      //     filterGroup.appendChild(label);
      //     // console.log(checkedLayerId, "CHC");
      //     input.addEventListener("change", (e) => {
      //       map.current.setLayoutProperty(
      //         `${layerID}1`,
      //         "visibility",
      //         e.target.checked ? "visible" : "none"
      //       );
      //       map.current.setLayoutProperty(
      //         `${layerID}2`,
      //         "visibility",
      //         e.target.checked ? "visible" : "none"
      //       );
      //       map.current.setLayoutProperty(
      //         `${layerID}3`,
      //         "visibility",
      //         e.target.checked ? "visible" : "none"
      //       );
      //       map.current.setLayoutProperty(
      //         `${layerID}4`,
      //         "visibility",
      //         e.target.checked ? "visible" : "none"
      //       );
      //       map.current.setLayoutProperty(
      //         `${layerID}5`,
      //         "visibility",
      //         e.target.checked ? "visible" : "none"
      //       );
      //       map.current.setLayoutProperty(
      //         `${layerID}6`,
      //         "visibility",
      //         e.target.checked ? "visible" : "none"
      //       );
      //     });

      //     map.current.on("click", `${layerID}1`, async (e) => {
      //
      //       const popUpMarkup = `${e.features[0].properties.address}`;
      //       const coordinates = [
      //         e.features[0].geometry.coordinates[0],
      //         e.features[0].geometry.coordinates[1],
      //       ];
      //       const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`;
      //       const result = await axios.get(url);
      //       setPopupData({
      //         details: result.data.features[0],
      //         features: ["Industrial", "Urban City", "Forest", "Agricultural"],
      //       });

      //       setShowPopup(true);
      //     });
      //   }
      // }
    });
  });
  // console.log(popupData)
  const popup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="main">
      <div ref={mapContainer} className="map-container" />
      <SideBarWrap />
      {/* <Carousel /> */}
      {/* <div>
        <div class="analysis">
          <Analysis />
        </div>
      </div> */}
      {showPopup && <Popup data={popupData} showPopup={popup} />}
    </div>
  );
}
