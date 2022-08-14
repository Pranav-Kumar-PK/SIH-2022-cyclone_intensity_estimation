import React from "react";
import axios from "axios";

const Popup = (props) => {
  const onClickHandler = () => {
    props.showPopup();
  };

  return (
    <div className="wrapper__popup">
      <div className="container__popup">
        <img
          className="popup__image"
          src="https://res.cloudinary.com/hexagon-11/image/upload/v1660322942/example-mapbox-static-3_wtwskv.jpg"
          alt="map image"
        />
        <span onClick={onClickHandler} id="close">X</span>
        <div className="container__popup__profile">
          <div className="container__profile__text">
            {props.data.features.map((elem) => (
              <span className="popup__features">
                <a href="#">{elem}</a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
