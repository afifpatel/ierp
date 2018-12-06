import React from 'react';
import 'whatwg-fetch'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import  qs from 'query-string';
import { parse } from 'query-string';
import { Button, Glyphicon, Table, Panel, Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';


import EmployeeFilter from './EmployeeFilter.jsx';
import Toast from './Toast.jsx';
import Card  from './Card/Card.jsx';

function EmployeeTable(props){
    const issueRows= props.issues_prop.map( i => <EmployeeRow key={i._id} row_value={i} deleteIssue={props.deleteIssue}/>)
    return(
            
            <Table striped hover>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Name</th>
                        <th>Staff Code</th>
                        <th>Join Date</th>
                        {/* <th>Designation</th> */}
                        {/* <th>Acct #</th> */}
                        {/* <th>Attendance</th> */}
                        <th>Basic</th>
                        <th>Total</th>
                        <th>Leave Type</th>
                        <th>Date Taken</th>
                        <th>Air Passage</th>
                        <th></th>
                        {/* <th>FA</th>
                        <th>HRA</th>
                        <th>O.T.</th>
                        <th>Trip Allowance</th>
                        <th>TA</th>
                        <th>Other</th>
                        <th>SA</th>
                        <th>Arrears</th>
                        <th>Water</th>
                        <th>Electricity</th>
                        // <th>Total</th>
                        <th>Mess Deduction</th>
                        <th>Phone</th>
                        <th>Advance</th>
                        <th>Penalty</th> */}
                        {/* <th>Net Payable in R.O.</th> */}
                        {/* <th>Remarks</th> */}

                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            </Table>
        )
}

const EmployeeRow = (props) => {

    
    var total_salary = null ;
    if(props.row_value.salary !== undefined) {
        total_salary = props.row_value.salary.basic + props.row_value.salary.fa + props.row_value.salary.hra +
        +props.row_value.salary.sa + props.row_value.salary.ta + props.row_value.salary.uaw 
        +props.row_value.salary.uae + props.row_value.salary.other;
    }

    if(props.row_value.overtime !== undefined) 
    total_salary = total_salary + props.row_value.overtime

    if(props.row_value.trip_allowance !== undefined) 
    total_salary = total_salary + props.row_value.trip_allowance

    if(props.row_value.arrears !== undefined) 
    total_salary = total_salary + props.row_value.arrears

    var net_payable=total_salary;
    if(props.row_value.deduction.mess !== undefined) 
    net_payable = net_payable - props.row_value.deduction.mess;

    if(props.row_value.deduction.phone !== undefined) 
    net_payable = net_payable - props.row_value.deduction.phone;

    if(props.row_value.deduction.penalty !== undefined) 
    net_payable = net_payable - props.row_value.deduction.penalty;

    if(props.row_value.deduction.advance !== undefined) 
    net_payable = net_payable - props.row_value.deduction.advance;

    return(
    <tr>
    {/* <td><Link to={`/issues/${props.row_value._id}`}>{props.row_value._id.substr(-4)} </Link></td> */}
    {/* <Link to={`/employees/editEmployee/${props.row_value.staff_code_type}-${props.row_value.staff_code_number}`}></Link> */}
    <td>{props.row_value.name}</td>
    <td>{props.row_value.staff_code_type}-{props.row_value.staff_code_number}</td>
    <td>{props.row_value.doj ? formatDate(props.row_value.doj) : ''}</td>
    <td>{props.row_value.salary.basic ? props.row_value.salary.basic : ''}</td>
    <td>{total_salary}</td>
    <td>{props.row_value.leave.type}</td> 
    <td>{props.row_value.leave.date_taken ? formatDate(props.row_value.leave.date_taken) : formatDate(props.row_value.doj)}</td>
    <td>{props.row_value.leave.air_passage}</td> 

    {/* <td>{props.row_value.designation}</td>  */}
    {/* <td>{props.row_value.account_number}</td>  */}
    {/* <td>{props.row_value.attendance}</td>  */}
    {/* <td>{props.row_value.salary.fa ? props.row_value.salary.fa : ''}</td>
    <td>{props.row_value.salary.hra ? props.row_value.salary.hra : ''}</td>
    <td>{props.row_value.overtime}</td> 
    <td>{props.row_value.trip_allowance}</td> 
    <td>{props.row_value.salary.ta ? props.row_value.salary.ta : ''}</td>
    <td>{props.row_value.salary.other ? props.row_value.salary.other : ''}</td>
    <td>{props.row_value.salary.sa ? props.row_value.salary.sa : ''}</td>
    <td>{props.row_value.arrears}</td> 
    <td>{props.row_value.salary.uaw ? props.row_value.salary.uaw : ''}</td>
    <td>{props.row_value.salary.uae ? props.row_value.salary.uae : ''}</td>
    <td>{total_salary}</td>
    <td>{props.row_value.deduction.mess}</td> 
    <td>{props.row_value.deduction.phone}</td> 
    <td>{props.row_value.deduction.advance}</td> 
    <td>{props.row_value.deduction.penalty}</td>  */}
    {/* <td>{net_payable}</td>  */}
    {/* <td>{props.row_value.deduction.penalty ? "ROP fine" : ''}</td>  */}






    {/* <td>{props.row_value.completionDate ? props.row_value.completionDate.toDateString() : '' }</td>
    <td>{props.row_value.title}</td> */}
    {/* <td><Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button></td> */}
</tr>
    );
};

function formatDate(date){
console.log("Format Date", date)
    let day = date.getDate() ;
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    return (  day + '.' + month + '.' + year    )
}

export default class Accounts extends React.Component{

constructor(){
    super();
    this.state = {
            payroll : [],
            toastVisible: false, toastMessage: '', toastType: 'success', 
    };

}

componentDidMount(){
    this.loadData();
}

loadData(){
    fetch(`/api/accounts`).then(response =>{
        if(response.ok){
            response.json().then(data => {
            console.log("total count of recordsssss :",data._metadata.total_count);
            data.records.forEach( payroll => {
                console.log("Employee fetched isss  ===>", payroll)
                // employee.dob=employee.dob != null ? new Date(employee.dob) : null;
                payroll.doj=payroll.doj != null ? new Date(payroll.doj) : null;
                payroll.leave.date_taken=payroll.leave.date_taken != null ? new Date(payroll.leave.date_taken) : null;

                // employee.dot=employee.dot != null ? new Date(employee.dot) : null;
                // employee.civil.issue_date=employee.civil.issue_date != null ? new Date(employee.civil.issue_date) : null;
                // employee.civil.expiry_date=employee.civil.expiry_date != null ? new Date(employee.civil.expiry_date) : null;
                // employee.visa.issue_date=employee.visa.issue_date != null ? new Date(employee.visa.issue_date) : null;
                // employee.visa.expiry_date=employee.visa.expiry_date != null ? new Date(employee.visa.expiry_date) : null;

            // if (issue.completionDate)
            //     issue.completionDate=new Date(issue.completionDate);
    });
        this.setState({ payroll : data.records});
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


render(){
    var months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
        ];
    // var month=  JSON.stringify(this.state.payroll)
    var payroll_object=Object.assign({},this.state.payroll[0]);
    
    var month = months[payroll_object.month - 1]

    console.log("month  ", month)

    var card_category = "Salary - " + month + " 2018"
    
    return(
        <div className="content"> 
        <Grid fluid>

         <Col md={12} style={{ marginLeft : '0px'}}>
                        <Card
                            title="MAJAN MINING COMPANY LLC"
                            category={card_category}
                            ctTableFullWidth
                            ctTableFullResponsive
                            content={<EmployeeTable issues_prop={this.state.payroll} />}
                        />
                    </Col>
        </Grid>
            </div>  
        
        
         )
}



}
