import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Nav, NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, 
        ControlLabel, Button, ButtonToolbar, InputGroup, Grid, Row, Col, HelpBlock, 
        Panel, Thumbnail, Image, Label, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';


import Toast from '../Toast.jsx';
import PropTypes from 'prop-types';
import  qs from 'query-string';


import NumInput from '../NumInput.jsx';
import DateInput from '../DateInput.jsx';

import { SelectCodeType, SelectDesignation, SelectNationality, SelectReporting } from '../Select.jsx';
import SalaryCalc from '../SalaryCalc.jsx';
import EmployeeValid  from '../EmployeeValidate.jsx'


export default class PayrollEdit extends React.Component {

    constructor(){
        super();
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
                }

            },
            payroll : {
            month : 'default',
            attendance : null,
            ot_rate : 'default',
            ot_hours : null,
            // ot_days : null,
            ot_calc_rate : null,
            overtime : null,
            ta_single_trips : null,
            ta_double_trips : null,
            trip_allowance : 0,
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
            deduction : {
                phone : null,
                mess : null,
                penalty : null,
                advance : null
            },
            arrears : null,
            si : null,
            bonus : null,
        },
        invalidFields : { attendance : '',
                         month : ''
                    },
        toastVisible: false, toastMessage: '', toastType: 'success',
    }
    this.formatDate=this.formatDate.bind(this);
    this.onChange=this.onChange.bind(this)
    this.submit = this.submit.bind(this)
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    }
showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
}
dismissToast() {
    this.setState({ toastVisible: false });
}

componentDidMount(){
    this.loadData();
}

componentDidUpdate(prevProps){
    if(prevProps.match.params.id !== this.props.match.params.id){
        this.loadData();
    }
}

loadData(){

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

            //   console.log("employee to add to state --->", employee)
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

formatDate(date){

    let day = date.getDate() ;
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    return (  day + '.' + month + '.' + year    )
}

submit(e){
    e.preventDefault();
    const employee = this.state.employee;
    // const newPayroll = this.state.payroll;
    const payroll = this.state.payroll;
    // console.log("Submit", this.state)


    if( payroll.month == 'default'){
        this.setState({ invalidFields : Object.assign({},this.state.invalidFields,{month : 'empty'})})
        this.showError('Select payroll month')
        return;
    }

    if( payroll.attendance == null){
        this.setState({ invalidFields : Object.assign({},this.state.invalidFields,{attendance : 'empty'})})
        this.showError('Attendance cannot be empty')
        return;
    }

    if(payroll.attendance > this.getNoDays(payroll.month)){
        // console.log("Exceeded");
        this.setState({ invalidFields : Object.assign({},this.state.invalidFields,{attendance : 'exceeded'})})
        this.showError('Attendance exceeds the number of days in a month')
        return;
    }

    const employee_reqd_fields = Object.assign({}, 
        { name: employee.name, 
          staff_code_type: employee.staff_code_type, staff_code_number: employee.staff_code_number,
          department: employee.department, designation: employee.designation, nationality: employee.nationality
        //   doj : employee.doj, account_number : employee.bank.acct
        });

    // console.log("employee state at submit ", employee_reqd_fields)
    var net = payroll.salary.total + payroll.overtime + payroll.trip_allowance + payroll.arrears +payroll.si +payroll.bonus - payroll.deduction.phone - payroll.deduction.mess - payroll.deduction.penalty - payroll.deduction.advance;
    var basic= 0;
    var insurance = 0;
    // console.log("employeeeeeeeeeeeeeee", employee)

    if( employee.staff_code_type === "oos"){ ///For omani
        // console.log("Omaniiii", employee)
        basic = employee.salary.total;
        insurance = Math.round(0.07*basic*1000)/1000;
        net = Math.round((net - insurance)*1000)/1000;
    }

    // console.log("employee net at submit ", net)
    const final_payroll = Object.assign({}, employee_reqd_fields, this.state.payroll)
    const payroll_net= Object.assign({},final_payroll, {net_salary : net, social_insurance : { basic : basic , rate : insurance } })
    // console.log("payroll state at submit ", payroll_net)
   
    fetch('/api/reports/payroll_edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payroll_net),
    }).then(response => {
        if (response.ok) {
            // console.log("response is ok")
            response.json().then(new_payroll => {
            // console.log("Added Payroll ", new_payroll)
        });
        } else {
            response.json().then(error => {
            this.showError(`Failed to add issue: ${error.message}`);
        });
        }
        }).catch(err => {
                this.showError(`Error in sending data to server: ${err.message}`);
        });

        this.props.history.push(`/reports/payroll`);

}

