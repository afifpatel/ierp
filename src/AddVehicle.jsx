import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Nav, NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, 
        ControlLabel, Button, ButtonToolbar, InputGroup, Grid, Row, Col, HelpBlock, 
        Panel, Thumbnail, Image, Label, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';


import Toast from './Toast.jsx';
import PropTypes from 'prop-types';
import  qs from 'query-string';


import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';



class AddVehicle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employee : [],
            vehicle: {
                type : 'default',
                make : 'default',
                dop : null,
                supplier : '',
                cost : null,
                depriciation: null,
                registration : {
                    number : '',
                    issue_date : null,
                    expiry_date : null,
                    cost : null
                },
                insurance : {
                    number : '',
                    issue_date : null,
                    expiry_date : null,
                    cost : null
                },
                driver : {
                    nums : 'default',
                    driver1 : 'default',
                    driver2 : 'default'
                }
            },
            invalidFields: {},
        }
        this.submit = this.submit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this)
       
    }
    componentDidMount(){
        this.loadData();
    }

    loadData(){
        fetch(`/api/employees`).then(response =>{
            if(response.ok){
                response.json().then(data => {
                console.log("total count of recordsssss :",data._metadata.total_count);
                data.records.forEach( employee => {
                    console.log("Employee fetched isss  ===>", employee)
                    employee.dob=employee.dob != null ? new Date(employee.dob) : null;
                    employee.doj=employee.doj != null ? new Date(employee.doj) : null;
                    employee.dot=employee.dot != null ? new Date(employee.dot) : null;
                    employee.civil.issue_date=employee.civil.issue_date != null ? new Date(employee.civil.issue_date) : null;
                    employee.civil.expiry_date=employee.civil.expiry_date != null ? new Date(employee.civil.expiry_date) : null;
                    employee.visa.issue_date=employee.visa.issue_date != null ? new Date(employee.visa.issue_date) : null;
                    employee.visa.expiry_date=employee.visa.expiry_date != null ? new Date(employee.visa.expiry_date) : null;
    
                // if (issue.completionDate)
                //     issue.completionDate=new Date(issue.completionDate);
        });
            this.setState({ employee : data.records});
            });
        } else {
                respons.json().then( err =>{
                    // alert("Failed to fetch issues:" + error.message)
                    this.showError(`Failed to fetch issues ${error.message}`);
                });
            }
        }).catch(err => {
            // alert("Error in fetching data from server:", err);
            this.showError(`Error in fetching data from server: ${err}`);
        });
    }


    submit(e){
       const newVehicle = this.state.vehicle
        e.preventDefault()
        console.log("Submitted state ", this.state.vehicle)

        fetch('/api/fleet/addVehicle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVehicle),
        }).then(response => {
            if (response.ok) {
                console.log("response is ok")
                response.json().then(AddedVehicle => {
                console.log("Added vehicle ", AddedVehicle)
                
                // this.props.history.push(`/employees/${AddedEmployee.new_employee._id}`);
                this.props.history.push(`/fleet`);

            });
            } else {
                response.json().then(error => {
                this.showError(`Failed to add issue: ${error.message}`);
            });
    }
    }).catch(err => {
            this.showError(`Error in sending data to server: ${err.message}`);
    });
    
    }

    onValidityChange(event, valid) {
        
        const invalidFields = Object.assign({}, this.state.invalidFields);
        
        if (!valid) {
            invalidFields[event.target.name] = true;
        } else {
            delete invalidFields[event.target.name];
        }
        this.setState({ invalidFields });
    }

    onChange(e,convvertedValue){  
        // console.log("See e and e target value :", e.target.name, e.target.value)
        const vehicle = Object.assign({}, this.state.vehicle);
        // console.log("New employee object :", employee)

        const value = (convvertedValue !== undefined) ? convvertedValue :e.target.value;

        if(e.target.name.includes("registration")){
            switch(e.target.name){
                case "registration_number":{
                    vehicle.registration.number=value;
                    break;
                }
                case "registration_issue_date":{
                    vehicle.registration.issue_date=value;
                    break;
                }
                case "registration_expiry_date":{
                    vehicle.registration.expiry_date=value;
                    break;
                }
                case "registration_cost":{
                    vehicle.registration.cost=value;
                    break;
                }

            }
        }

        else if(e.target.name.includes("insurance")){
            switch(e.target.name){
                case "insurance_number":{
                    vehicle.insurance.number=value;
                    break;
                }
                case "insurance_issue_date":{
                    vehicle.insurance.issue_date=value;
                    break;
                }
                case "insurance_expiry_date":{
                    vehicle.insurance.expiry_date=value;
                    break;
                }
                case "insurance_cost":{
                    vehicle.insurance.cost=value;
                    break;
                }
            }
        }

        else if(e.target.name.includes("driver")){
            switch(e.target.name){
                case "driver_nums":{
                    vehicle.driver.nums=value;
                    break;
                }
                case "driver_driver1":{
                    console.log("Target value 1 ", value)
                    vehicle.driver.driver1=value;
                    break;
                }
                case "driver_driver2":{
                    console.log("Target value 2 ", value)
                    vehicle.driver.driver2=value;
                    break;
                }
            }
        }
        else {
            
            vehicle[e.target.name] = value;
        }
        console.log("vehicle new value :", vehicle)
        this.setState({ vehicle })
    }
    

    render() {
        // console.log("state------> ",this.state)
        // console.log("emptyFields------> ",this.state.emptyFields)

       
        const vehicle = this.state.vehicle;

        return (
                 <div className="content">
                 <Row>
                  <Col xs={10} xsOffset={1}>                 
                    <Panel>
                     <Panel.Heading style={{marginBottom : '20px'}}><div style={{fontSize : '16px'}}>Add Vehicle</div></Panel.Heading>
                        <Form horizontal onSubmit={this.onSubmit}>
                            <Jumbotron>
                                <p style={{textAlign : 'center'}}>
                                    Vehicle Details
                                </p>
                            </Jumbotron>
                            <FormGroup /*validationState={this.state.emptyFields.staff_code_type ? 'error' : null}*/>
                                <Col componentClass={ControlLabel} sm={3}>Vehicle Type</Col>
                                <Col sm={6}> 
                                <FormControl
                                    componentClass="select" 
                                    name="type"
                                    value={vehicle.type}
                                    onChange={this.onChange}
                                >
                                <option value="default" disabled>Select vehicle type</option>
                                <optgroup label="HEAVY">
                                <option value="Primover">Primover</option>
                                <option value="Trailer">Trailer</option>
                                <option value="Excavator">Excavator</option>
                                <option value="Dumper">Dumper</option>
                                </optgroup>
                                <optgroup label="LIGHT">
                                <option value="Saloon">Saloon</option>
                                <option value="SUV">SUV</option>
                                </optgroup>

                                </FormControl>
                                {/* {this.state.emptyFields.staff_code_type ? <HelpBlock>This field is required.</HelpBlock> :''} */}
                                </Col>
                            </FormGroup>
                            <FormGroup /*validationState={this.state.emptyFields.name ? 'error' : null}*/>
                                <Col componentClass={ControlLabel} sm={3}>Make</Col>
                                <Col sm={6}>                                            
                                {/* <FormControl type="text" name="make" 
                                                         placeholder="Enter vehicle make"
                                                   value={vehicle.make} onChange={this.onChange}
                                                    /> */}
                                {/* {this.state.emptyFields.name ? <HelpBlock>This field is required.</HelpBlock> :''} */}
                                
                                <SelectMake type={vehicle.type} make={vehicle.make} onChange={this.onChange}/>
                                </Col>
                                {/* <Col sm={3}>                                            
                                <FormControl type="text" name="make" 
                                                         placeholder="If Other, specify vehicle make."
                                                   value={vehicle.make === 'OTHER'? '' : vehicle.make} onChange={this.onChange}
                                                    /> */}
                                {/* <HelpBlock></HelpBlock> */}
                                {/* </Col> */}
                                </FormGroup>
                            <FormGroup validationState={this.state.invalidFields.dop ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={3}>Date of Purchase</Col>
                            <Col sm={6}>                                           
                                <FormControl
                                            componentClass={DateInput} name="dop" value={vehicle.dop} onChange={this.onChange}
                                            onValidityChange={this.onValidityChange} />
                                    {this.state.invalidFields.dop ?    <FormControl.Feedback /> : ''}
                                    {/* {this.state.emptyFields.dob? <HelpBlock>This field is required.</HelpBlock> :''} */}
                                </Col> 
                            </FormGroup>
                            <FormGroup /*validationState={this.state.emptyFields.name ? 'error' : null}*/>
                                <Col componentClass={ControlLabel} sm={3}>Supplier Name</Col>
                                <Col sm={6}>                                            
                                <FormControl type="text" name="supplier" 
                                                         placeholder="Enter supplier name"
                                                   value={vehicle.supplier} onChange={this.onChange}
                                                    />
                                {/* {this.state.emptyFields.name ? <HelpBlock>This field is required.</HelpBlock> :''} */}
                                </Col>
                            </FormGroup>
                            <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Cost</Col>  
                                        <Col sm={6}>                            
                                        <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter purchase cost"
                                                    name="cost" 
                                                    value={vehicle.cost}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                            <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                             <Col componentClass={ControlLabel} sm={3}>Registration Details</Col> 
                             <Col sm={6}>
                                <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                <Panel.Body>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Number</Col>  
                                        <Col sm={6}>                            
                                        <FormControl    type="text" 
                                                    placeholder="Enter registration number"
                                                    name="registration_number" 
                                                    value={vehicle.registration.number}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.registration_issue_date? 'error' : null}>                             
                                    <Col componentClass={ControlLabel} sm={3}>Issue Date</Col>  
                                    <Col sm={6}>      
                                            <FormControl
                                                          componentClass={DateInput} 
                                                          name="registration_issue_date" 
                                                          value={vehicle.registration.issue_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                            <FormControl.Feedback />
                                    </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.registration_expiry_date? 'error' : null}>                             
                                        <Col componentClass={ControlLabel} sm={3}>Expiry Date</Col>  
                                        <Col sm={6}>   
                                                    <FormControl   
                                                            componentClass={DateInput} 
                                                            name="registration_expiry_date" 
                                                            value={vehicle.registration.expiry_date}
                                                            onChange={this.onChange}
                                                            onValidityChange={this.onValidityChange}
                                                                /> 
                                                <FormControl.Feedback />
                                        </Col>
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Cost</Col>  
                                        <Col sm={6}>                            
                                        <FormControl    componentClass={NumInput}
                                                    placeholder="Enter registration cost"
                                                    name="registration_cost" 
                                                    value={vehicle.registration.cost}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>        
                                    </FormGroup>
                                    <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                             <Col componentClass={ControlLabel} sm={3}>Insurance Details</Col> 
                             <Col sm={6}>
                                <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                <Panel.Body>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Number</Col>  
                                        <Col sm={6}>                            
                                        <FormControl    type="text" 
                                                    placeholder="Enter policy number"
                                                    name="insurance_number" 
                                                    value={vehicle.insurance.number}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.insurance_issue_date? 'error' : null}>                             
                                    <Col componentClass={ControlLabel} sm={3}>Issue Date</Col>  
                                    <Col sm={6}>      
                                            <FormControl
                                                          componentClass={DateInput} 
                                                          name="insurance_issue_date" 
                                                          value={vehicle.insurance.issue_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                            <FormControl.Feedback />
                                    </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.insurance_expiry_date? 'error' : null}>                             
                                        <Col componentClass={ControlLabel} sm={3}>Expiry Date</Col>  
                                        <Col sm={6}>   
                                                    <FormControl   
                                                            componentClass={DateInput} 
                                                            name="insurance_expiry_date" 
                                                            value={vehicle.insurance.expiry_date}
                                                            onChange={this.onChange}
                                                            onValidityChange={this.onValidityChange}
                                                                /> 
                                                <FormControl.Feedback />
                                        </Col>
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Cost</Col>  
                                        <Col sm={6}>                            
                                        <FormControl    componentClass={NumInput}
                                                    placeholder="Enter insurance cost"
                                                    name="insurance_cost" 
                                                    value={vehicle.insurance.cost}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>        
                                    </FormGroup>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Depreciation</Col>  
                                        <Col sm={6}>                            
                                        <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter depriciation percent"
                                                    name="depriciation" 
                                                    value={vehicle.depriciation}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    <Jumbotron>
                                        <p style={{textAlign : 'center'}}>
                                            Driver Details
                                        </p>
                                    </Jumbotron>
                                    <FormGroup /*validationState={this.state.emptyFields.staff_code_type ? 'error' : null}*/>
                                <Col componentClass={ControlLabel} sm={3}>Number of Drivers</Col>
                                <Col sm={6}> 
                                <FormControl
                                    componentClass="select" 
                                    name="driver_nums"
                                    value={vehicle.driver.nums}
                                    onChange={this.onChange}
                                >
                                    <option value="default" disabled>Select Number of drivers</option>
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                </FormControl>
                                {/* {this.state.emptyFields.staff_code_type ? <HelpBlock>This field is required.</HelpBlock> :''} */}
                                </Col>
                                </FormGroup>
                                <FormGroup /*validationState={this.state.emptyFields.staff_code_type ? 'error' : null}*/>
                                <Col componentClass={ControlLabel} sm={3}>{this.state.vehicle.driver.nums !== 'Double' ? 'Driver' : 'Driver 1'}</Col>
                                <Col sm={6}> 
                                <SelectEmployee 
                                    num={1} 
                                    value1={vehicle.driver.driver1}
                                    value2={vehicle.driver.driver2} 
                                    issues_prop={this.state.employee} onChange={this.onChange}/>
                                </Col>
                                </FormGroup>
                                {vehicle.driver.nums === 'Double' ?(
                                <FormGroup /*validationState={this.state.emptyFields.staff_code_type ? 'error' : null}*/>
                                <Col componentClass={ControlLabel} sm={3}>Driver 2</Col>
                                <Col sm={6}> 
                                <SelectEmployee num={2} 
                                    value1={vehicle.driver.driver2} 
                                    value2={vehicle.driver.driver1} 
                                    issues_prop={this.state.employee} onChange={this.onChange}/>
                                </Col>
                                </FormGroup>
                                ) : ''}
                                    <FormGroup>
                                        <Col smOffset={3} sm={6}>
                                            <ButtonToolbar>
                                                <Button type="button" bsStyle="primary"  onClick={this.submit}>Submit</Button>
                                                <Button><Link to="/fleet" style={{textDecoration: 'none', color : 'gray'}}>Back</Link></Button>
                                            </ButtonToolbar>
                                        </Col>
                                    </FormGroup>
                            </Form>
                    </Panel>
            </Col>  
            </Row>
        </div>    
                        // </Modal.Footer>
                // </Modal>
                // <Toast
                //     showing={this.state.toastVisible} message={this.state.toastMessage}
                //     onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                // />
            // </div>
        );
    }


}

