import React from "react";
import{Link} from "react-router-dom"
import { CDBSidebar, CDBContainer,CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem, CDBSidebarFooter } from "cdbreact";
import {Dropdown}  from 'react-bootstrap';

import "./../styles.css";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      navbar:"navbar full",
      mode:"main-wrapper",
      moon:"fa fa-moon-o",
      sidebarArrow:"far fa-arrow-alt-circle-left"
    };

    this.sidebarToggleClass = "sidebar-collapse";
    this.sidebarHideClass = "d-none";
    this.sidebarShowClass = "sidebar-full";
  }

  handleDarkMode=()=>{
    if(this.state.mode==="main-wrapper"){
      this.setState({mode:"main-wrapper active"})
      this.setState({moon:"fa fa-sun-o"})
    }
    else{
      this.setState({mode:"main-wrapper"})
      this.setState({moon:"fa fa-moon-o"})
    }
  }

  handlenavToggle=()=>{
    /* if(this.state.navbar==="navbar")
      this.setState({navbar:"navbar active"})
    else{
      this.setState({navbar:"navbar"})
    } */
    let mainWrapElement = document.getElementsByTagName('main')[0];
    let sidebarWrapElement = document.getElementById("sidebar");
    if(sidebarWrapElement.classList.contains(this.sidebarHideClass)){
      sidebarWrapElement.classList.remove(this.sidebarHideClass);
      mainWrapElement.classList.add(this.sidebarShowClass);
    }else{
      sidebarWrapElement.classList.add(this.sidebarHideClass);
      mainWrapElement.classList.remove(this.sidebarShowClass);
    }
  }

  handleSidebarToggle=()=>{
    let mainWrapElement = document.getElementsByTagName('main')[0];
    if(mainWrapElement.classList.contains(this.sidebarToggleClass)){
      mainWrapElement.classList.remove(this.sidebarToggleClass);
      this.setState({sidebarArrow:"far fa-arrow-alt-circle-left"});
    }else{
      mainWrapElement.classList.add(this.sidebarToggleClass);
      this.setState({sidebarArrow:"far fa-arrow-alt-circle-right"});
    }
  }

  render() {
    const isTaskViewPage = this.props.isTaskViewPage;
    
    return (
      <div className="navbar">
        <button className="hamburger-btn" onClick={this.handlenavToggle}><i className="fa fa-bars"></i></button>
        <button className="sidebar-toggle-btn" onClick={this.handleSidebarToggle}><i className={this.state.sidebarArrow}></i></button>
        {/* {isTaskViewPage ? (<Timer />) : (<></>)} */}
        {/* <div className="navbar-right">
        <Link to="/private"> Login</Link>
        <Link to="/logout"> Logout</Link>
        <Dropdown className="user-dropdown">
            <Dropdown.Toggle id="user-dropdown">
              <i className="far fa-user"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">My account</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="organization-dropdown">
            <Dropdown.Toggle id="organization-dropdown">
              <img src={`${process.env.PUBLIC_URL}/assets/images/dbtez-logo.png`} alt="DBTEZ Logo"/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1"><img src={`${process.env.PUBLIC_URL}/assets/images/dbtez-logo.png`} alt="DBTEZ Logo"/> DBTEZ</Dropdown.Item>
              <Dropdown.Item href="#">Organizations menu <i className="fas fa-long-arrow-alt-right"></i></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        {/* </div> */}
      </div>
    );
  }
}
 
export default Navbar;