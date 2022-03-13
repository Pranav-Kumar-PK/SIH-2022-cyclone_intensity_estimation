import React, { Component } from 'react';
import  Navbar  from './navbar';
import SideBarWrap from './sidewrap';

class Starter extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <div className="header">
            
                <div className="text">
                DISCOVER the objects and features in the image using Explainable AI Techniques. Field Data is an incredible source of information to validate earth observation studies. This Field Datasets will be of high value in terms of the research and development in Space Applications. It is felt that catalogue of field data and AI based solution to discover the objects or features will be a milestone during India’s Self Reliance Journey in Geospatial Sector.
                </div>
                <br />
   
                <div className="btns gradient-button gradient-button-3">
                    Upload
                    </div>

                {/* <i className="fa fa-globe"></i> */}
                <a href="/map"><img className='fa' src="eart.png" alt="" /></a>
                    </div>
                {/* <img src="enviormnent.jpg" className="img-fluid" alt="txt" /> */}
            </div>
        );
    }
}
 
export default Starter;