function SelectMake(props){
    switch(props.type){
        case "Primover":
            return(<FormControl
                componentClass="select" 
                name="make"
                value={props.make}
                onChange={props.onChange}
            >
                    <option value="default" disabled>Select vehicle make</option>
                    <option value="MAN">MAN</option>
                    <option value="BENZ">BENZ</option>
                    <option value="ATLAS">ATLAS</option>
            </FormControl>
            )
            case "Trailer":
            return(<FormControl
                componentClass="select" 
                name="make"
                value={props.make}
                onChange={props.onChange}
            >
                
                  <option value="default" disabled>Select vehicle make</option>
                  <option value="ATLAS">ATLAS</option>
                   </FormControl>
            )
            case "Excavator":
            return(<FormControl
                componentClass="select" 
                name="make"
                value={props.make}
                onChange={props.onChange}
            >
                    <option value="default" disabled>Select vehicle make</option>
                    <option value="KOMATSU">KOMATSU</option>
                    <option value="VOLVO">VOLVO</option>
                    </FormControl>
            )
            case "Dumper":
            return(<FormControl
                componentClass="select" 
                name="make"
                value={props.make}
                onChange={props.onChange}
            >
                    <option value="default" disabled>Select vehicle make</option>
                    <option value="KOMATSU">KOMATSU</option>
                    </FormControl>
            )
            // case "Shovel":
            // return(<div>
            //         <option value="KOMATSU">KOMATSU</option>
            //         </div>
            // )
            case "SUV":
            return(<FormControl
                componentClass="select" 
                name="make"
                value={props.make}
                onChange={props.onChange}
            >
                <option value="default" disabled>Select vehicle make</option>
                <option value="LEXUS">LEXUS</option>
                <option value="TOYOTA PRADO">TOYOTA PRADO</option>
                <option value="TOYOTA FORTUNER">TOYOTA FORTUNER</option>
                <option value="HYUNDAI TUCSON">HYUNDAI TUCSON</option>
                <option value="NISSAN PATHFINDER">NISSAN PATHFINDER</option>
                <option value="OTHER">OTHER</option>
                </FormControl>
        )
            case "Saloon":
                return(<FormControl
                componentClass="select" 
                name="make"
                value={props.make}
                onChange={props.onChange}
            >
                    <option value="default" disabled>Select vehicle make</option>
                    <option value="TOYOTA CAMRY">TOYOTA CAMRY</option>
                    <option value="HYUNDAI ACCENT">HYUNDAI TUCSON</option>
                    <option value="TOYOTA CAMRY">TOYOTA AVALON</option>
                    <option value="TOYOTA COROLLA">TOYOTA COROLLA</option>
                    <option value="TOYOTA YARIS">TOYOTA YARIS</option>
                    <option value="OTHER">OTHER</option>
                    </FormControl>
                )
            default:
            return(<FormControl
                componentClass="select" 
                name="make"
                value={props.make}
                onChange={props.onChange}
            >
                <option value="default" disabled>Select vehicle type first</option>
                </FormControl>
            )  


    }
}
export default withRouter(AddVehicle);

