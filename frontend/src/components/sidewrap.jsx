import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { SidebarData } from './sidebarData';

const SideBarWrap = (props) => {
  return (
    <div id="sidebar" className="sidebar-wrapper d-none d-md-block">
      <div className="sidebar-content">
        <a className="sidebar-logo" href="../">
          <span>DISCOVER</span>
        </a>
      </div>
      {/* <nav id="filter-group" className="filter-group"></nav> */}
      <ul>
                    <li>                        <Link to="/clients" className=""><i className="fas fa-user-tie gradient__btn gradient__btn-10"></i> <span>Clients</span></Link>
                    </li>
                    <li>
                        <Link to="/project"><i className="fas fa-project-diagram"></i> <span>Project</span></Link>
                    </li>
                    <li>
                        <Link to="/member"><i className="fas fa-users"></i> <span>Members</span></Link>
                    </li>
                    <li>                       <Link to="/tasks"><i className="fas fa-tasks"></i> <span>Tasks</span></Link>
                    </li>
                </ul>
    </div>
     
  );
};

export default SideBarWrap;
