import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Alert, Button, Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';

import imagine from '../static/sidebar2.jpg';


export default class Sidebar extends React.Component{

    render(){          

        const sidebarBackground = {
            backgroundImage: 'url(http://localhost:8000/' + imagine + ')'
        };
        // console.log("Image path --->",sidebarBackground)

        return (
                <div id="sidebar" className="sidebar" data-color="black" data-image={imagine} >
                    <div className="sidebar-background" style={sidebarBackground}></div>
                    <div className="logo">
                        <div className="title-text">
                            iERP
                        </div>                    
                    </div>
                    <div className="sidebar-wrapper">
                        <ul className="nav">
                            <li>
                                <NavLink to={'/dashboard'} activeClassName="active">
                                    <div className="font_awesome">
                                        <i className="fas fa-home fa-lg"></i>
                                        <p style={{display:'inline-block'}}>Dashboard</p>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/employees'} activeClassName="active">
                                <div className="font_awesome">
                                    <i className="fas fa-users fa-lg"></i>
                                    <p style={{display:'inline-block'}}>Employees</p>
                                </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/reports'} activeClassName="active">
                                <div className="font_awesome">
                                    <i className="fas fa-paste fa-lg"></i>
                                    <p style={{display:'inline-block'}}>Reports</p>
                                </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/accounts'} activeClassName="active">
                                <div className="font_awesome">
                                    <i className="fas fa-suitcase fa-lg"></i>
                                    <p style={{display:'inline-block'}}>Accounts</p>
                                </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/fleet'} activeClassName="active">
                                <div className="font_awesome">
                                    <i className="fas fa-truck fa-lg"></i>
                                    <p style={{display:'inline-block'}}>Fleet</p>
                                </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/shipment'} activeClassName="active">
                                <div className="font_awesome">
                                    <i className="fas fa-ship fa-lg"></i>
                                    <p style={{display:'inline-block'}}>Shipment</p>
                                </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>              
                </div>
        )
    }

}