function SelectEmployee(props){
    const issueRows= props.issues_prop.map( i => <IssueRow key={i._id} row_value={i} num={props.num} value2={props.value2}/>)

    console.log("IssueRow ", issueRows)
    const num = props.num;
    if (num === 1 )
    return(
        <FormControl
        componentClass="select" 
        name="driver_driver1"
        value={props.value1}
        onChange={props.onChange}
    >
        <option value="default" disabled>Select Driver #1</option>
        {issueRows}
        </FormControl> 
        )
    else 
    return(
    <FormControl
    componentClass="select" 
    name="driver_driver2"
    value={props.value1}
    onChange={props.onChange}
>
    <option value="default" disabled>Select Driver #2</option>
    {issueRows}
    </FormControl>
    )
    
}

const IssueRow = (props) => {


    const key = props.row_value.staff_code_type + '-' + props.row_value.staff_code_number;

    // console.log(" Designation", props.row_value.designation)


    if( props.value2 === key || !(props.row_value.designation.includes('Driver'))){
        // console.log(" Num, value2, key", props.num, props.value2, key)
    return null;
    }
    else
    return(
       <option value={key} >{props.row_value.name}   {'('}{props.row_value.staff_code_type}-{props.row_value.staff_code_number}{')'}</option>
    )
}