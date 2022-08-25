import React, { useState } from "react";

import { labelIcons } from "../utils.js";

const Popup = (props) => {
  const [showCurrImg, setShowCurrImg] = useState("");
  const onClickHandler = () => {
    props.showPopup();
  };

  const onLabelClickHandler = (e) => {
    let currLabel = "";
    for (const [key, value] of Object.entries(labelIcons)) {
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

        <p className="popup__coordinates">
          <b>
            {props.data.coordinates[1].toFixed(3)}&#176;N&nbsp;,&nbsp;
            {props.data.coordinates[0].toFixed(3)}&#176;E
          </b>
        </p>
        <div className="popup__info">
          <div className="popup__info_datetime">
            <p>{new Date(props.data.datetime).toGMTString()}</p>
            <hr />
          </div>
          <div className="popup__info__distribution">
            {Object.keys(props.data.distribution).map(function (
              keyName,
              keyIndex
            ) {
              return (
                <div key={keyIndex}>
                  <p key={keyIndex}>
                    {keyName}&nbsp;:&nbsp;
                    <b>{props.data.distribution[keyName].toFixed(2)}</b>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container__popup__profile">
          <div className="container__profile__text">
            {props.data.features.map((elem, index) => (
              <span key={index} className="popup__features">
                <div className="label__icons">
                  <i
                    style={{
                      fontSize: showCurrImg === elem ? "xx-large" : "x-large",
                    }}
                    className={labelIcons[elem]}
                    onClick={onLabelClickHandler}
                  ></i>
                  <span className="label__text">
                    {props.data.distribution[elem].toFixed(2)} &#37;
                  </span>
                  <span className="label__hover__text">{elem}</span>
                  <div className="label__image__wrapper">
                    <a
                      id={index}
                      href={props.data.images[index]}
                      target="_blank"
                    >
                      <img
                        id={index}
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