onChange(e,convvertedValue){
    // console.log("in Parent's OnChange ... event.target.value  and  convertedValue", e.target.value,convvertedValue)        
    const payroll = Object.assign({}, this.state.payroll);
    const value = (convvertedValue !== undefined) ? convvertedValue :e.target.value;
    if(e.target.name.includes("deduction")){
        switch(e.target.name){
            case "deduction_phone":{
                payroll.deduction.phone=value;
                break;
            }
            case "deduction_mess":{
                payroll.deduction.mess=value;
                break;
            }
            case "deduction_penalty":{
                payroll.deduction.penalty=value;
                break;
            }
            case "deduction_advance":{
                payroll.deduction.advance=value;
                break;
            }
        }
    }
    else 
    { 
        payroll[e.target.name] = value;
        if(e.target.name === 'attendance'){
            // console.log("Attendance Change", this.state.invalidFields)
            this.state.invalidFields.attendance != ''  ? this.setState({invalidFields : Object.assign({},this.state.invalidFields,{attendance : ''})}): '';
        }

        if(e.target.name === 'month'){
            // console.log("Month Change", this.state.invalidFields)
            this.state.invalidFields.month != ''  ? this.setState({invalidFields : Object.assign({}, this.state.invalidFields, {month : ''})}): '';
        }




        if(e.target.name === 'attendance' && this.state.payroll.month !== 'default'){
            var new_salary_object = this.salaryCalculate(this.state.employee.salary, e.target.value, e.target.name)
            payroll.salary = new_salary_object;
            // console.log("Pay roll object")
        }

        if(e.target.name === 'month' && this.state.payroll.attendance){
            var new_salary_object = this.salaryCalculate(this.state.employee.salary, e.target.value, e.target.name)
            payroll.salary = new_salary_object;
        }

        if(e.target.name === 'ot_hours' && this.state.payroll.ot_rate != 'default'){
            var overtime = this.getOverTime(this.state.employee.salary.basic, 22, payroll.ot_rate, e.target.value, e.target.name)
            payroll['overtime'] = overtime
        }

        if(e.target.name === 'ot_rate' && this.state.payroll.ot_hours != null){
            var overtime = this.getOverTime(this.state.employee.salary.basic, 22, payroll.ot_rate, payroll.ot_hours, e.target.name)
            payroll['overtime'] = overtime
        }

        if(e.target.name === 'ta_single_trips'){
            var trip_allowance = this.getTripAllowance(e.target.value, this.state.payroll.ta_double_trips )
            payroll['trip_allowance'] = trip_allowance
        }

        if(e.target.name === 'ta_double_trips'){
            var trip_allowance = this.getTripAllowance(this.state.payroll.ta_single_trips, e.target.value )
            payroll['trip_allowance'] = trip_allowance
        }
                           
    }
    
    this.setState({ payroll });
}

getMonthName(monthnum){
    var months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
        ];
        return months[monthnum - 1] || '';
}

getNoDays(month){
    // console.log("No of days ", month !== 'default' ? new Date(2018, month, 0).getDate() : 1)
    return month !== 'default' ? new Date(2018, month, 0).getDate() : 1
} 

salaryCalculate(salary, value, target_name){
    // console.log("salary ", (salary*this.state.payroll.attendance)/this.getNoDays(this.state.payroll.month))
    const new_salary = Object.assign({}, salary);
    // console.log("Original Salary ", new_salary)
    // console.log("Attendance ", attendance)

    var num_of_days = 0;
    var attendance = 0;

    if(target_name === 'attendance'){
        attendance = value
        num_of_days = this.state.payroll.month
    }
    else if (target_name === 'month'){
        attendance = this.state.payroll.attendance;
        num_of_days = value
    }

    new_salary.basic = Math.round((salary.basic*attendance)/this.getNoDays(num_of_days)*1000)/1000
    new_salary.fa = Math.round((salary.fa*attendance)/this.getNoDays(num_of_days)*1000)/1000
    new_salary.hra = salary.hra;
    new_salary.sa = Math.round((salary.sa*attendance)/this.getNoDays(num_of_days)*1000)/1000
    new_salary.uaw = Math.round((salary.uaw*attendance)/this.getNoDays(num_of_days)*1000)/1000
    new_salary.uae = Math.round((salary.uae*attendance)/this.getNoDays(num_of_days)*1000)/1000
    new_salary.ta = Math.round((salary.ta*attendance)/this.getNoDays(num_of_days)*1000)/1000
    new_salary.other = Math.round((salary.other*attendance)/this.getNoDays(num_of_days)*1000)/1000
    new_salary.total = new_salary.basic + new_salary.fa + new_salary.hra + new_salary.sa +
                       new_salary.uaw + new_salary.uae + new_salary.ta + new_salary.other
    new_salary.total= Math.round(new_salary.total*1000)/1000;

    return new_salary;
}

