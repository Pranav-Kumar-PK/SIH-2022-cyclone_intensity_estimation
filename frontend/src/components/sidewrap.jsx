import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { SidebarData } from './sidebarData';

const SideBarWrap = (props) => {
  return (
    <div className="sidebar-main">
      <div id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar__top">
            <div className="sidebar__heading"><span>LABELS</span></div>
            <div id="sidebar__none"></div>
            <hr />
          </div>
          <nav id="filter-group" className="filter-group"></nav>
        </div>
      </div>
    </div>
  );
};
export default SideBarWrap;
