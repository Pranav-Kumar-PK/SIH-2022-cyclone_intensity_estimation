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
        range: [-4.8, 8],
        color: "#8ae3f4",
        "horizon-blend": 0.2,
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
      {/* <Navbar /> */}
      <div>
        <nav class="navbar navbar-default">
          <a className="noselect" href="#Lorem_Ipsum">
            About
          </a>
          <a className="noselect" href="http://">
            Model
          </a>
        </nav>
        
      </div>
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
      <div className="contents">
      <h2 id="Lorem_Ipsum">Lorem Ipsum</h2>
    <p class="main-content">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
    </p>


    <h2 id="Lorem_Ipsum">Lorem Ipsum</h2>
    <p class="main-content">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
    </p>


    <h2 id="Lorem_Ipsum">Lorem Ipsum</h2>
    <p class="main-content">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
    </p>
    </div>
    </div>
  );
}