getOverTimeRate(basic, days, rate){

    var rate_calculated = 0;
    // console.log("rate initial", rate)

    var new_rate=0;

    if (rate === 'default')
        return rate_calculated
    else if ( rate === 'normal')
        new_rate = 1.25;
    else if ( rate === 'special')
        new_rate = 1.5;

    // console.log("new_rate ", new_rate)
    // console.log("basic ", basic)


    if(basic === null)
        return rate_calculated;


    rate_calculated = ((basic/days)/9)*new_rate;

    // const payroll = Object.assign({}, this.state.payroll);
    // payroll.ot_calc_rate = rate_calculated;
    // this.setState({ payroll });
    // console.log("rate_calculated ", rate_calculated)
    return Math.round(rate_calculated*1000)/1000; 
}

getOverTime(basic, days, rate,hours, target_name){
    // console.log("basic, days, rate,hours, target_name ", basic, days, rate,hours, target_name)

    // const rate_calculated = Math.round(((basic/days)/9)*rate);
    var rate_calculated = this.getOverTimeRate(basic, days, rate)

    // console.log("rate calculated ", rate_calculated)

    var overtime =0;

     overtime = Math.round(rate_calculated * hours*1000)/1000;

    // const payroll = Object.assign({}, this.state.payroll);
    // payroll.ot = overtime;
    // this.setState({ payroll });
    // console.log("overtime ", overtime)

    return Math.round(overtime*1000)/1000;

}

getSingleTripRate(trips){
    var sum =0 ;
    var object ={}
    if(trips === null)
        // return object[trips] = 0;
        return sum;

    else if(trips <= 26){
        object[trips] = 1.5
        // return object
        sum = sum + trips*1.5
        return sum;

    }
    else if (trips > 26 && trips <=56 ){
        let n1 = 26;
        let n2 = trips - n1;

        object[n1] = 1.5,
        object[n2] = 3.5,

        sum = sum + n1*1.5 + n2*3.5
        // console.log("object and sum", object, sum)
        // return object;
        return sum;
    }
    else if (trips > 56){
        let n1 = 26;
        let n2 = 30;
        let n3 = trips - 56;

        object[n1] = 1.5,
        object[n2] = 3.5,
        object[n3] = 6.5,

        sum = sum + n1*1.5 + n2*3.5 + n3*6.5

        // console.log("object  and sum", object, sum)
        // return object;

        return sum;
    }

}

getDoubleTripRate(trips){
    var sum = 0;
    var object ={}
    if(trips === null)
        // return object[trips] = 0;
        return sum;
    else if(trips <= 26){
        object[trips] = 2.5
        // return object
        sum = sum + trips*2.5
        return sum;
    }
    else if (trips > 26 && trips <=56 ){
        let n1 = 26;
        let n2 = trips - n1;

        object[n1] = 2.5,
        object[n2] = 6,

        sum = sum + n1*2.5 + n2*6

        // console.log("object ", object)
        // return object;

        return sum;
    }
    else if (trips > 56){
        let n1 = 26;
        let n2 = 30;
        let n3 = trips - 56;

        object[n1] = 2.5,
        object[n2] = 6,
        object[n3] = 6,


        // console.log("object ", object)
        // return object;

        sum = sum + n1*2.5 + n2*6 + n3*6
        return sum;
    }

}

getTripAllowance(num_of_single_trips, num_of_double_trips){
 return this.getSingleTripRate(num_of_single_trips) + this.getDoubleTripRate(num_of_double_trips);
}

