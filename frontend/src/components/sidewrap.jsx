import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { SidebarData } from './sidebarData';

class SideBarWrap extends React.Component {
    render() { 
        return <div id="sidebar" className="sidebar-wrapper d-none d-md-block">
            <div className="sidebar-content">
                <a className="sidebar-logo" href="../"><i className="fas fa-user-clock"></i> <span>TIMIZE</span></a>
                <ul>
                    <li className={this.props.clientActive}>
                        <Link to="/clients"><i className="fas fa-user-tie"></i> <span>Clients</span></Link>
                    </li>
                    <li className={this.props.projectsActive}>
                        <Link to="/project"><i className="fas fa-project-diagram"></i> <span>Project</span></Link>
                    </li>
                    <li className={this.props.membersActive}>
                        <Link to="/member"><i className="fas fa-users"></i> <span>Members</span></Link>
                    </li>
                    <li className={this.props.tasksActive}>
                        <Link to="/tasks"><i className="fas fa-tasks"></i> <span>Tasks</span></Link>
                    </li>
                </ul>
            </div>
        </div>
    }
}
 
export default SideBarWrap;