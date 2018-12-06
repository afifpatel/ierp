import React from 'react';
import ReactToExcel from 'react-html-table-to-excel';
import ReactToPrint from "react-to-print";
import { Button,ButtonToolbar, Glyphicon, Table, Panel, Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function pad(num, size) {
    var s = "000000000" + num;
    console.log("Substring ", s.substr(s.length-size))
    return s.substr(s.length-size);
}

function daysBetween( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
  
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
  
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
      
    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
  }


 function calLeaveSalary(employee){

    console.log("calLeaveSalary ", employee)

   const days = daysBetween(employee.leave.last_date, new Date()) 
    console.log(" Days in between ", days)

   const rate = days*30/365 
   console.log(" Proportionate rate ", rate)

   const leave_salary = employee.salary.total/30 * rate
   console.log(" Leave Salary ", rate)

    return Math.round(leave_salary);

}

function calGratuity(employee){
    
    const days = daysBetween(employee.doj, new Date())
    const years = days/365;
    var remaining_years = years - 3 ;

    if (remaining_years < 0)
    remaining_years = 0

    const gratuity = (employee.salary.basic/2)* 3 + employee.salary.basic* remaining_years

    return Math.round(gratuity);
}

function callAirPassage(employee){

    const days = daysBetween(employee.leave.last_date, new Date())

    const air_passage = employee.leave.air_passage/365 * days;

    return Math.round(air_passage);
}

export default class IssueTable extends React.Component{

    constructor(props){
        super(props)
        this.state={
            employee: []
    }
}
    componentDidMount(){
      this.setState({employee: this.props.issues_props})  
    }

    componentWillReceiveProps(nextProps){
            if(nextProps.issues_props !== this.props.issues_props){
                console.log("cwrp", nextProps, this.props)

                this.setState({employee:nextProps.issues_props});
            }
        }

    render(){
    // console.log("IssueTable ...", this.state.employee[0])
        console.log("Windows url", window.location.pathname)


    if(this.state.employee && window.location.pathname === '/reports/renewals') { 
        console.log("Employee")
        const issueRows= this.state.employee.map( i => <IssueRow key={i._id} row_value={i} />)
        return(
            <div>
                <Table id="table-to-xls" striped hover ref={el => (this.componentRef = el)}>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Staff Code</th>
                            <th>Name</th>
                            <th>Civil Expiry Date</th>
                            <th>Visa Expiry Date</th>
                            <th>Passport Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>{issueRows}</tbody>
                </Table>
                {/* <Button bsStyle="success" bsSize="md"><i class="fas fa-file-excel fa-lg"></i> Export to Excel</Button> */}
               
            </div>
        )
    }

    else if(this.state.employee && window.location.pathname === '/reports/leave')
    {
        console.log("Leave ", this.state.employee)
        const issueRows= this.state.employee.map( i => <LeaveIssueRow key={i._id} row_value={i} />)
        return(
            <div>
                <Table id="table-to-xls" striped hover ref={el => (this.componentRef = el)}>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Code</th>
                            <th>Name</th>
                            <th>Desig</th>
                            <th>DOJ</th>
                            <th>Basic</th>
                            <th>HRA</th>
                            <th>OA</th>
                            <th>Salary</th>
                            <th>G.Dys</th>
                            <th>G.yrs</th>
                            <th>+3yrs</th>
                            <th>LLD</th>
                            <th>NLD</th>
                            <th>L.Dys</th>
                            <th>L.Acrd.</th>
                            <th>F.A.P.</th>
                            <th>Grty</th>
                            <th>L.S.</th>
                            <th>A.P.</th>

                        </tr>
                    </thead>
                    <tbody>{issueRows}</tbody>
                </Table>
                {/* <Button bsStyle="success" bsSize="md"><i class="fas fa-file-excel fa-lg"></i> Export to Excel</Button> */}
               
            </div>
        )
    }
    else if(this.state.employee && window.location.pathname === '/reports/payroll'){
        console.log("Payroll ", this.state.employee)
        const issueRows= this.state.employee.map( i => <PayrollIssueRow key={i._id} row_value={i} />)
        return(
            
            <Table id="table-to-xls" striped hover>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Code</th>
                        <th>Name</th>
                        {/* <th>DOJ</th> */}
                        <th>Designation</th>
                        <th>Atd</th>
                        <th>Basic</th>
                        {/* <th>E.B.</th> */}
                        <th>F.A.</th>
                        {/* <th>E.F.A.</th> */}
                        <th>H.R.A.</th>
                        <th>S.A.</th>
                        {/* <th>E.SA</th> */}
                        <th>W/E</th>
                        {/* <th>E.W/E</th> */}
                        <th>T.A.</th>
                        {/* <th>E.T.A.</th> */}
                        <th>O.A.</th>
                        {/* <th>E.O.A</th> */}
                        <th>O.T.</th>
                        <th>T.I.</th>
                        <th>S.I.</th>
                        <th>Bns</th>
                        <th>ARS</th>
                        <th>Gross Salary</th>
                        <th>S.Ins.</th>
                        <th>Mess</th>
                        <th>Phone</th>
                        <th>Fine</th>
                        <th>Others</th>
                        <th>Net Salary</th>

                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            </Table>
            //                 }
            //             />
            //         </Col>
            //     </Row>
            // </Grid>
        )
    }

    else if(this.state.employee && window.location.pathname === '/employees')
    {
        console.log("Employees List")
        const issueRows= this.state.employee.map( i => <EmployeesIssueRow key={i._id} row_value={i} />)
        return(
                <Table id="table-to-xls" striped hover>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Staff Code</th>
                        <th>Name</th>
                        <th>Nationality</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Joining Date</th>
                        {/* <th>Reporting</th> */}
                        {/* <th>Civil ID</th> */}
                        {/* <th>Issue Date</th> */}
                        {/* <th>Expiry Date</th> */}
                        <th>Salary</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            </Table>

        )
    }

    else 
    return(<p>Loading...</p>)
}
}

const IssueRow = (props) => {
    console.log("Each row ", props )
    return(
    <tr>
    <td>{props.row_value.staff_code_type}-{props.row_value.staff_code_number}</td>
    <td>{props.row_value.name}</td>
    <td>{props.row_value.civil.expiry_date ? formatDate(props.row_value.civil.expiry_date):''}</td>
    <td>{props.row_value.visa.expiry_date ? formatDate(props.row_value.visa.expiry_date):''}</td>
    <td>{props.row_value.passport.expiry_date ? formatDate(props.row_value.passport.expiry_date):''}</td>
    
    </tr>
    );
};

const LeaveIssueRow = (props) => {
    console.log("Row value", props.row_value)
    return(
    <tr>
    <td>{props.row_value.staff_code_type}-{props.row_value.staff_code_number}</td>
    <td>{props.row_value.name}</td>
    <td>{props.row_value.designation}</td>
    <td>{props.row_value.doj ? formatDate(props.row_value.doj):''}</td>
    <td>{props.row_value.salary.basic ? Math.round(props.row_value.salary.basic) : '-'}</td>
    <td>{props.row_value.salary.hra ?  Math.round(props.row_value.salary.hra)  : '-'}</td>
    <td>{Math.round(props.row_value.salary.total - props.row_value.salary.basic + props.row_value.salary.hra)}</td>
    <td>{Math.round(props.row_value.salary.total)}</td>
    <td>{daysBetween(props.row_value.doj, new Date())}</td>
    <td>{Math.round((daysBetween(props.row_value.doj, new Date())/365*100))/100}</td>
    <td>{(Math.round(((daysBetween(props.row_value.doj, new Date())/365)-3)*100)/100) < 0 ? '-' : (Math.round(((daysBetween(props.row_value.doj, new Date())/365)-3)*100)/100)}</td>
    <td>{formatDate(props.row_value.leave.last_date)}</td>
    <td>{calDate(props.row_value.leave.type, props.row_value.leave.last_date)}</td>
    <td>{daysBetween(props.row_value.leave.last_date, new Date())}</td>
    <td>{Math.round(daysBetween(props.row_value.leave.last_date, new Date())*30*100/365)/100}</td>
    <td>{props.row_value.leave.air_passage}</td>
    <td>{calGratuity(props.row_value)}</td>
    <td>{calLeaveSalary(props.row_value)}</td>
    <td>{callAirPassage(props.row_value)}</td>

    {/* <td>{calLeaveSalary(props.row_value)}</td> */}
    </tr>
    );
};


const PayrollIssueRow = (props) => {

    
    var total_salary = null ;
    if(props.row_value.salary !== undefined) 
        total_salary = props.row_value.salary.basic + props.row_value.salary.fa + props.row_value.salary.hra +
        +props.row_value.salary.sa + props.row_value.salary.ta + props.row_value.salary.uaw 
        +props.row_value.salary.uae + props.row_value.salary.other;

    var gross_salary= total_salary + props.row_value.arrears;

    return(
    <tr>
    {/* <td><Link to={`/issues/${props.row_value._id}`}>{props.row_value._id.substr(-4)} </Link></td> */}
    {/*  */}
    <td><Link to={`/reports/payroll/${props.row_value.staff_code_type}-${pad(props.row_value.staff_code_number,3)}`}>{props.row_value.staff_code_type}{'-'}{pad(props.row_value.staff_code_number,3)}</Link></td>
    <td>{props.row_value.name}</td>
    {/* <td>{props.row_value.doj ? formatDate(props.row_value.doj) : '-'}</td> */}
    <td>{props.row_value.designation}</td> 
    <td>{props.row_value.attendance ? props.row_value.attendance : '-'}</td>
    <td>{props.row_value.salary.basic ? Math.round(props.row_value.salary.basic) : '-'}</td>
    {/* <td>{props.row_value.salary.ebasic ? Math.round(props.row_value.salary.ebasic) : '-'}</td> */}
    <td>{props.row_value.salary.fa ? Math.round(props.row_value.salary.fa) : '-'}</td>
    {/* <td>{props.row_value.salary.efa ? props.row_value.salary.efa : '-'}</td> */}
    <td>{props.row_value.salary.hra ? Math.round(props.row_value.salary.hra) : '-'}</td>
    <td>{props.row_value.salary.sa ? Math.round(props.row_value.salary.sa) : '-'}</td>
    {/* <td>{props.row_value.salary.esa ? props.row_value.salary.esa : '-'}</td> */}
    <td>{props.row_value.salary.uaw || props.row_value.salary.uae? Math.round(props.row_value.salary.uaw + props.row_value.salary.uae): '-'}</td>
    {/* <td>{props.row_value.salary.euaw || props.row_value.salary.euae? props.row_value.salary.euaw + props.row_value.salary.euae: '-'}</td> */}
    <td>{props.row_value.salary.ta ? Math.round( props.row_value.salary.ta) : '-'}</td>
    {/* <td>{props.row_value.salary.eta ? props.row_value.salary.eta : '-'}</td> */}
    <td>{props.row_value.salary.other ? Math.round(props.row_value.salary.other) : '-'}</td>
    <td>{props.row_value.overtime ? Math.round(props.row_value.overtime) : '-'}</td>
    <td>{props.row_value.trip_allowance ? Math.round(props.row_value.trip_allowance) : '-'}</td>
    <td>{props.row_value.si ? Math.round(props.row_value.si) : '-'}</td>
    <td>{props.row_value.bonus ? Math.round(props.row_value.bonus) : '-'}</td>
    {/* <td>{props.row_value.salary.eother ? props.row_value.salary.eother : '-'}</td> */}
    <td>{props.row_value.arrears ? props.row_value.arrears : '-'}</td>
    <td>{Math.round(gross_salary)}</td>
    { props.row_value.staff_code_type === "oos" ? (
    <td>{props.row_value.social_insurance.rate ? Math.round(props.row_value.social_insurance.rate) : '-'}</td>) : <td>{'-'}</td>}
    <td>{props.row_value.deduction.mess ? props.row_value.deduction.mess : '-'}</td>
    <td>{props.row_value.deduction.phone ? props.row_value.deduction.phone : '-'}</td>
    <td>{props.row_value.deduction.penalty ? props.row_value.deduction.penalty : '-'}</td>
    <td>{props.row_value.deduction.advance ? props.row_value.deduction.advance : '-'}</td>
    <td>{props.row_value.net_salary ? Math.round(props.row_value.net_salary) : '-'}</td>
    {/* <td>{props.row_value.salary.remarks ? props.row_value.salary.remarks : '-'}</td> */}
    {/* <td><Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button></td> */}
</tr>
    );
};

const EmployeesIssueRow = (props) => {

    var total_salary = null ;
    if(props.row_value.salary !== undefined) {
        total_salary = props.row_value.salary.basic + props.row_value.salary.fa + props.row_value.salary.hra +
        +props.row_value.salary.sa + props.row_value.salary.ta + props.row_value.salary.uaw 
        +props.row_value.salary.uae + props.row_value.salary.other;
        total_salary = Math.round(total_salary*1000)/1000
    }
    
    return(
    <tr>
    {/* <td><Link to={`/issues/${props.row_value._id}`}>{props.row_value._id.substr(-4)} </Link></td> */}
    <td><Link to={`/employees/editEmployee/${props.row_value.staff_code_type}-${pad(props.row_value.staff_code_number,3)}`}>{props.row_value.staff_code_type}-{pad(props.row_value.staff_code_number,3)}</Link></td>
    <td>{props.row_value.name}</td>
    <td>{props.row_value.nationality}</td>
    <td>{props.row_value.department}</td>       
    <td>{props.row_value.designation}</td> 
    <td>{props.row_value.doj ? formatDate(props.row_value.doj):''}</td>
    {/* <td>{props.row_value.dob.toDateString()}</td> */}
    {/* <td>{ props.row_value.reporting && props.row_value.reporting instanceof Array? Object.keys(props.row_value.reporting).map(function(key, index){
        return <span key={key}>{props.row_value.reporting[key]}<br /></span>
    }) : props.row_value.reporting}</td>
    <td>{props.row_value.reporting}</td> */}
    {/* <td>{props.row_value.civil ? props.row_value.civil.id : ''}</td> */}
    {/* <td>{props.row_value.civil.issue_date ? formatDate(props.row_value.civil.issue_date): ''}</td> */}
    {/* <td>{props.row_value.civil.expiry_date ? formatDate(props.row_value.civil.expiry_date):''}</td> */}
    <td>{total_salary}</td> 
    {/* {/* <td>{props.row_value.completionDate ? props.row_value.completionDate.toDateString() : '' }</td> */}
    {/* <td>{props.row_value.title}</td> */}
    {/* <td><Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button></td> */}
</tr>
    );
};


function calDate(type,date){
    let day = date.getDate() ;
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    if(type == 1)
        return formatDate(new Date(year + 1, month - 1, day-1))
    else
        return formatDate(new Date(year + 2, month - 1, day-1))
}


function formatDate(date){

    const current_date = new Date()
    let day = date.getDate() ;
    let month = date.getMonth()+1;
    let year = date.getFullYear();

if( window.location.pathname === '/reports/renewals' ) {
    if (month == current_date.getMonth() + 1 && year == current_date.getFullYear())
        return (  
        // <div style={{color : "red"}}>{day + '/' + month + '/' + year}</div>
        <div>{day + '/' + month + '/' + year}</div> )
    else
    // return (  day + '/' + month + '/' + year    )
    return (  <div>---</div>  )
        }
else if ( window.location.pathname === '/reports/leave')
        return (  <div>{day + '/' + month + '/' + year}</div> )

else if ( window.location.pathname === '/employees')
        return (  <div>{day + '/' + month + '/' + year}</div> )

}
