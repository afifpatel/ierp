import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Alert, Button, Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';


// import Sidebar  from 'react-bootstrap-sidebar';


// import IssueAddNavItem from './IssueAddNavItem.jsx';
import HeaderLinks from './HeaderLinks.jsx'
// import logo from './reactlogo.png';


export default class Header extends React.Component {

    getBrand(){
        return window.location.pathname.split('/')[1];
    }

    render(){

        return(
        <div className="header">
            <Navbar fluid>
               <Navbar.Header>
                   <Navbar.Brand>
                        {this.getBrand()}
                    </Navbar.Brand>
               </Navbar.Header>
               <Navbar.Collapse>
                   <HeaderLinks />
               </Navbar.Collapse>
           </Navbar> 
        </div>     
        );
    }
}
        
    function onSelectAlert(eventKey){
        console.log("BYEEEEEEEEEEEEEEEEEE")
        
        if (confirm("Are you sure you want to logout")) {
            window.location.pathname = '/login'
        } else {
            console.log("Cancellled")
        }
    }



/* <div id="sidebar-menu" className="sideBarMenuContainer">
    <Navbar fluid className="sidebar" inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <div className="simple-text logo-normal">
                Majan Mining
                </div>
            </Navbar.Brand>
        </Navbar.Header> 
            <Nav>
                <LinkContainer to="/issues/">
                    <NavItem><ListEmployees /></NavItem>
                </LinkContainer> 
                <LinkContainer to="/reports">
                    <NavItem>Reports</NavItem>
                </LinkContainer>
            </Nav>
    </Navbar>
</div>   */

/* <LinkContainer to="/issues">
                                <NavItem>Employees</NavItem>
                            </LinkContainer> */
                            /* <NavDropdown 
                                eventKey={3}
                                onMouseEnter = {this.handleOpen}
                                onMouseLeave = {this.handleClose}
                                onToggle={this.handleOpen}
                                open={this.state.isOpen} 
                                noCaret 
                                title="Employees" 
                                id="employees_drop_down"
                            > */