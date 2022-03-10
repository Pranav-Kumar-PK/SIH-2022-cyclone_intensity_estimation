import React, { Component } from 'react';
import  Navbar  from './navbar';
import SideBarWrap from './sidewrap';
class Starter extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <div className="header">
                <Navbar/>
                <SideBarWrap/>
                <div className="text">
                To get labels of the photos Upload the folder
                    </div>

                    </div>
                {/* <img src="enviormnent.jpg" className="img-fluid" alt="txt" /> */}
            </div>
        );
    }
}
 
export default Starter;