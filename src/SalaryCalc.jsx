import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, 
        ControlLabel, Button, ButtonToolbar, InputGroup, Grid, Row, Col, HelpBlock, Panel } from 'react-bootstrap';


import Toast from './Toast.jsx';
import PropTypes from 'prop-types';
import  qs from 'query-string';


import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';


export default class SalaryCalc extends React.Component {

    constructor(props){
        super(props)
        this.state = { open : false,
                        salary: props.salary
        };
        console.log("In constructor...", this.state)
        this.onClick=this.onClick.bind(this);
        this.handleOutsideClick=this.handleOutsideClick.bind(this);
    }

    onClick(){
        this.setState({ open : !this.state.open})
    }

    // handleOutsideClick(e) {
    //     // ignore clicks on the component itself
    //     // console.log("Clicked Outside yaaaaaaaaaaaaaaaaaaayyy")
    //     if (this.node.contains(e.target)) {
    //         return;
    //       }
    //     this.setState({ open : false})
    //   }

    //   componentWillMount(){
    //       document.addEventListener('mousedown', this.handleOutsideClick,false)
    //   }

    //   componentWillUnmount(){
    //     document.removeEventListener('mousedown', this.handleOutsideClick,false)
    // }
    

    render(){

        return(
        
            <div style={{ border : "none"}} >
                <Button onClick={this.onClick} block>
                    Click to Enter Salary
                </Button>  
                <Panel className="panel-salary" expanded={this.state.open} onToggle={this.onClick} >
                    <Panel.Collapse>
                      <Panel.Body>
                        <Col xs={3} sm={3}>
                            <FormGroup>
                                <ControlLabel>Basic</ControlLabel>
                                <FormControl componentClass={NumInput} name="salary_basic"  value={this.props.salary.basic} 
                                            onChange={this.props.onChange}  />
                                </FormGroup> 
                        </Col>
                        <Col xs={3} sm={3}>
                            <FormGroup>
                                <ControlLabel>FA</ControlLabel>
                                    <FormControl componentClass={NumInput} name="salary_fa"  value={this.props.salary.fa} 
                                                onChange={this.props.onChange} />
                            </FormGroup> 
                        </Col>
                        <Col xs={3} sm={3}>
                            <FormGroup>
                                <ControlLabel>HRA</ControlLabel>
                                    <FormControl componentClass={NumInput} name="salary_hra"  value={this.props.salary.hra} 
                                                onChange={this.props.onChange} />
                            </FormGroup> 
                        </Col>
                        <Col xs={3} sm={3}>
                            <FormGroup>
                                <ControlLabel>Other</ControlLabel>
                                    <FormControl componentClass={NumInput} name="salary_other"  value={this.props.salary.other} 
                                                onChange={this.props.onChange} />
                            </FormGroup> 
                        </Col>
                        <Col xs={3} sm={3}>
                            <FormGroup>
                                <ControlLabel>SA</ControlLabel>
                                    <FormControl componentClass={NumInput} name="salary_sa"  value={this.props.salary.sa} 
                                                onChange={this.props.onChange} />
                            </FormGroup> 
                        </Col>
                        <Col xs={3} sm={3}>
                            <FormGroup>
                                <ControlLabel>Total</ControlLabel>
                                    <FormControl.Static>{this.props.salary.total}</FormControl.Static>
                            </FormGroup>
                        </Col>
                      </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
)
}
}







              {/* <span onClick={this.showModal}> Salary Calculator</span>
                <Modal 
                    show={this.state.showing} 
                    onHide={this.hideModal}
                    bsSize="large"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Enter Salary Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Grid fluid>
                            </Grid>
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonToolbar>
                                <Button type="button" bsStyle="primary"  onClick={this.submit}>Submit</Button>
                                <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
                            </ButtonToolbar>
                        </Modal.Footer>
                </Modal> */}


















     