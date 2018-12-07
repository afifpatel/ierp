import React from 'react';
import 'whatwg-fetch'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Table, Panel, Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';


import Toast from '../Toast.jsx';
import Card  from '../Card/Card.jsx';
import ReportsCard  from '../Card/ReportsCard.jsx';

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


export default class Payroll extends React.Component{

constructor(){
    super();
    this.state = {
            employee : [],
            toastVisible: false, toastMessage: '', toastType: 'success', 
            
    };
    this.setFilter = this.setFilter.bind(this);

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
    fetch(`/api/reports/payroll${this.props.location.search}`).then(response =>{
        if(response.ok){
            response.json().then(data => {
            console.log("total count of recordsssss :",data._metadata.total_count);
            data.records.forEach( employee => {
                // console.log("Employee fetched isss  ===>", employee)
                // employee.dob=employee.dob != null ? new Date(employee.dob) : null;
                // employee.doj=employee.doj != null ? new Date(employee.doj) : null;
                // employee.dot=employee.dot != null ? new Date(employee.dot) : null;
                // employee.civil.issue_date=employee.civil.issue_date != null ? new Date(employee.civil.issue_date) : null;
                // employee.civil.expiry_date=employee.civil.expiry_date != null ? new Date(employee.civil.expiry_date) : null;
                // employee.visa.issue_date=employee.visa.issue_date != null ? new Date(employee.visa.issue_date) : null;
                // employee.visa.expiry_date=employee.visa.expiry_date != null ? new Date(employee.visa.expiry_date) : null;

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


render(){
    // console.log("Issue List", this.state.employee)
    const query = parse(this.props.location.search);
    // console.log("query --->", query )
    query.staff_code_number ? (query.staff_code_number=Number(query.staff_code_number)) :''
    // console.log("query --->", query )
    
    return(
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
                        <ReportsCard
                            title="Statement Showing Salary"
                            category={"For the month of " + month[new Date().getMonth()] + " " + new Date().getFullYear()}
                            ctTableFullWidth
                            ctTableFullResponsive
                            content={this.state.employee} />
                    </Col>
            </Row>
        </Grid>
        </div>  
        
        
         )
}



}
