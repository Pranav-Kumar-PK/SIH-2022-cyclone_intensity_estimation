import React from "react";
import axios from "axios";

const Popup = (props) => {
  const onClickHandler = () => {
    props.showPopup();
  };
  
  return (
    <div onClick={onClickHandler} className="container">
      <div className="container__profile">
        <div className="container__profile__text">
          <h2>{props.data.text}</h2>
          <p>
            <b>{props.data.properties.category}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
