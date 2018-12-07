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

import { SelectCodeType, SelectDesignation, SelectNationality, SelectReporting } from './Select.jsx';
import SalaryCalc from './SalaryCalc.jsx';
import EmployeeValid  from './EmployeeValidate.jsx'

class EmployeeAddNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                name: '', nationality: 'default',
                staff_code_type: 'default', staff_code_number: null,
                department: 'default', designation: 'default', reporting: '',
                dob: null, doj: null, dot: null,
                phone_number : null,
                email : '',
                address : '',
                salary:{
                    basic: null,
                    hra: null,
                    fa: null,
                    sa: null,
                    ta: null,
                    other: null,
                    uaw : null,
                    uae : null,
                    total: 0
                },
                leave : {
                    type : 'default',
                    last_date : [],
                    air_passage: null
                },
                bank : {
                    acct : null,
                    name : '',
                    branch : ''
                },
                civil:{
                    id: null,
                    issue_date: null,
                    expiry_date: null
                },
                visa:{
                    profession: '',
                    clearance: '',
                    issue_date: null,
                    expiry_date: null
                },
                passport : {
                    number : '',
                    issue_date: null,
                    expiry_date: null
                },
                license : {
                    number : null,
                    issue_date: null,
                    expiry_date: null
                }

            },
      //  file_path:'',
        db_employees : [],
        open:false,      //salary panel
        showing: false,
        clearable: true, //react-select
        duplicate_id : false,
        invalidFields: {},
        emptyFields:{}, 
        toastVisible: false, toastMessage: '', toastType: 'success',
    };
    // this.showModal = this.showModal.bind(this);
    // this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);

    this.onChange=this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    // this.handleFileUpload = this.handleFileUpload.bind(this)
    // this.onBlur = this.onBlur.bind(this);
    // this.onClick = this.onClick.bind(this)
    // this.handleSpaceKeyDown=this.handleSpaceKeyDown.bind(this);
    // this.handleOutsideClick=this.handleOutsideClick.bind(this)
    }

    componentDidMount(){
        // console.log("fetching existing employees to avoid staff code duplications")
        fetch(`/api/employee_add${this.props.location.search}`).then(response =>{
            if(response.ok){
                response.json().then(data => {
                // console.log("total count of recordsssss :",data._metadata.total_count);
                data.records.forEach( employee => {
                    // console.log("Employee fetched isss  ===>", employee)
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
            this.setState({ db_employees : data.records});
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
   
    showError(message) {
        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    }
    dismissToast() {
        this.setState({ toastVisible: false });
    }
    
    submit(e) {
        e.preventDefault();
        const newEmployee = this.state.employee;
        const db_employees = this.state.db_employees;

        //check for staff code duplicates
        const duplicate_id = EmployeeValid.checkDuplicates(newEmployee, db_employees)
        
        // console.log("In submit after duplicate validation function" ,duplicate_id)
        if (duplicate_id == true){
            // console.log("Ready to change id state to true" ,duplicate_id)
            this.setState({duplicate_id : true})
            return;
        }
        

        const empty_fields = EmployeeValid.validateEmployee(newEmployee)
        const EmptyFields = Object.assign({}, this.state.emptyFields);

        if(Object.keys(empty_fields).length !== 0 ){
            this.setState({emptyFields : empty_fields})
            return;
        }
    
       
        //Modifying Reporting field before submiting
        const reporting_arr = [];
        const value = newEmployee.reporting.slice()
        for(var i=0; i< value.length; i++){
            reporting_arr.push(value[i].group.label + '::' + value[i].label);
        }
        newEmployee.reporting = reporting_arr.slice();

        //Clear leave_last_day to keep last value only
        const leave_last_date = []
        leave_last_date.push(newEmployee.leave.last_date[newEmployee.leave.last_date.length -1])

        newEmployee.leave.last_date = leave_last_date.slice();

        // console.log("New employee prepared for fetch ", newEmployee)


        fetch('/api/employee_add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee),
        }).then(response => {
            if (response.ok) {
                // console.log("response is ok")
                response.json().then(AddedEmployee => {
                // console.log("Added employee ", AddedEmployee)
                
                // this.props.history.push(`/employees/${AddedEmployee.new_employee._id}`);
                this.props.history.push(`/employees`);

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
        // console.log("in OnvalidityChange ... event.target.name  and  valid", event.target.name,valid)
        // console.log("in OnvalidityChange ... invalidField current state" ,this.state.invalidFields)

        const invalidFields = Object.assign({}, this.state.invalidFields);
        
        if (!valid) {
            invalidFields[event.target.name] = true;
        } else {
            delete invalidFields[event.target.name];
        }
        // console.log("in OnvalidityChange exit ...invalid Fields[] ", invalidFields)        
        this.setState({ invalidFields });
    }

    onChange(e,convvertedValue){  
        // console.log("See e and e target value :", e.target.name, e.target.value)
        const employee = Object.assign({}, this.state.employee);
        // console.log("New employee object :", employee)

        const value = (convvertedValue !== undefined) ? convvertedValue :e.target.value;

        // console.log("employee[e.target.name]",employee[e.target.name]  )
        
        
        if(e.target.name === "reporting"){
            const reporting_array = employee.reporting.concat(e.target.value);
            employee.reporting=reporting_array;
        }
           
        else if (e.target.name.includes("salary")){
            switch(e.target.name){
                case "salary_basic":{
                    // console.log("Onchange Salary basic")
                    employee.salary.basic=value;
                    const total =employee.salary.basic + employee.salary.fa + employee.salary.hra + employee.salary.other + employee.salary.sa + employee.salary.ta + employee.salary.uaw + employee.salary.uae;
                    employee.salary.total = Math.round(total*1000)/1000
                    break;
                }
                case "salary_fa":{
                    employee.salary.fa=value;
                    const total =employee.salary.basic + employee.salary.fa + employee.salary.hra + employee.salary.other + employee.salary.sa + employee.salary.ta + employee.salary.uaw + employee.salary.uae;
                    employee.salary.total = Math.round(total*1000)/1000
                    break;
                }
                case "salary_hra":{
                    employee.salary.hra=value;
                    const total =employee.salary.basic + employee.salary.fa + employee.salary.hra + employee.salary.other + employee.salary.sa + employee.salary.ta + employee.salary.uaw + employee.salary.uae;
                    employee.salary.total = Math.round(total*1000)/1000
                    break;
                }
                case "salary_other":{
                    employee.salary.other=value;
                    const total =employee.salary.basic + employee.salary.fa + employee.salary.hra + employee.salary.other + employee.salary.sa + employee.salary.ta + employee.salary.uaw + employee.salary.uae;
                    employee.salary.total = Math.round(total*1000)/1000
                    break;
                }
                case "salary_sa":{
                    employee.salary.sa=value;
                    const total =employee.salary.basic + employee.salary.fa + employee.salary.hra + employee.salary.other + employee.salary.sa + employee.salary.ta + employee.salary.uaw + employee.salary.uae;
                    employee.salary.total = Math.round(total*1000)/1000
                    break;
                }
                case "salary_ta":{
                    employee.salary.ta=value;
                    const total =employee.salary.basic + employee.salary.fa + employee.salary.hra + employee.salary.other + employee.salary.sa + employee.salary.ta + employee.salary.uaw + employee.salary.uae;
                    employee.salary.total = Math.round(total*1000)/1000
                    break;
                }
                case "salary_uaw":{
                    employee.salary.uaw=value;
                    const total =employee.salary.basic + employee.salary.fa + employee.salary.hra + employee.salary.other + employee.salary.sa + employee.salary.ta + employee.salary.uaw + employee.salary.uae;
                    employee.salary.total = Math.round(total*1000)/1000
                    break;
                }
                case "salary_uae":{
                    employee.salary.uae=value;
                    const total =employee.salary.basic + employee.salary.fa + employee.salary.hra + employee.salary.other + employee.salary.sa + employee.salary.ta + employee.salary.uaw + employee.salary.uae;
                    employee.salary.total = Math.round(total*1000)/1000
                    break;
                }

            }
        }
        else if(e.target.name.includes("leave")){
            switch(e.target.name){
                case "leave_type":{
                    employee.leave.type=value;
                    break;
                }
                case "leave_last_date":{
                    employee.leave.last_date.push(value);
                    break;
                }
                case "leave_air_passage":{
                    employee.leave.air_passage=value;
                    break;
                }
            }
        }    
        else if(e.target.name.includes("bank")){
            switch(e.target.name){
                case "bank_acct":{
                    employee.bank.acct=value;
                    break;
                }
                case "bank_name":{
                    employee.bank.name=value;
                    break;
                }
                case "bank_branch":{
                    employee.bank.branch=value;
                    break;
                }
            }
        }
        else if(e.target.name.includes("passport")){
            switch(e.target.name){
                case "passport_number":{
                    employee.passport.number=value;
                    break;
                }
                case "passport_issue_date":{
                    employee.passport.issue_date=value;
                    break;
                }
                case "passport_expiry_date":{
                    employee.passport.expiry_date=value;
                    break;
                }
            }
        }
        else if(e.target.name.includes("license")){
            switch(e.target.name){
                case "license_number":{
                    employee.license.number=value;
                    break;
                }
                case "license_issue_date":{
                    employee.license.issue_date=value;
                    break;
                }
                case "license_expiry_date":{
                    employee.license.expiry_date=value;
                    break;
                }
            }
        }
        else if(e.target.name.includes("civil")){
            switch(e.target.name){
                case "civil_id":{
                    employee.civil.id=value;
                    break;
                }
                case "civil_issue_date":{
                    employee.civil.issue_date=value;
                    break;
                }
                case "civil_expiry_date":{
                    employee.civil.expiry_date=value;
                    break;
                }
            }
        }    
        else if(e.target.name.includes("visa")){
            switch(e.target.name){
                case "visa_profession":{
                    employee.visa.profession=value;
                    break;
                }
                case "visa_clearance":{
                    employee.visa.clearance=value;
                    break;
                }
                case "visa_issue_date":{
                    employee.visa.issue_date=value;
                    break;
                }
                case "visa_expiry_date":{
                    employee.visa.expiry_date=value;
                    break;
                }
            }
        }    
        else {
            
            employee[e.target.name] = value;
        }
        // console.log("employeee new value :", employee)
        this.setState({ employee })
    }

onSelect(selectedOption){
        const employee = Object.assign({}, this.state.employee);
        // console.log('Selected option ---> ', selectedOption);
        const value = selectedOption === null ? '' : selectedOption;
        employee.reporting=value;
        this.setState({ employee });
        // console.log(`Selected: ${selectedOption.label}`);
      }

    render() {
        // console.log("state------> ",this.state)
        // console.log("emptyFields------> ",this.state.emptyFields)

       
        const employee = this.state.employee;

        return (
                 <div className="content">
                 <Row>
                  <Col xs={10} xsOffset={1}>                 
                    <Panel>
                     <Panel.Heading style={{marginBottom : '20px'}}><div style={{fontSize : '16px'}}>Add Employee</div></Panel.Heading>
                        <Form horizontal onSubmit={this.onSubmit}>
                     {/* <FormGroup>
                        <Col sm={3} smOffset={4}>
                        <Image src='../default.png' id="image-ref" responsive style={{ marginLeft : '42px'}}/>
                         </Col>
                     </FormGroup> */}
                     {/* <FormGroup>
                     <Col sm={8} smOffset={4}>
                     <input type="file" name="file-7[]" id="file-7" className="inputfile inputfile-6" onChange={this.handleFileUpload} />
                     <label htmlFor="file-7"><span></span> 
                     <strong>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> */}
                     {/* Browse&hellip;
                     </strong>
                     </label>
                     </Col>
                 </FormGroup> */} 
                 {/* <FormGroup>
                 <Col sm={3} >
                            <h3>
                                <Label>Personal Details ---</Label>
                            </h3>
                 </Col>
                 </FormGroup> */}

                            <Jumbotron>
                                <p>
                                    Personal Details
                                </p>
                            </Jumbotron>

                            <FormGroup validationState={this.state.emptyFields.name ? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Name</Col>
                                <Col sm={8}>                                            
                                <FormControl type="text" name="name" 
                                                         placeholder="Enter name"
                                                   value={employee.name} onChange={this.onChange}
                                                    />
                                {this.state.emptyFields.name ? <HelpBlock>This field is required.</HelpBlock> :''}
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Nationality</Col>
                                <Col sm={8}>
                                        <SelectNationality nationality={employee.nationality}
                                        onChange={this.onChange}
                                        />
                                </Col>
                            </FormGroup>
                                <FormGroup validationState={this.state.invalidFields.dob || this.state.emptyFields.dob ? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Date of Birth</Col>
                                <Col sm={8}>                                           
                                 <FormControl
                                                componentClass={DateInput} name="dob" value={employee.dob} onChange={this.onChange}
                                                onValidityChange={this.onValidityChange} />
                                        {this.state.invalidFields.dob ?    <FormControl.Feedback /> : ''}
                                        {this.state.emptyFields.dob? <HelpBlock>This field is required.</HelpBlock> :''}
                                    </Col> 
                                </FormGroup>
                                <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Phone number</Col>
                                <Col sm={8}>                                            
                                <FormControl componentClass={NumInput} name="phone_number"  value={employee.phone_number} 
                                                                        onChange={this.onChange} />
                                </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Col componentClass={ControlLabel} sm={3}>Email</Col>
                                    <Col sm={8}>                                            
                                    <FormControl type="email" name="email" 
                                                            placeholder="Enter email address"
                                                    value={employee.email} onChange={this.onChange}
                                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Col componentClass={ControlLabel} sm={3}>Address</Col>
                                    <Col sm={8}>                                            
                                    <FormControl type="text" name="address" 
                                                            placeholder="Enter permanent address as in passport"
                                                    value={employee.address} onChange={this.onChange}
                                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                             <Col componentClass={ControlLabel} sm={3}>Passport Details</Col> 
                             <Col sm={8}>
                         <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                <Panel.Body>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Number</Col>  
                                        <Col sm={6}>                            
                                    <FormControl    type="text" 
                                                    placeholder="Enter passport number"
                                                    name="passport_number" 
                                                    value={employee.passport.number}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.passport_issue_date? 'error' : null}>                             
                                    <Col componentClass={ControlLabel} sm={3}>Issue Date</Col>  
                                    <Col sm={6}>      
                                            <FormControl
                                                          componentClass={DateInput} 
                                                          name="passport_issue_date" 
                                                          value={employee.passport.issue_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                            <FormControl.Feedback />
                                    </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.passport_expiry_date? 'error' : null}>                             
                                        <Col componentClass={ControlLabel} sm={3}>Expiry Date</Col>  
                                        <Col sm={6}>   
                                                    <FormControl   
                                                            componentClass={DateInput} 
                                                            name="passport_expiry_date" 
                                                            value={employee.passport.expiry_date}
                                                            onChange={this.onChange}
                                                            onValidityChange={this.onValidityChange}
                                                                /> 
                                                <FormControl.Feedback />
                                        </Col>
                                        </FormGroup>
                                    </Row>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>        
                                    </FormGroup>

                                    <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                             <Col componentClass={ControlLabel} sm={3}>Driver License</Col> 
                             <Col sm={8}>
                         <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                <Panel.Body>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Number</Col>  
                                        <Col sm={6}>                            
                                    <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter license number"
                                                    name="license_number" 
                                                    value={employee.license.number}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.license_issue_date? 'error' : null}>                             
                                    <Col componentClass={ControlLabel} sm={3}>Issue Date</Col>  
                                    <Col sm={6}>      
                                            <FormControl
                                                          componentClass={DateInput} 
                                                          name="license_issue_date" 
                                                          value={employee.license.issue_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                            <FormControl.Feedback />
                                    </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.license_expiry_date? 'error' : null}>                             
                                        <Col componentClass={ControlLabel} sm={3}>Expiry Date</Col>  
                                        <Col sm={6}>   
                                                    <FormControl   
                                                            componentClass={DateInput} 
                                                            name="license_expiry_date" 
                                                            value={employee.license.expiry_date}
                                                            onChange={this.onChange}
                                                            onValidityChange={this.onValidityChange}
                                                                /> 
                                                <FormControl.Feedback />
                                        </Col>
                                        </FormGroup>
                                    </Row>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>        
                                    </FormGroup>


                                <Jumbotron>
                                    <p>
                                        Employee Details
                                    </p>
                                </Jumbotron>
                            
                            <FormGroup validationState={this.state.emptyFields.staff_code_type ? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Staff Type</Col>
                                <Col sm={8}> 
                                <FormControl
                                    componentClass="select" //placeholder="Please select sponsorship status."
                                    name="staff_code_type"
                                    value={employee.staff_code_type}
                                    onChange={this.onChange}
                                >
                                    <option value="default">Select sponsor status</option>
                                    <option value="cos">Company Staff</option>
                                    <option value="oos">Omani Staff</option>
                                    <option value="nos">Contractor</option>
                                </FormControl>
                                {this.state.emptyFields.staff_code_type ? <HelpBlock>This field is required.</HelpBlock> :''}
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.state.emptyFields.staff_code_number || this.state.duplicate_id == true? 'error' : null}>
                                               {/* { employee.staff_code_type !== 'default' ? (
                                                <HelpBlock bsClass='help'>Enter the 3 digit code</HelpBlock>) : ""} */}
                            <Col componentClass={ControlLabel} sm={3}>Staff Code</Col>
                            <Col sm={8}> 
                                <SelectCodeType staff_code_type={employee.staff_code_type}
                                            staff_code_number={employee.staff_code_number}
                                            onChange={this.onChange}
                                            />
                            {this.state.emptyFields.staff_code_number && employee.staff_code_type !== 'default' ? <HelpBlock>This field is required.</HelpBlock> :''}
                            {this.state.duplicate_id == true ? <HelpBlock>Staff code already exists</HelpBlock> :''}
                            </Col>
                            </FormGroup>

                                <FormGroup validationState={this.state.invalidFields.doj || this.state.emptyFields.doj? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Date of Joining</Col>
                                <Col sm={8}>                                             
                                 <FormControl
                                                componentClass={DateInput} name="doj" value={employee.doj} onChange={this.onChange}
                                                onValidityChange={this.onValidityChange} />
                                        {this.state.invalidFields.doj ?    <FormControl.Feedback /> : ''}
                                        {this.state.emptyFields.doj? <HelpBlock>This field is required.</HelpBlock> :''}                                        
                                    </Col>
                                    </FormGroup>
                                    <FormGroup validationState={this.state.emptyFields.department ? 'error' : null}>
                                    <Col componentClass={ControlLabel} sm={3}>Department</Col>
                                    <Col sm={8}>                                             
                                                <FormControl
                                                componentClass="select" name="department" value={employee.department} onChange={this.onChange}
                                            >
                                                <option value="default" disabled>Please select department</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Mine">Mine</option>
                                                <option value="Plant">Plant</option>
                                                <option value="Workshop - Mine">Workshop - Mine</option>
                                                <option value="Workshop - Sanaya">Workshop - Sanaya</option>
                                                <option value="Dispatch">Dispatch</option>
                                                <option value="Store and Others">Store and Others</option>
                                            </FormControl>
                                        {this.state.emptyFields.department? <HelpBlock>This field is required.</HelpBlock> :''}
                                        </Col>
                                        </FormGroup>
                                        <FormGroup validationState={this.state.emptyFields.designation ? 'error' : null} >
                                        <Col componentClass={ControlLabel} sm={3}>Designation</Col>
                                        <Col sm={8}>                                             
                                            <SelectDesignation  department={employee.department}
                                                                designation={employee.designation}
                                                                onChange={this.onChange}
                                                            />
                                        {this.state.emptyFields.designation? <HelpBlock>This field is required.</HelpBlock> :''}
                                    </Col>  
                                    </FormGroup>
                                    <FormGroup /*validationState={this.state.emptyFields.reporting ? 'error' : null}*/>
                                    <Col componentClass={ControlLabel} sm={3}>Reporting</Col>
                                    <Col sm={8}>
                                                <SelectReporting  reporting={employee.reporting}
                                                                onSelect={this.onSelect}
                                            />
                                    </Col>
                                    </FormGroup>  
                                        {/* {this.state.emptyFields.reporing? <HelpBlock>This field is required.</HelpBlock> :''}  */}
                                    <FormGroup validationState={this.state.invalidFields.dot ? 'error' : null}>
                                    <Col componentClass={ControlLabel} sm={3}>Visa Transfer Date</Col>
                                        <Col sm={8}>
                                            <FormControl
                                                componentClass={DateInput} name="dot" value={employee.dot} onChange={this.onChange}
                                                onValidityChange={this.onValidityChange} />
                                        {this.state.invalidFields.dot ?    <FormControl.Feedback /> : ''}
                                    </Col>   
                                    </FormGroup>
                                    <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                                    <Col componentClass={ControlLabel} sm={3}>Salary</Col> 
                                    <Col sm={8}>
                                            {/* <SalaryCalc salary={employee.salary} onChange={this.onChange}/> */}
                                            <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                            <Panel.Body>
                                            <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>Basic</Col>
                                            <Col sm={3}>
    
                                                        <FormControl componentClass={NumInput} name="salary_basic"  value={employee.salary.basic} 
                                                                    onChange={this.onChange}  />
                                            {/* {this.state.emptyFields.salary_basic? <HelpBlock>Basic salary is required.</HelpBlock> :''} */}
                                                        {/* </FormGroup>  */}
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Food Allowance</Col>
                                            <Col sm={3}>                                                        
                                                            <FormControl componentClass={NumInput} name="salary_fa"  value={employee.salary.fa} 
                                                                        onChange={this.onChange} />
                                                    {/* </FormGroup>  */}
                                            </Col>
                                            </Col>
                                            <Col sm={12}>
                                                <Col componentClass={ControlLabel} sm={2}>HRA</Col>
                                                <Col sm={3}>
                                                            <FormControl componentClass={NumInput} name="salary_hra"  value={employee.salary.hra} 
                                                                        onChange={this.onChange} />
                                                    {/* </FormGroup>  */}
                                                </Col>
                                                <Col componentClass={ControlLabel} sm={4}>Site Allowance</Col>
                                                    <Col sm={3}> 
                                                                <FormControl componentClass={NumInput} name="salary_sa"  value={employee.salary.sa} 
                                                                            onChange={this.onChange} />
                                                        {/* </FormGroup>  */}
                                                </Col>
                                            </Col>
                                                <Col sm={12} style={{ marginBottom: '-20px'}} >
                                                {/* <FormGroup> */}
                                                <hr />
                                                </Col>

                                                <Col componentClass={ControlLabel} sm={4} style={{ marginBottom: '15px', textAlign : 'left'}}>Utility Allowance</Col>
                                                <Col sm={12} >
                                                    <Col componentClass={ControlLabel} sm={2} style={{ color: 'gray'}}>Water</Col>
                                                    <Col sm={3}> 
                                                            <FormControl componentClass={NumInput} name="salary_uaw"  value={employee.salary.uaw} 
                                                                        onChange={this.onChange} />
                                                    </Col>
                                                    <Col componentClass={ControlLabel} sm={4} style={{ color: 'gray'}}>Electricity</Col>  
                                                    <Col sm={3}>               
                                                            <FormControl componentClass={NumInput} name="salary_uae"  value={employee.salary.uae} 
                                                                        onChange={this.onChange} />

                                                    </Col>
                                                </Col>
                                                <Col sm={12}>
                                                <hr />
                                                </Col>
                                                <Col sm={12}>
                                                <Col componentClass={ControlLabel} sm={2}>Travel Allowance</Col>  
                                                <Col sm={3}>
                                                            <FormControl componentClass={NumInput} name="salary_ta"  value={employee.salary.ta} 
                                                                        onChange={this.onChange} />
                                                    {/* </FormGroup>  */}
                                                </Col>
                                                <Col componentClass={ControlLabel} sm={4}>Other Allowance</Col>  
                                                <Col sm={3}>
                                                            <FormControl componentClass={NumInput} name="salary_other"  value={employee.salary.other} 
                                                                        onChange={this.onChange} />
                                                    {/* </FormGroup>  */}
                                                </Col>
                                                </Col>
                                                <Col sm={12}>
                                                <Col componentClass={ControlLabel} sm={9}>Total</Col>  
                                                <Col sm={3}>
                                                            <FormControl.Static>{employee.salary.total}</FormControl.Static>
                                                    {/* </FormGroup> */}
                                                </Col>
                                                </Col>
                                            </Panel.Body>
                                        </Panel>
                                        </Col>
                                    </FormGroup>
                                
                            <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                             <Col componentClass={ControlLabel} sm={3}>Leave Details</Col> 
                             <Col sm={8}>
{/* LEAVE....................................... */}
<Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                <Panel.Body>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Number</Col>  
                                        <Col sm={6}>                            
                                        <FormControl
                                                componentClass="select" name="leave_type" value={employee.leave.type} onChange={this.onChange}
                                            >
                                                <option value="default" disabled>Please select leave type</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                        </FormControl>
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.leave_last_date? 'error' : null}>                             
                                    <Col componentClass={ControlLabel} sm={3}>Date last claimed</Col>  
                                    <Col sm={6}>      
                                            <FormControl
                                                          componentClass={DateInput} 
                                                          name="leave_last_date" 
                                                          value={employee.leave.last_date[employee.leave.last_date.length -1 ]}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                            <FormControl.Feedback />
                                    </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} sm={3}>Air Passage</Col>  
                                        <Col sm={6}>   
                                            <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter air passage amount."
                                                    name="leave_air_passage" 
                                                    value={employee.leave.air_passage}
                                                    onChange={this.onChange}
                                                                />                     
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>
                                    </FormGroup>
{/* LEAVE ENDSSSSSSSSS.......... */}








                                    <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                             <Col componentClass={ControlLabel} sm={3}>Bank Details</Col> 
                             <Col sm={8}>
                                <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                <Panel.Body>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Acct.#</Col>  
                                        <Col sm={6}>                            
                                    <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter account number"
                                                    name="bank_acct" 
                                                    value={employee.bank.acct}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup>  
                                            <Col componentClass={ControlLabel} sm={3}>Bank Name</Col>  
                                            <Col sm={6}>           
                                                    <FormControl  type="text"
                                                                name="bank_name" 
                                                                placeholder="Enter bank name"
                                                                value={employee.bank.name}
                                                                onChange={this.onChange}
                                                                    />
                                            </Col>                        
                                        </FormGroup>
                                        </Row>
                                        <Row>
                                        <FormGroup>  
                                                <Col componentClass={ControlLabel} sm={3}>Branch</Col>  
                                                <Col sm={6}>           
                                                    <FormControl  type="text"
                                                          name="bank_branch"
                                                          placeholder="Enter bank branch" 
                                                          value={employee.bank.branch}
                                                          onChange={this.onChange}
                                                            />
                                                </Col>
                                        </FormGroup>
                                    </Row>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>        
                                    </FormGroup>
                             
                                {/* { employee.staff_code_type === 'cos' ? ( */}
                         {/* <div>  */}
                            {/* <Row> */}
                             <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                             <Col componentClass={ControlLabel} sm={3}>Civil Details</Col> 
                             <Col sm={8}>
                         <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                <Panel.Body>
                                    <Row>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>ID</Col>  
                                        <Col sm={6}>                            
                                    <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter civil card number"
                                                    name="civil_id" 
                                                    value={employee.civil.id}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.civil_issue_date? 'error' : null}>                             
                                    <Col componentClass={ControlLabel} sm={3}>Issue Date</Col>  
                                    <Col sm={6}>      
                                            <FormControl
                                                          componentClass={DateInput} 
                                                          name="civil_issue_date" 
                                                          value={employee.civil.issue_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                            <FormControl.Feedback />
                                    </Col>
                                    </FormGroup>
                                    </Row>
                                    <Row>
                                    <FormGroup validationState={this.state.invalidFields.civil_expiry_date? 'error' : null}>                             
                                        <Col componentClass={ControlLabel} sm={3}>Expiry Date</Col>  
                                        <Col sm={6}>   
                                                    <FormControl   
                                                            componentClass={DateInput} 
                                                            name="civil_expiry_date" 
                                                            value={employee.civil.expiry_date}
                                                            onChange={this.onChange}
                                                            onValidityChange={this.onValidityChange}
                                                                /> 
                                                <FormControl.Feedback />
                                        </Col>
                                        </FormGroup>
                                    </Row>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>        
                                    </FormGroup>
                                    <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                                    <Col componentClass={ControlLabel} sm={3}>Visa Details</Col> 
                                    {/* <SalaryCalc salary={employee.salary} onChange={this.onChange}/> */}
                                    <Col sm={8}>
                                        <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                        <Panel.Body>
                                       <Row>
                                       <FormGroup>  
                                            <Col componentClass={ControlLabel} sm={3}>Profession</Col>  
                                            <Col sm={6}>           
                                                    <FormControl  type="text"
                                                                name="visa_profession" 
                                                                placeholder="Enter visa profession"
                                                                value={employee.visa.profession}
                                                                onChange={this.onChange}
                                                                    />
                                            </Col>                        
                                        </FormGroup>
                                        </Row>
                                        <Row>
                                        <FormGroup>  
                                                <Col componentClass={ControlLabel} sm={3}>Clearance</Col>  
                                                <Col sm={6}>           
                                                    <FormControl  type="text"
                                                          name="visa_clearance"
                                                          placeholder="Enter visa clearance number" 
                                                          value={employee.visa.clearance}
                                                          onChange={this.onChange}
                                                            />
                                                </Col>
                                        </FormGroup>
                                        </Row>
                                        {/* <br /> */}
                                        <Row>
                                        <FormGroup validationState={this.state.invalidFields.visa_issue_date? 'error' : null}>                             
                                                <Col componentClass={ControlLabel} sm={3}>Issue Date</Col>  
                                                 <Col sm={6}>   
                                                <FormControl
                                                          componentClass={DateInput} 
                                                          name="visa_issue_date" 
                                                          value={employee.visa.issue_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                                <FormControl.Feedback />
                                                </Col>
                                        </FormGroup>
                                        </Row>
                                        <Row>
                                        <FormGroup validationState={this.state.invalidFields.visa_expiry_date ? 'error' : null}>
                                            <Col componentClass={ControlLabel} sm={3}>Expiry Date</Col>  
                                            <Col sm={6}>   
                                            <FormControl   
                                                          componentClass={DateInput} 
                                                          name="visa_expiry_date"
                                                          value={employee.visa.expiry_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            /> 
                                            <FormControl.Feedback />
                                            </Col>
                                            </FormGroup>
                                        </Row>
                                        </Panel.Body>
                                    </Panel>
                                    </Col>
                                    </FormGroup>
                            {/* </div>) : ""}   */}
                        <FormGroup>
                                <Col smOffset={3} sm={6}>
                            <ButtonToolbar>
                                <Button type="button" bsStyle="primary"  onClick={this.submit}>Submit</Button>
                                <Button><Link to="/employees" style={{textDecoration: 'none', color : 'gray'}}>Back</Link></Button>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                        {/* <FormGroup>
                                <Col smOffset={3} sm={6}>{validationMessage}</Col>
                        </FormGroup> */}
                            </Form>
                            {/* {validationMessage} */}
                            <Toast
                                showing={this.state.toastVisible} 
                                message={this.state.toastMessage}
                                onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                            />
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

EmployeeAddNavItem.propTypes = {
    router: PropTypes.object,
};

export default withRouter(EmployeeAddNavItem);




//Extrassssssssss


//     componentWillMount(){
//         document.addEventListener('keydown', this.handleSpaceKeyDown,false)
//         document.addEventListener('mousedown', this.handleOutsideClick,false)

//     }

//     componentWillUnmount(){
//       document.removeEventListener('keydown', this.handleSpaceKeyDown,false)
//       document.removeEventListener('mousedown', this.handleOutsideClick,false)
      
//   }
//   handleOutsideClick(e) {
//     // ignore clicks on the component itself
//     // console.log("Clicked Outside yaaaaaaaaaaaaaaaaaaayyy")
//     // if (this.node.contains(e.target)) {
//     //     return;
//     //   }
//     console.log("handle Click", e.target.name)

//     // this.setState({ open : false})
//   }

//   handleFileUpload(e){
//     console.log("handle File Upload", e)

//     let filename =e.target.value.split('\\').pop();
//     console.log(" File Name", filename)

//     var input = document.getElementById("file-7")
//     var fReader = new FileReader();
//     fReader.readAsDataURL(input.files[0]);
//     fReader.onloadend = function(event){
//         var img = document.getElementById("image-ref");
//         // console.log(" Actual File Name", event.target.result)

//         img.src = event.target.result;
//         }
    
//     var label = e.target.nextElementSibling,
//     labelVal = label.innerHTML
//     console.log(" label value", labelVal)

//     if(filename !== '')
//     label.querySelector('span').innerHTML=filename;
//     else
//     label.querySelector('span').innerHTML="Upload photo";

//    this.setState({file_path: e.target.value })
    
   // let data = new FormData();

    // data.append()
//   }

//   handleSpaceKeyDown(e) {
//     // ignore clicks on the component itself

//     if(e.code === "Space"){
//     console.log("KeyDownEvent target  ", e)
//     const employee = Object.assign({}, this.state.employee);
//     console.log("Before adding space", employee.name)

//     switch(e.target.name){
//         case "name":{
//             if(employee.name ==='' )
//             return;

//             employee["name"] = employee.name +  ' ';
//             this.setState({ employee });
//             break;
//         }
//         case "visa_profession":{
//             // console.log("KeyDownEvent on visa_profession  ", e)
//             if(employee.visa.profession ==='' )
//             return;
//             employee.visa.profession = employee.visa.profession +  ' ';
//             this.setState({ employee });
//             break;
//         }
//         case "visa_clearance":{
//             // console.log("KeyDownEvent on visa_profession  ", e)
//             if(employee.visa.clearance ==='' )
//             return;
//             employee.visa.clearance = employee.visa.clearance +  ' ';
//             this.setState({ employee });
//             break;
//         }
//     }

   
//     }
//   }
  