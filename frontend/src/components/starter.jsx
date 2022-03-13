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
                 Lorem ipsum dolor sit amet consectetur 
                 adipisicing elit. Adipisci facilis odit voluptatem, magnam, 
                 hic tenetur natus, eligendi harum expedita velit nostrum perspiciatis sed voluptate ducimus!
                </div>
                <br />
   
                <div className="btns gradient-button gradient-button-3">
                    CLick Here
                    
                    </div>

                {/* <i className="fa fa-globe"></i> */}
                <img className='fa' src="eart.png" alt="" />
                    </div>
                {/* <img src="enviormnent.jpg" className="img-fluid" alt="txt" /> */}
            </div>
        );
    }
}
 
export default Starter;