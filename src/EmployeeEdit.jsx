import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import Toast from './Toast.jsx';
import Card  from './Card/Card.jsx';
import { SelectCodeType, SelectDesignation, SelectNationality, SelectReporting } from './Select.jsx';
import SalaryCalc from './SalaryCalc.jsx';



export default class EmployeeEdit extends React.Component {
    
    constructor(){
        super();
        this.state = {
            employee: {
                name: '', nationality: 'default',
                staff_code_type: 'default', staff_code_number: null,
                department: 'default', designation: 'default', reporting: '',
                dob: null, doj: null, dot: null,
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
                }

            },
            invalidFields: {}, 
            showingValidation: false,                                  //Bootstrap validation
            toastVisible: false, toastMessage: '', toastType: 'success',
        };
        this.onChange = this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.dismissValidation = this.dismissValidation.bind(this);   //Bootstrap validation
        this.showValidation = this.showValidation.bind(this);         //Bootstrap validation
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        this.createSelectItems=this.createSelectItems.bind(this)
        this.onDropdownSelected=this.onDropdownSelected.bind(this)
        this.onSelect=this.onSelect.bind(this)
        this.getOptions=this.getOptions.bind(this)
    }
    
    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.loadData();
        }
    }

    onValidityChange(event, valid) {
        const invalidFields = Object.assign({}, this.state.invalidFields);
        // console.log("in OnvalidityChange ... event.target.name  and  valid", event.target.name,valid)
        if (!valid) {
            invalidFields[event.target.name] = true;
        } else {
            delete invalidFields[event.target.name];
        }
        // console.log("in OnvalidityChange exit ...invalid Fields[] ", invalidFields)        
        this.setState({ invalidFields });
    }

    onChange(event,convvertedValue){
        // console.log("in Parent's OnChange ... event.target.value  and  convertedValue", event.target.value,convvertedValue)        
        const employee = Object.assign({}, this.state.employee);
        const value = (convvertedValue !== undefined) ? convvertedValue :event.target.value;
        //issue[event.target.name] = event.target.value;
        if(event.target.name === "reporting"){
            const reporting_array = employee.reporting.concat(event.target.value);
            employee.reporting=reporting_array;
        }
        else if (event.target.name.includes("salary")){
            switch(event.target.name){
                case "salary_basic":{
                    console.log("Onchange Salary basic")
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
        else if(event.target.name.includes("civil")){
            switch(event.target.name){
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
        else if(event.target.name.includes("visa")){
            switch(event.target.name){
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
        else{
        employee[event.target.name] = value;
        }
        this.setState({ employee });
       // console.log("In parent onChange() setting state => ", this.state.issue);
    }
    onSelect(selectedOption){
        const employee = Object.assign({}, this.state.employee);
        console.log('Selected option ---> ', selectedOption);
        console.log('state before option added ---> ', this.state.employee);
        const value = selectedOption === null ? '' : selectedOption;
        employee.reporting=value;
        this.setState({ employee });
        // console.log(`Selected: ${selectedOption.label}`);
      }

    showValidation() {
        this.setState({ showingValidation: true });
    }
    
    dismissValidation() {
        this.setState({ showingValidation: false });
    }

    onSubmit(event){
        event.preventDefault();
        this.showValidation();          //Bootstrap validation

        if(Object.keys(this.state.invalidFields).length !== 0){
                return;
        }

        const reporting_arr = [];
        const value = this.state.employee.reporting.slice()
        for(var i=0; i< value.length; i++){
            reporting_arr.push(value[i].group.label + '::' + value[i].label);
        }
        this.state.employee.reporting = reporting_arr.slice();

        console.log("New employee prepared for put ", this.state.employee)

        fetch(`/api/employees/editEmployee/${this.props.match.params.id}`,{
            method : 'PUT',
            headers : { 'Content-Type' : 'application/json'},
            body: JSON.stringify(this.state.employee),
        }).then (response => {
            if(response.ok) {
                response.json().then(updatedEmployee => {
                    // updatedIssue.created = new Date(updatedIssue.created);
                    // if (updatedEmployee.dob) {
                    //     updatedEmployee.dob = new Date(updatedEmployee.dob);
                    // }
                    // if (updatedEmployee.doj) {
                    //     updatedEmployee.doj = new Date(updatedEmployee.doj);
                    // }
                    // this.setState({employee : updatedEmployee});
                    // alert('Updated issue successfully');

                    this.showSuccess('Updated issue successfully.');
                    this.props.history.push(`/employees`);

                });
            } else {
                response.json().then( error => {
                    // alert(`Failed to update issue: ${error.message}`);
                    this.showError(`Failed to update issue: ${error.message}`);
                });
            }
        }).catch(err => {
            // alert(`Error in sending data to server: ${err.message}`);
            this.showError(`Error in sending data to server: ${err.message}`);
        });
    }


    loadData(){
        const options = [
            {
                label: 'Admin', options: [
                    { label: 'Managing Director', value: 'Managing Director' },
                    { label: 'GM Finance and Admin', value: 'GM Finance and Admin' },
                    { label: 'GM Operation and Logistics', value: 'GM Operation and Logistics' },
                    { label: 'Admin Executive', value: 'Admin Executive' },
                    { label: 'Asst. Admin', value: 'Asst. Admin' },
                    { label: 'HR Manager', value: 'HR Manager' }
                ]
            },
            {
                label: 'Mine', options: [
                    { label: 'Head - Operations', value: 'Head - Operations' },
                    { label: 'Manager', value: 'Manager' },
                    { label: 'Asst. Manager', value: 'Asst. Manager' },
                    { label: 'Foreman', value: 'Foreman' },
                ]
            },
            {
                label: 'Plant', options: [
                    { label: 'Head - Operations', value: 'Head - Operations' },
                    { label: 'Manager', value: 'Manager' },
                    { label: 'Asst. Manager HEMM', value: 'Asst. Manager HEMM' },
                ]
            },
            {
                label: 'Workshop - Mine', options: [
                    { label: 'Manager', value: 'Manager' },
                    { label: 'Asst. Manager HEMM', value: 'Asst. Manager HEMM' },
                ]
            },
            {
                label: 'Workshop - Sanaya', options: [
                    { label: 'Head - Logistics', value: 'Head - Logistics' },
                    { label: 'Asst. Manager HEMM', value: 'Asst. Manager HEMM' },
                ]
            },
            {
                label: 'Dispatch', options: [
                    { label: 'Supervisor', value: 'Supervisor (Transport & Dispatch)' },
                ]
            },
            {
                label: 'Store & Others', options: [
                    { label: 'Foreman', value: 'Foreman' },
                ]
            },
           
           
        ];

        fetch(`/api/employees/editEmployee/${this.props.match.params.id}`).then( response => {
          if (response.ok) {
              response.json().then( employee =>{
                //issue.created = new Date(issue.created);
                // employee.dob = new Date(employee.dob);

                employee.dob=employee.dob != null ? new Date(employee.dob) : null;
                employee.doj=employee.doj != null ? new Date(employee.doj) : null;
                employee.dot=employee.dot != null ? new Date(employee.dot) : null;
                employee.civil.issue_date=employee.civil.issue_date != null ? new Date(employee.civil.issue_date) : null;
                employee.civil.expiry_date=employee.civil.expiry_date != null ? new Date(employee.civil.expiry_date) : null;
                employee.visa.issue_date=employee.visa.issue_date != null ? new Date(employee.visa.issue_date) : null;
                employee.visa.expiry_date=employee.visa.expiry_date != null ? new Date(employee.visa.expiry_date) : null;

                
                console.log("employee state--->", employee)

                var new_report=[];
                for(var i=0; i< employee.reporting.length;i++){
                    const report = employee.reporting[i];
                    console.log("report --->", report)

                    const elements = report.split('::')
                    console.log("elements after split --->", elements)
                    const label = elements[0];
                    const value = elements[1];
                   
                    var options_obj;
                    for (var j=0; j < options.length; j++) {
                        if (options[j].label === label) {
                            console.log("Found sub doc in---> ", options[j].label)
                            options_obj = options[j];
                            break;
                        }
                    }
                    console.log("options object---> ", options_obj)
                    const group = {
                        label : label,
                        options : options_obj.options,
                        isInTree : true
                    }
                    const obj = { 
                        group : group,
                        label : value,
                        value : value
                    }

                    new_report.push(obj);
                    console.log("new_report object ", new_report)
                    
                    // console.log("reporting after adding obj ", employee.reporting)

                }

                employee.reporting = new_report.slice();
                // employee.civil.issue_date=employee.civil.issue_date != null ? new Date(employee.civil.issue_date) : null;
                // employee.civil.expiry_date=employee.civil.expiry_date != null ? new Date(employee.civil.expiry_date) : null;
                // employee.visa.issue_date=employee.visa.issue_date != null ? new Date(employee.visa.issue_date) : null;
                // employee.visa.expiry_date=employee.visa.expiry_date != null ? new Date(employee.visa.expiry_date) : null;

                  //issue.effort = issue.effort != null ? issue.effort.toString() : '';
                  console.log("employee to add to state --->", employee)
                  this.setState({ employee });
              });
          } else {
              response.json().then (error => {
                //   alert(`Failed to fetch issue: ${error.message}`);
                this.showError(`Failed to fetch issue: ${error.message}`);
              });
          }
        }).catch(err => {
            // alert(`Error in fetching data from server; ${err.message}`);
            this.showError(`Error in fetching data from server: ${err.message}`);
        });
    }

    showSuccess(message) {
            this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
    }

    showError(message) {
            this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    }

    dismissToast() {
            this.setState({ toastVisible: false });
    }
    createSelectItems() {
        let items = [];         
        for (let i = 0; i <= this.props.maxValue; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }  
   
   onDropdownSelected(e) {
       console.log("THE VAL", e.target.value);
       //here you will see the current selected value of the select input
   }

   getOptions(){
        console.log("in get Options --->", this.state.employee.reporting)
   }

    render(){
        // console.log("window location",window.location)
        const employee = this.state.employee;
        let validationMessage = null;
        if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
                validationMessage = (
                    <Alert bsStyle="danger" bsSize="xs" onDismiss={this.dismissValidation}>
                        Please correct invalid fields before submitting.
                    </Alert>
                );
        }

        return( 
        <div className="content">
        <Row>
            <Col xs={10} xsOffset={1}>                 
                    <Panel>
                    <Panel.Heading><div style={{fontSize : '16px'}}>Edit Employee</div></Panel.Heading>
                        <Form horizontal onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Staff Code</Col>
                                <Col sm={6}>
                                    <FormControl.Static>{employee.staff_code_type}-{employee.staff_code_number}</FormControl.Static>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Name</Col>
                                <Col sm={8}>
                                    < FormControl name="name" value={employee.name} onChange={this.onChange} />
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
                            <FormGroup validationState={this.state.invalidFields.dob ? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Date of Birth</Col>
                                <Col sm={8}>
                                    <FormControl
                                        componentClass={DateInput} name="dob" value={employee.dob} onChange={this.onChange}
                                        onValidityChange={this.onValidityChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.state.invalidFields.doj ? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Date of Joining</Col>
                                <Col sm={8}>
                                    <FormControl
                                        componentClass={DateInput} name="doj" value={employee.doj} onChange={this.onChange}
                                        onValidityChange={this.onValidityChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Department</Col>
                                <Col sm={8}>
                                    <FormControl componentClass="select" name="department" value={employee.department} onChange={this.onChange}
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
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Designation</Col>
                                <Col sm={8}>
                                <SelectDesignation  department={employee.department}
                                                                designation={employee.designation}
                                                                onChange={this.onChange}
                                                            />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>Reporting</Col>
                                <Col sm={8}>
                                <SelectReporting  reporting={employee.reporting}
                                                                onSelect={this.onSelect}
                                                                getOptions={this.getOptions}
                                            />
                                {/* <Input type="select" onChange={this.onDropdownSelected} label="reporting" multiple>
                                {this.createSelectItems()}
                                </Input> */}
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.state.invalidFields.dot ? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Date of Transfer to Majan</Col>
                                <Col sm={8}>
                                    <FormControl
                                        componentClass={DateInput} name="dot" value={employee.dot} onChange={this.onChange}
                                        onValidityChange={this.onValidityChange} />
                                    <FormControl.Feedback />
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
                           
              { employee.staff_code_type === 'cos' ? (
                        <div> 
                                <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                                <Col componentClass={ControlLabel} sm={3}>Civil Information</Col>
                                <Col sm={8}>
                             <  Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                <Panel.Body>
                                    <Row>
                                    <Col sm={6} smOffset={3}>
                                    <FormGroup>                             
                                    <InputGroup>
                                            <InputGroup.Addon className="input-group-addon-mystyle">ID</InputGroup.Addon>
                                            <FormControl  componentClass={NumInput} 
                                                          name="civil_id" 
                                                          value={employee.civil.id}
                                                          onChange={this.onChange}
                                                            />
                                    </InputGroup>
                                    </FormGroup>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col sm={6} smOffset={3}>
                                    <FormGroup validationState={this.state.invalidFields.civil_issue_date? 'error' : null}>                             
                                        <InputGroup>
                                            <InputGroup.Addon>Issue Date</InputGroup.Addon>   
                                            <FormControl
                                                          componentClass={DateInput} 
                                                          name="civil_issue_date" 
                                                          value={employee.civil.issue_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                            <FormControl.Feedback />
                                        </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col sm={6} smOffset={3}>
                                    <FormGroup validationState={this.state.invalidFields.civil_expiry_date? 'error' : null}>                             
                                        <InputGroup>
                                                <InputGroup.Addon>Expiry Date</InputGroup.Addon>  
                                                <FormControl   
                                                          componentClass={DateInput} 
                                                          name="civil_expiry_date" 
                                                          value={employee.civil.expiry_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            /> 
                                            <FormControl.Feedback />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    </Row>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                                        <Col componentClass={ControlLabel} sm={3}>Visa Information</Col> 
                                        <Col sm={8}>
                                        <Panel className="panel-salary" /*expanded={this.state.open} onToggle={this.onClick}*/ >
                                        <Panel.Body>
                                       <Row>
                                       <Col sm={6} smOffset={3}>
                                       <FormGroup>          
                                                <InputGroup>
                                                    <InputGroup.Addon>Profession</InputGroup.Addon>
                                                    <FormControl  type="text"
                                                                name="visa_profession" 
                                                                value={employee.visa.profession}
                                                                onChange={this.onChange}
                                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col sm={6} smOffset={3}>
                                        <FormGroup>          
                                                <InputGroup>
                                                    <InputGroup.Addon>Clearance</InputGroup.Addon>
                                                    <FormControl  type="text"
                                                          name="visa_clearance" 
                                                          value={employee.visa.clearance}
                                                          onChange={this.onChange}
                                                            />
                                                    </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        </Row>
                                        {/* <br /> */}
                                        <Row>
                                        <Col sm={6} smOffset={3}>
                                        <FormGroup validationState={this.state.invalidFields.visa_issue_date? 'error' : null}>                             
                                                <InputGroup>
                                                <InputGroup.Addon>Issue Date</InputGroup.Addon>
                                                <FormControl
                                                          componentClass={DateInput} 
                                                          name="visa_issue_date" 
                                                          value={employee.visa.issue_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            />
                                                <FormControl.Feedback />
                                                </InputGroup>
                                        </FormGroup>
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col sm={6} smOffset={3}>
                                        <FormGroup validationState={this.state.invalidFields.visa_expiry_date ? 'error' : null}>
                                            <InputGroup>
                                            <InputGroup.Addon>Expiry Date</InputGroup.Addon>
                                            <FormControl   
                                                          componentClass={DateInput} 
                                                          name="visa_expiry_date"
                                                          value={employee.visa.expiry_date}
                                                          onChange={this.onChange}
                                                          onValidityChange={this.onValidityChange}
                                                            /> 
                                            <FormControl.Feedback />
                                            </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        </Row>
                                        </Panel.Body>
                                    </Panel>
                                    </Col>
                                    </FormGroup>
                                    </div>) : ""}              

                            <FormGroup>
                                <Col smOffset={3} sm={6}>
                                    <ButtonToolbar>
                                        <Button bsStyle="primary" type="submit">Submit</Button>
                                        {/* <Link to="/employees"> */}
                                            <Button><Link to="/employees" style={{textDecoration: 'none', color : 'gray'}}>Back</Link></Button>
                                        {/* </Link> */}
                                    </ButtonToolbar>
                                </Col>
                            </FormGroup>
                             
                            <FormGroup>
                                <Col smOffset={3} sm={6}>{validationMessage}</Col>
                            </FormGroup>
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
        );
        
}
}
EmployeeEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired,
})
}