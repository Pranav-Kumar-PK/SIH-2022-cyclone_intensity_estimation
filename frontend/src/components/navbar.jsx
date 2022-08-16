import React from "react";
import { Link } from "react-router-dom";
import {
  CDBSidebar,
  CDBContainer,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { Dropdown } from "react-bootstrap";

import "./../styles.scss";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      navbar: "navbar full",
      mode: "main-wrapper",
      moon: "fa fa-moon-o",
      sidebarArrow: "far fa-arrow-alt-circle-left",
    };

    this.sidebarToggleClass = "sidebar-collapse";
    this.sidebarHideClass = "d-none";
    this.sidebarShowClass = "sidebar-full";
  }

  handleDarkMode = () => {
    if (this.state.mode === "main-wrapper") {
      this.setState({ mode: "main-wrapper active" });
      this.setState({ moon: "fa fa-sun-o" });
    } else {
      this.setState({ mode: "main-wrapper" });
      this.setState({ moon: "fa fa-moon-o" });
    }
  };

  handlenavToggle = () => {
    /* if(this.state.navbar==="navbar")
      this.setState({navbar:"navbar active"})
    else{
      this.setState({navbar:"navbar"})
    } */
    let mainWrapElement = document.getElementsByTagName("main")[0];
    let sidebarWrapElement = document.getElementById("sidebar");
    if (sidebarWrapElement.classList.contains(this.sidebarHideClass)) {
      sidebarWrapElement.classList.remove(this.sidebarHideClass);
      mainWrapElement.classList.add(this.sidebarShowClass);
    } else {
      sidebarWrapElement.classList.add(this.sidebarHideClass);
      mainWrapElement.classList.remove(this.sidebarShowClass);
    }
  };

  handleSidebarToggle = () => {
    let mainWrapElement = document.getElementsByTagName("main")[0];
    if (mainWrapElement.classList.contains(this.sidebarToggleClass)) {
      mainWrapElement.classList.remove(this.sidebarToggleClass);
      this.setState({ sidebarArrow: "far fa-arrow-alt-circle-left" });
    } else {
      mainWrapElement.classList.add(this.sidebarToggleClass);
      this.setState({ sidebarArrow: "far fa-arrow-alt-circle-right" });
    }
  };

  render() {
    const isTaskViewPage = this.props.isTaskViewPage;

    return (
      <div>
        {/* <nav class="navbar navbar-default">
          <a className="noselect" href="#main-content">
            About
          </a>
          <a className="noselect" href="http://">
            Model
          </a>
        </nav>
        <p id="main-content">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
    </p> */}
      </div>
    );
  }
}

export default Navbar;
