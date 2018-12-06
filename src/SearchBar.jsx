import React from 'react';
import { Nav, NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, 
        ControlLabel, Button, ButtonToolbar, InputGroup } from 'react-bootstrap';

export default class SearchBar extends React.Component{

    search() {
        console.log("Enter Button Pressed");
      }
    
    render() {
        // console.log("showing------> ",this.state.showing)
        return (
            <ul className="nav">
                            <li>
                             <FormGroup bsSize="small" bsClass="search-form">  
                                <InputGroup>
                                    <FormControl bsSize="small"
                                        bsClass="search-button"
                                        placeholder="Search..."
                                        type="input"
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                            this.search();
                                            }
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                            {/* <Glyphicon glyph="search" /> */}
                            </li>
            </ul>
               
        );
    }
}