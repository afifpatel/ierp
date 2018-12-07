import React from 'react';
import { NavItem, Nav, Navbar, NavDropdown, MenuItem, Col, FormGroup, FormControl, Button, InputGroup, Glyphicon, ControlLabel, HelpBlock} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';

import EmployeeAddNavItem from './EmployeeAddNavItem.jsx';
import SearchBar from './SearchBar.jsx';

export default class HeaderLinks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            isVisible : false
        }
        this.handleOpen=this.handleOpen.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.updateModal=this.updateModal.bind(this)
    }

    handleOpen(){
        this.setState({ isOpen : true})
    }

    handleClose(){
        this.setState({isOpen : false})
    }

    updateModal(isVisible) {
    	this.state.isVisible = isVisible;
      this.forceUpdate();
    }

    render(){
        // const notification = (
        //     <div>
        //         <i className="fa fa-globe"></i>
        //         <b className="caret"></b>
        //         <span className="notification">5</span>
        //         <p className="hidden-lg hidden-md">Notification</p>
        //     </div>
        // );
        return (
            <div>
                <Nav>
                    {/* <NavItem eventKey={1} href="#">
                        <i className="fas fa-chart-pie"></i>
                        <p className="hidden-lg hidden-md">Dashboard</p>
                    </NavItem> */}
                    {/* <NavDropdown eventKey={2} title={notification} noCaret id="basic-nav-dropdown">
                        <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                        <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                        <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                        <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                        <MenuItem eventKey={2.5}>Another notifications</MenuItem>
                    </NavDropdown> */}
                    {(window.location.pathname.includes('employees') )? 
                    // <NavItem eventKey={1}>
                    <Nav>
                        <LinkContainer to="/employees/addEmployee" >
                            <NavItem eventKey={1}>Add Employee</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/employees/attendance" >
                            <NavItem eventKey={1}>Attendance</NavItem>
                        </LinkContainer>
                    </Nav>
                    // </NavItem> 
                    :
                    ""}
                    {/* {(window.location.pathname.includes('accounts') )? 
                        <LinkContainer to="/accounts/payroll" >
                            <NavItem eventKey={1}>Payroll</NavItem>
                        </LinkContainer>
                    :
                    ""} */}
                     {/* {(window.location.pathname.includes('fleet') )? 
                        <LinkContainer to="/fleet/addVehicle" >
                            <NavItem eventKey={1}>Add Vehicle</NavItem>
                        </LinkContainer>
                    :
                    ""} */}
                    {(window.location.pathname.includes('reports') )? 
                    // <NavItem eventKey={1}>
                    <Nav>
                        <LinkContainer to="/reports/renewals" >
                            <NavItem eventKey={1}>Renewals</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/reports/leave" >
                            <NavItem eventKey={1}>Leave</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/reports/payroll" >
                            <NavItem eventKey={1}>Payroll</NavItem>
                        </LinkContainer>
                    </Nav>
                    :
                    ""}
                   </Nav>
                
                <Nav pullRight>
                    <NavItem eventKey={1} className="search-bar">
                        <SearchBar />
                    </NavItem>
                    
                    <NavDropdown 
                        eventKey={2} 
                        title="Account" 
                        id="basic-nav-dropdown-right"
                        onMouseEnter = {this.handleOpen}
                        onMouseLeave = {this.handleClose}
                        onToggle={this.handleOpen}
                        open={this.state.isOpen} 
                        noCaret >
                            <MenuItem eventKey={2.1}>Action</MenuItem>
                        <MenuItem eventKey={2.2}>Another action</MenuItem>
                        <MenuItem eventKey={2.3}>Something</MenuItem>
                        <MenuItem eventKey={2.4}>Another action</MenuItem>
                        <MenuItem eventKey={2.5}>Something</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={2.5}>Logout</MenuItem>
                    </NavDropdown>
                    {/* <NavItem eventKey={3} href="#">Log out</NavItem> */}
                </Nav>
            </div>
        );
    }
}

// export default HeaderLinks;



//<Navbar.Form pullLeft>
                        // {/* <FormGroup bsSize="small">
    //                         <InputGroup>
    //                             <InputGroup.Addon>
    //                                 <FormControl type="text" placeholder="Search" />
    //                                 <InputGroup.Button>
    //                                 <Button type='submit' bsSize="xsmall">
    //                                     <i className="fas fa-search fa-sm"></i>                                   
    //                                 </Button>
    //                                 </InputGroup.Button>
    //                             </InputGroup.Addon>
    //                         </InputGroup>
    //                     </FormGroup> */}
    // //                    <FormGroup
      //                  controlId="formBasicText"
                        // validationState={this.getValidationState()}
                        // >
                        // {/* <ControlLabel>Working example with validation</ControlLabel> */}
                        // <FormControl
                        //     type="text"
                            // value={this.state.value}
     //                       placeholder="Search..."
                            // onChange={this.handleChange}>
                            // >
       //                 </FormControl>
                        // {/* <FormControl.Feedback /> */}
                        // {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
                        // </FormGroup>
                    // </Navbar.Form>