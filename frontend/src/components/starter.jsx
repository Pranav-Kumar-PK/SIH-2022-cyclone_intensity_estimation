import React, { useRef, useEffect, useState } from "react";
import Navbar from "./navbar";
import mapboxgl from "mapbox-gl";
import SideBarWrap from "./sidewrap";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbmF2MTI5OCIsImEiOiJja3NjMWxjOTMwYzRkMm9xcTUxNXFpYzl5In0._gL-06fXtg1yBszkiiFjEQ";

export default function Starter() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(79.5699);
  const [lat, setLat] = useState(22.1957);
  const [zoom, setZoom] = useState(1.8);
  const [popupData, setPopupData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: "mapbox://styles/mapbox/satellite-streets-v11",
      style: "mapbox://styles/pranav1298/cl6hnokg4000214ma2h9md7ji",
      // style: "mapbox://styles/pranav1298/cl61wt1ud002414nuqjeui04p",
      center: [lng, lat],
      zoom: zoom,
      projection: "globe",
    });
  });

  useEffect(() => {
    if (!map.current) return; // initialize map only once
    map.current.on("load", () => {
      map.current.setFog({
        range: [-2.8, 6],
        color: "#8ae3f4",
        "horizon-blend": 0.05,
        "high-color": "#001219",
        "space-color": "#000000",
        "star-intensity": 0.5,
      });

      const secondsPerRevolution = 120;
      // Above zoom level 5, do not rotate.
      const maxSpinZoom = 5;
      // Rotate at intermediate speeds between zoom levels 3 and 5.
      const slowSpinZoom = 3;

      let userInteracting = false;
      let spinEnabled = true;

      function spinGlobe() {
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            // Slow spinning at higher zooms
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          // Smoothly animate the map.current over one second.
          // When this animation is complete, it calls a 'moveend' event.
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // When animation is complete, start spinning if there is no ongoing interaction
      map.current.on("moveend", () => {
        spinGlobe();
      });

      spinGlobe();
    });
  });

  return (
    <div>
      <Navbar />
      <div ref={mapContainer} className="map-container" />
      <div className="header">
        <div className="text">
          DISCOVER the objects and features in the image using Explainable AI
          Techniques. Field Data is an incredible source of information to
          validate earth observation studies.
        </div>
        <div className="home-center">
          <a className="map-button" href="/map">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Map View
          </a>
        </div>
        <br />

        {/* <div className="btns gradient-button gradient-button-3">Upload</div> */}

        {/* <i className="fa fa-globe"></i> */}
        {/* <a href="/map">
          <img className="fa" src="eart.png" alt="" />
        </a> */}
      </div>
      {/* <img src="enviormnent.jpg" className="img-fluid" alt="txt" /> */}
    </div>
  );
}
