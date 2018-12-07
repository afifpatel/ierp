import React from 'react';
import ReactToExcel from 'react-html-table-to-excel';
import ReactToPrint from "react-to-print";
import ReactTable from "react-table";
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

export default class Renewals extends React.Component {
    constructor(){
        super();
        this.state = {
             employee : [],
             toastVisible: false, toastMessage: '', toastType: 'success', 
        };
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        this.setFilter = this.setFilter.bind(this);

    }

    showError(message) {
        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    }
    dismissToast() {
        this.setState({ toastVisible: false });
    }

    setFilter(query){
        // console.log(this.props.location.search);
         //console.log(query);
                 
         this.props.history.push( {pathname : this.props.location.pathname, search : qs.stringify(query)});
        
     }
    

    componentWillMount(){
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

    
    loadData(){
        fetch(`/api/reports/renewals${this.props.location.search}`).then(response =>{
            if(response.ok){
                var new_data = [];
                response.json().then(data => {
                // console.log("total count of recordsssss :",data._metadata.total_count);
                data.records.forEach( employee => {
                    // console.log("Employee fetched isss  ===>", employee)
                    if(employee.civil.expiry_date == null && employee.visa.expiry_date == null && employee.passport.expiry_date == null )
                    {
                        // console.log("All null")
                    }
                    else{
                    employee.civil.expiry_date=employee.civil.expiry_date != null ? new Date(employee.civil.expiry_date) : null;
                    employee.visa.expiry_date=employee.visa.expiry_date != null ? new Date(employee.visa.expiry_date) : null;
                    employee.passport.expiry_date=employee.passport.expiry_date != null ? new Date(employee.passport.expiry_date) : null;
                // if (issue.completionDate)
                //     issue.completionDate=new Date(issue.completionDate);

                       new_data.push(employee)
                }
        });
            this.setState({ employee : new_data});
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

        return (
        <div className="content"> 
        <Grid fluid>
         <Row>
                     <Col md={12}>
         {/* <ReactToPrint
                    trigger= {()=><Button bsStyle="primary" bsSize="small" style={{marginTop : '15px', }} ><Glyphicon glyph="glyphicon glyphicon-print" />PRINT</Button>}
                    content={()=>this.componentRef}
                /> */}<Panel>
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
                            title="Renewals"
                            category={month[new Date().getMonth()] + " " + new Date().getFullYear()}
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

