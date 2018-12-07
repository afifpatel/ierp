import React from 'react';
import ReactToExcel from 'react-html-table-to-excel';
import ReactToPrint from "react-to-print";
import { Button,ButtonToolbar, Glyphicon, Table, Panel, Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';
import ReportsCard  from '../Card/ReportsCard.jsx';
import IssueTable from '../IssueTable.jsx';
import Toast from '../Toast.jsx';
import createRef from 'createref';

//for filter
import  qs from 'query-string';
import { parse } from 'query-string';
import EmployeeFilter from '../EmployeeFilter.jsx';


const month =new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

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

  function calc_LLD(type,date){
    // console.log("calccccccccccccc lld", type, date)

    let day = date.getDate() ;
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    let current_year = new Date().getFullYear();
    const yrs_1 = Math.round(daysBetween(date,new Date())/365)
    const by_2 = yrs_1/2
    const yrs_2 = Math.round(by_2)
    
    // console.log("yrsssssssss", yrs_1, yrs_2,current_year)

    if(type == 1){
        if(year + 1 >= current_year)
        return date;

        while(year < current_year){
            year++;
        }
        let lld = new Date(year-1, month - 1, day-1);
        // console.log("type 1 lld", lld, year-1)
        return lld
    }
    else{
        if(year + 2 >= current_year)
        return date;
        while(year < current_year){
            year=year+2;
        }
        let lld = new Date(year-2, month - 1, day-1);
        // console.log("type 2 lld", lld,year-2)
        return lld;
    }
}


export default class Leave extends React.Component {
    constructor(){
        super();
        this.state = {
             employee : [],
             toastVisible: false, toastMessage: '', toastType: 'success', 
        };
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        // this.calLeaveSalary=this.calLeaveSalary.bind(this);
        this.setFilter = this.setFilter.bind(this);

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
        // console.log("location.search",parse(this.props.location.search));
         const oldQuery = parse(prevProps.location.search);
         const newQuery = parse(this.props.location.search);
         if (oldQuery.staff_code_type === newQuery.staff_code_type
             && oldQuery.staff_code_number === newQuery.staff_code_number
             && oldQuery.nationality === newQuery.nationality
             && oldQuery.name === newQuery.name
             && oldQuery.department === newQuery.department
             && oldQuery.designation === newQuery.designation
 
             // && oldQuery.owner === newQuery.owner
         ) {
             return;
         }
         this.loadData();
     }

    setFilter(query){
        // console.log(this.props.location.search);
         //console.log(query);
                 
         this.props.history.push( {pathname : this.props.location.pathname, search : qs.stringify(query)});
        
     }
    
    loadData(){
        fetch(`/api/reports/leave${this.props.location.search}`).then(response =>{
            if(response.ok){
                response.json().then(data => {
                console.log("total count of recordsssss :",data._metadata.total_count);
                data.records.forEach( employee => {
                    // console.log("Employee payrolllll  fetched isss  ===>", employee)
                    employee.doj=employee.doj != null ? new Date(employee.doj) : null;
                    // const last_date = employee.leave.last_date[employee.leave.last_date.length -1]
                    // console.log("LEAVE LAST Date  ===>", last_date)
                    employee.leave.last_date = calc_LLD(employee.leave.type, employee.doj);
                    // employee.leave.last_date=employee.leave.last_date != null ? new Date(employee.leave.last_date) : new Date(employee.doj);
                   
                    // var leave_salary =this.calLeaveSalary(employee);
                    // var gratuity = this.calGratuity(employee)
                    // employee.leave.days= daysBetween(employee.leave.last_date, new Date())
                    // employee.leave.salary = leave_salary
                    // employee.leave.gratuity = gratuity
                    // console.log("Leave and Grauity added", employee)
                    // if (issue.completionDate)
                //     issue.completionDate=new Date(issue.completionDate);
        });
            this.setState({ employee : data.records});
            });
        } else {
                response.json().then( err =>{
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
        // console.log("Issue List", this.state.employee)
        // console.log("Issue List", this.state.employee)
        const query = parse(this.props.location.search);
        // console.log("query --->", query )
        query.staff_code_number ? (query.staff_code_number=Number(query.staff_code_number)) :''
        // console.log("query --->", query )
        return (
        <div className="content"> 
        <Grid fluid>
         <Row>
             <Col md={12}>
             <Panel>
                            <Panel.Heading>
                                <Panel.Title toggle>
                                    Filter
                                </Panel.Title>
                            </Panel.Heading>
                                <Panel.Collapse>
                                <Panel.Body>
                                    <EmployeeFilter setFilter={this.setFilter} initFilter={query}/>
                                </Panel.Body>
                            </Panel.Collapse>
                    </Panel>
             </Col>
            <Col md={12}>
         {/* <ReactToPrint
                    trigger= {()=><Button bsStyle="primary" bsSize="small" style={{marginTop : '15px', }} ><Glyphicon glyph="glyphicon glyphicon-print" />PRINT</Button>}
                    content={()=>this.componentRef}
                /> */}
                <ReportsCard
                    title="Statement Showing Leave Salary, Gratuity & Air Passage "
                    category={"As on " + new Date().getDate() + " " + month[new Date().getMonth()] + " " + new Date().getFullYear()}
                    ctTableFullWidth
                    ctTableFullResponsive
                    content={ this.state.employee}  
                />
            </Col>
         </Row>

        </Grid>
        <Toast
                    showing={this.state.toastVisible} 
                    message={this.state.toastMessage}
                    onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                />
        </div>  
        
          )
    }
}