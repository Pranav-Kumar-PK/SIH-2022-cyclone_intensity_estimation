import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { SidebarData } from './sidebarData';

const SideBarWrap = (props) => {
  return (
    <div className="sidebar-main">
      <div class="right">
      <i id="sidebar-hover-icon" className="fas fa-arrow-alt-circle-right"></i>
      </div>
      <div id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <nav id="filter-group" className="filter-group"></nav>
        </div>
      </div>
    </div>
  );
};
export default SideBarWrap;
