import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { SidebarData } from './sidebarData';

const SideBarWrap = (props) => {
  return (
    <div id="sidebar" className="sidebar-wrapper d-none d-md-block">
      <div className="sidebar-content">
        {/* <a className="sidebar-logo" href="../">
          <span>DISCOVER</span>
        </a> */}
      </div>
      <nav id="filter-group" className="filter-group"></nav>
    </div>
  );
};

export default SideBarWrap;
