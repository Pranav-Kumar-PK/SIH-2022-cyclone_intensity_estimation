import React from "react";
import { Carousel } from "react-bootstrap";
import './carousel.css'
const Slider = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.squarespace-cdn.com/content/v1/55b29de4e4b088f33db802c6/1478191160620-JWRAE5OEJACLBG8E5ZFX/PlasticBagsLandfill.jpg?format=1500w"
            alt="First slide"
          />
          <input className="input" type="text" placeholder="Category" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://thumbs.dreamstime.com/b/garbage-dump-site-outside-town-129978999.jpg"
            alt="Second slide"
          />
          <input type="text" className="input" placeholder="Category" />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/photos/garbage-pile-in-trash-dump-or-landfill-pollution-concept-picture-id845816364?k=20&m=845816364&s=612x612&w=0&h=tpbBMmjQG3mtIvMJVJY03GP_IFt4cpGVrBcplJ5qo0A="
            alt="Third slide"
          />
          <input type="text"  className="input"placeholder="Category" />
          <button>Submit</button>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Slider;