render(){

    const employee = this.state.employee;
    const payroll = this.state.payroll;
    // console.log("render invalid state", this.state.invalidFields)


    return(
                <div className="content">
                 <Row>
                  <Col xs={10} xsOffset={1}>                 
                    <Panel>
                     <Panel.Heading style={{marginBottom : '20px'}}><div style={{fontSize : '16px'}}>Payroll Calculator</div></Panel.Heading>
                        <Form horizontal onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Code</Col>
                            <Col sm={3}>
                                <FormControl.Static>{employee.staff_code_type}-{employee.staff_code_number}</FormControl.Static>
                            </Col>
                            <Col componentClass={ControlLabel} sm={2}>Name</Col>
                            <Col sm={4}>
                                <FormControl.Static>{employee.name}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Department</Col>
                            <Col sm={3}>
                                <FormControl.Static>{employee.department}</FormControl.Static>
                            </Col>
                            <Col componentClass={ControlLabel} sm={2}>Designation</Col>
                            <Col sm={4}>
                                <FormControl.Static>{employee.designation}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Date of Joining</Col>
                            <Col sm={3}>
                                <FormControl.Static>{this.formatDate(new Date(employee.doj))}</FormControl.Static>
                            </Col>
                            <Col componentClass={ControlLabel} sm={2}>Bank Acct #</Col>
                            <Col sm={4}>
                                <FormControl.Static>{employee.bank.acct}</FormControl.Static>
                            </Col>
                        </FormGroup>
                        <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                            <Col smOffset={2} sm={8}>
                                <Panel>
                                <Panel.Heading>
                                <Panel.Title toggle>
                                    Salary
                                </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>Basic</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.basic}</FormControl.Static>
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Food Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.fa}</FormControl.Static>
                                            </Col>
                                        </Col>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>HRA</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.hra}</FormControl.Static>
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Site Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.sa}</FormControl.Static>
                                            </Col>
                                        </Col>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>Water Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.uaw}</FormControl.Static>
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Electricity Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.uae}</FormControl.Static>
                                            </Col>
                                        </Col>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>Travel Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.ta}</FormControl.Static>
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Other Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.other}</FormControl.Static>
                                            </Col>
                                        </Col>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={9}>Total</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.total}</FormControl.Static>
                                            </Col>
                                        </Col>
                                       </Panel.Body>
                                       </Panel.Collapse>
                                </Panel>
                            </Col>
                        </FormGroup>
                        <Row>
                        <FormGroup validationState={this.state.invalidFields.month != '' ? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Month</Col>
                                <Col sm={3}>
                                    <FormControl
                                    componentClass="select" name="month" value={payroll.month} onChange={this.onChange}
                                    >
                                    <option value='default'>--Select Month--</option>
                                    <option value='1'>January</option>
                                    <option value='2'>February</option>
                                    <option value='3'>March</option>
                                    <option value='4'>April</option>
                                    <option value='5'>May</option>
                                    <option value='6'>June</option>
                                    <option value='7'>July</option>
                                    <option value='8'>August</option>
                                    <option value='9'>September</option>
                                    <option value='10'>October</option>
                                    <option value='11'>November</option>
                                    <option value='12'>December</option>
                                    </FormControl> 
                                    {this.state.invalidFields.month != '' ?  <FormControl.Feedback /> : ''} 
                                </Col>
                                <Col componentClass={ControlLabel} sm={2}>No. of days</Col>
                                <Col sm={2}>
                                    <FormControl.Static>{ payroll.month !== 'default' ? new Date(2018, payroll.month, 0).getDate() : 0 }
                                    </FormControl.Static>
                                </Col>
                        </FormGroup>
                        <FormGroup validationState={this.state.invalidFields.attendance != '' ? 'error' : null}>
                                <Col componentClass={ControlLabel} sm={3}>Attendance</Col>  
                                <Col sm={3}>                            
                                <FormControl    componentClass={NumInput} 
                                            placeholder="Enter no. of days worked"
                                            name="attendance" 
                                            value={payroll.attendance}
                                            onChange={this.onChange}
                                                        />
                                {this.state.invalidFields.attendance != '' ?  <FormControl.Feedback /> : ''}
                                    </Col>
                        </FormGroup>
                        </Row>
                        <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                            {/* <Col componentClass={ControlLabel} sm={3}></Col>  */}
                            <Col sm={8} smOffset={2}>
                                <Panel>
                                <Panel.Heading>
                                <Panel.Title toggle>
                                    Earned Salary
                                </Panel.Title>
                            </Panel.Heading>
                                <Panel.Collapse>                                  
                                      <Panel.Body>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>Basic</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.basic}</FormControl.Static>
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Food Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.fa}</FormControl.Static>
                                            </Col>
                                        </Col>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>HRA</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.hra}</FormControl.Static>
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Site Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.sa}</FormControl.Static>
                                            </Col>
                                        </Col>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>Water Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.uaw}</FormControl.Static>
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Electricity Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.uae}</FormControl.Static>
                                            </Col>
                                        </Col>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={2}>Travel Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.ta}</FormControl.Static>
                                            </Col>
                                            <Col componentClass={ControlLabel} sm={4}>Other Allowance</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.other}</FormControl.Static>
                                            </Col>
                                        </Col>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel} sm={9}>Total</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{payroll.salary.total}</FormControl.Static>
                                            </Col>
                                        </Col>
                                       </Panel.Body>
                                       </Panel.Collapse>
                                </Panel>
                            </Col>
                        </FormGroup>
                        <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                            {/* <Col componentClass={ControlLabel} sm={3}></Col>  */}
                            <Col sm={8} smOffset={2}>
                                <Panel>
                                    <Panel.Heading style={{marginBottom : '20px'}}>Overtime Calculator</Panel.Heading>
                                    <Panel.Body>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Basic</Col>
                                            <Col sm={6}>
                                                <FormControl
                                                componentClass="select" name="ot_rate" value={payroll.ot_rate} onChange={this.onChange}
                                                >
                                                <option value='default'>--Select Rate--</option>
                                                <option value='normal'>Normal Rate ~ 1.25</option>
                                                <option value='special'>Special Rate ~ 1.5</option>
                                                </FormControl>  
                                            </Col>
                                           
                                        </FormGroup>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Hours</Col>
                                            <Col sm={6}>
                                                <FormControl    componentClass={NumInput} 
                                                placeholder="Enter number of hours"
                                                name="ot_hours" 
                                                value={payroll.ot_hours}
                                                onChange={this.onChange}
                                                        />
                                            </Col>                                            
                                        </FormGroup>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Basic Salary</Col>
                                            <Col sm={3}>
                                                <FormControl.Static>{employee.salary.basic}</FormControl.Static>
                                            </Col>
                                         </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>No. of days</Col>
                                            <Col sm={6}>
                                                {/* <FormControl    componentClass={NumInput} 
                                                placeholder="Enter number of Overtime days"
                                                name="ot_days" 
                                                value={payroll.ot_days}
                                                onChange={this.onChange}
                                                        /> */}
                                            <FormControl.Static>22</FormControl.Static>
                                            </Col> 
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Calculated Rate</Col>
                                            <Col sm={6}>
                                                <FormControl.Static>{this.getOverTimeRate(employee.salary.basic,22,payroll.ot_rate)}</FormControl.Static>
                                            </Col>
                                         </FormGroup>

                                         <FormGroup>
                                         <Col componentClass={ControlLabel} sm={3}>Over time</Col>
                                         <Col sm={6}>
                                             <FormControl.Static>{payroll.overtime?payroll.overtime : 0}</FormControl.Static>
                                         </Col>
                                      </FormGroup>

                                       </Panel.Body>
                                </Panel>
                            </Col>
                        </FormGroup>
                        <FormGroup /*validationState={this.state.emptyFields.salary_basic ? 'error' : null}*/>
                            {/* <Col componentClass={ControlLabel} sm={3}></Col>  */}
                            <Col sm={8} smOffset={2}>
                                <Panel>
                                    <Panel.Heading style={{marginBottom : '20px'}}>Trip Allowance Calculator</Panel.Heading>
                                    <Panel.Body>
                                    <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Single Trips</Col>
                                            <Col sm={6}>
                                                <FormControl    componentClass={NumInput} 
                                                placeholder="Enter number of single trips"
                                                name="ta_single_trips" 
                                                value={payroll.ta_single_trips}
                                                onChange={this.onChange}
                                                        />
                                            </Col>                                            
                                        </FormGroup>
                                    {/* <FormGroup>
                                        <Col componentClass={ControlLabel} sm={3}>Single Trip Rate</Col>
                                        <Col sm={6}>
                                            <FormControl.Static>
                                            {JSON.stringify(this.getSingleTripRate(payroll.ta_single_trips))}
                                            </FormControl.Static>
                                        </Col>
                                        </FormGroup> */}
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Double Trips</Col>
                                            <Col sm={6}>
                                                <FormControl    componentClass={NumInput} 
                                                placeholder="Enter number of double trips"
                                                name="ta_double_trips" 
                                                value={payroll.ta_double_trips}
                                                onChange={this.onChange}
                                                        />
                                            </Col>                                            
                                        </FormGroup>
                                    {/* <FormGroup>
                                        <Col componentClass={ControlLabel} sm={3}>Double Trip Rate</Col>
                                        <Col sm={6}>
                                            <FormControl.Static>{JSON.stringify(this.getDoubleTripRate(payroll.ta_double_trips))}</FormControl.Static>
                                        </Col>
                                    </FormGroup> */}
                                    {/* <FormGroup>
                                    <Col componentClass={ControlLabel} sm={3}>Trip Allowance</Col>
                                    <Col sm={6}>
                                        <FormControl.Static>{this.getTripAllowance()}</FormControl.Static>
                                    </Col>
                                    </FormGroup> */}
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} sm={3}>Trip Allowance (R.O.)</Col>
                                        <Col sm={6}>
                                        <FormControl.Static>{payroll.trip_allowance}</FormControl.Static>
                                            {/* <InputGroup>
                                            <InputGroup.Addon>O.M.R</InputGroup.Addon>
                                            <FormControl type="text" disabled value={employee.salary.ta ? employee.salary.ta : 0} style={{backgroundColor:'white'}}></FormControl>
                                            </InputGroup> */}
                                        </Col>
                                    </FormGroup>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col sm={8} smOffset={2}>
                                <Panel>
                                <Panel.Heading style={{marginBottom : '20px'}}>Deductions</Panel.Heading>
                                <Panel.Body>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Phone</Col>  
                                        <Col sm={6}>                            
                                         <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter phone deduction"
                                                    name="deduction_phone" 
                                                    value={payroll.deduction.phone}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Mess</Col>  
                                        <Col sm={6}>                            
                                         <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter mess deduction"
                                                    name="deduction_mess" 
                                                    value={payroll.deduction.mess}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Penalty</Col>  
                                        <Col sm={6}>                            
                                         <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter fine/penalty"
                                                    name="deduction_penalty" 
                                                    value={payroll.deduction.penalty}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup> 
                                        <Col componentClass={ControlLabel} sm={3}>Advance</Col>  
                                        <Col sm={6}>                            
                                         <FormControl    componentClass={NumInput} 
                                                    placeholder="Enter advance deduction"
                                                    name="deduction_advance" 
                                                    value={payroll.deduction.advance}
                                                    onChange={this.onChange}
                                                                />
                                        </Col>
                                    </FormGroup>
                                    </Panel.Body>
                                    </Panel>
                                    </Col>        
                                    </FormGroup>
                                    <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Saturday Incentive</Col>
                                            <Col sm={3}>
                                                <FormControl    componentClass={NumInput} 
                                                placeholder="Enter amount"
                                                name="si" 
                                                value={payroll.si}
                                                onChange={this.onChange}
                                                        />
                                            </Col>                                            
                                    </FormGroup>
                                    <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Bonus</Col>
                                            <Col sm={3}>
                                                <FormControl    componentClass={NumInput} 
                                                placeholder="Enter amount"
                                                name="bonus" 
                                                value={payroll.bonus}
                                                onChange={this.onChange}
                                                        />
                                            </Col>                                            
                                    </FormGroup>
                                    <FormGroup>
                                            <Col componentClass={ControlLabel} sm={3}>Arrears</Col>
                                            <Col sm={3}>
                                                <FormControl    componentClass={NumInput} 
                                                placeholder="Enter amount"
                                                name="arrears" 
                                                value={payroll.arrears}
                                                onChange={this.onChange}
                                                        />
                                            </Col>                                            
                                    </FormGroup>
                                   
                                    <FormGroup>
                                <Col sm={12}>
                                <ButtonToolbar>
                                    <Col sm={3} smOffset ={3}>
                                    <Button type="button" bsStyle="primary" block onClick={this.submit}>Generate Salary</Button>
                                    </Col>
                                    <Col sm={3} >
                                    <Button onClick={()=> this.props.history.push(`/reports/payroll`) } block>Back</Button>
                                    </Col>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                        </Form>
                        <Toast
                                showing={this.state.toastVisible} 
                                message={this.state.toastMessage}
                                onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                            />
                    </Panel>
                  </Col>
                </Row>
                </div>



    )

}

}
