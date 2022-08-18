import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import labelsMap from "../utils.js";

const Popup = (props) => {
  const [showCurrImg, setShowCurrImg] = useState("");

  const onClickHandler = () => {
    props.showPopup();
  };

  const onLabelClickHandler = (e) => {
    let currLabel = "";
    for (const [key, value] of Object.entries(labelsMap)) {
      if (value === e.target.className) {
        currLabel = key;
      }
    }
    setShowCurrImg(currLabel);
  };
  const onclose2ClickHandler = (e) => {
    setShowCurrImg("");
  };

  return (
    <div className="wrapper__popup">
      <div className="container__popup">
        <a
          href={props.data.images[props.data.images.length - 1]}
          target="_blank"
        >
          <img
            className="popup__image"
            src={props.data.images[props.data.images.length - 1]}
            alt="map image"
          />
        </a>
        <span onClick={onClickHandler} id="close">
          X
        </span>
        <div className="container__popup__profile">
          <div className="container__profile__text">
            {props.data.features.map((elem, index) => (
              <span className="popup__features">
                <div className="label__icons">
                  <i
                    style={{
                      fontSize: showCurrImg === elem ? "xx-large" : "x-large",
                    }}
                    className={labelsMap[elem]}
                    onClick={onLabelClickHandler}
                  ></i>
                  <span className="label__hover__text">{elem}</span>
                  <div className="label__image__wrapper">
                    <a href={props.data.images[index]} target="_blank">
                      <img
                        style={{
                          visibility:
                            showCurrImg === elem ? "visible" : "hidden",
                        }}
                        className="label__hover__image"
                        src={props.data.images[index]}
                        alt="explainability image"
                      />
                    </a>
                    {showCurrImg === elem && (
                      <i
                        className="label__img__close fa-solid fa-circle-xmark"
                        onClick={onclose2ClickHandler}
                      ></i>
                    )}
                  </div>
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
