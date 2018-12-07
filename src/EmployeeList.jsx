import React from 'react';
import 'whatwg-fetch'
import PropTypes from 'prop-types';
import  qs from 'query-string';
import { parse } from 'query-string';
import { Button, Glyphicon, Table, Panel, Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';


import EmployeeFilter from './EmployeeFilter.jsx';
import Toast from './Toast.jsx';
import ReportCard  from './Card/ReportsCard.jsx';
import IssueTable from './IssueTable.jsx';



// function IssueTable(props){
//     const issueRows= props.issues_prop.map( i => <IssueRow key={i._id} row_value={i} deleteIssue={props.deleteIssue}/>)
//     return(
            
//             <Table striped hover>
//                 <thead>
//                     <tr>
//                         {/* <th>ID</th> */}
//                         <th>Staff Code</th>
//                         <th>Name</th>
//                         <th>Nationality</th>
//                         <th>Department</th>
//                         <th>Designation</th>
//                         {/* <th>Joining Date</th> */}
//                         {/* <th>Reporting</th> */}
//                         <th>Civil ID</th>
//                         {/* <th>Issue Date</th> */}
//                         <th>Expiry Date</th>
//                         {/* <th>Salary</th> */}
//                         {/* <th></th> */}
//                     </tr>
//                 </thead>
//                 <tbody>{issueRows}</tbody>
//             </Table>
//             //                 }
//             //             />
//             //         </Col>
//             //     </Row>
//             // </Grid>
//         )
// }

// const IssueRow = (props) => {

//     function onDeleteClick(){
//         props.deleteIssue(props.row_value._id);
//     }

    
//     var total_salary = null ;
//     if(props.row_value.salary !== undefined) 
//         total_salary = props.row_value.salary.basic + props.row_value.salary.fa + props.row_value.salary.hra +
//         +props.row_value.salary.sa + props.row_value.salary.ta + props.row_value.salary.uaw 
//         +props.row_value.salary.uae + props.row_value.salary.other;
    
//     // console.log("This is the props.row_value.reporting ", props.row_value.reporting )

//     // function list() {
//     //     return Array.prototype.slice.call(arguments);
//     //   }
      
//     //   var list1 = list(props.row_value.reporting); // [1, 2, 3]

//     // console.log("New array after conversionnnnnnnnnnnnnnnnn ", list1 )


//     // function printReporting(arr){
//     //     console.log("This is the props.row_value.reporting ", arr )
//     //     var str = ''
//     //     for(var i =0 ; i< arr.length; i++){
//     //         str = str + arr.length[i] + '\n'
//     //     }
//     //     return str;
//     //     }

//     return(
//     <tr>
//     {/* <td><Link to={`/issues/${props.row_value._id}`}>{props.row_value._id.substr(-4)} </Link></td> */}
//     <td><Link to={`/employees/editEmployee/${props.row_value.staff_code_type}-${props.row_value.staff_code_number}`}>{props.row_value.staff_code_type}-{props.row_value.staff_code_number}</Link></td>
//     <td>{props.row_value.name}</td>
//     <td>{props.row_value.nationality}</td>
//     <td>{props.row_value.department}</td>       
//     <td>{props.row_value.designation}</td> 
//     {/* <td>{props.row_value.doj ? formatDate(props.row_value.doj) : ''}</td> */}
//     {/* <td>{props.row_value.dob.toDateString()}</td> */}
//     {/* <td>{ props.row_value.reporting && props.row_value.reporting instanceof Array? Object.keys(props.row_value.reporting).map(function(key, index){
//         return <span key={key}>{props.row_value.reporting[key]}<br /></span>
//     }) : props.row_value.reporting}</td>
//     <td>{props.row_value.reporting}</td> */}
//     <td>{props.row_value.civil ? props.row_value.civil.id : ''}</td>
//     {/* <td>{props.row_value.civil.issue_date ? formatDate(props.row_value.civil.issue_date): ''}</td> */}
//     <td>{props.row_value.civil.expiry_date ? formatDate(props.row_value.civil.expiry_date):''}</td>
//     {/* <td>{total_salary}</td>  */}
//     {/* {/* <td>{props.row_value.completionDate ? props.row_value.completionDate.toDateString() : '' }</td> */}
//     {/* <td>{props.row_value.title}</td> */}
//     {/* <td><Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button></td> */}
// </tr>
//     );
// };


// function formatDate(date){

//     let day = date.getDate() ;
//     let month = date.getMonth()+1;
//     let year = date.getFullYear();
//     return (  day + '.' + month + '.' + year    )
// }

export default class EmployeeList extends React.Component{

    constructor(){
        super();
        this.state = {
             employee : [],
             toastVisible: false, toastMessage: '', toastType: 'success', 
        };

        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue=this.deleteIssue.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        }

showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
}
dismissToast() {
    this.setState({ toastVisible: false });
}

    deleteIssue(id) {
        fetch(`/api/issues/${id}`, { method : 'delete' }).then(response => {
            if(!response.ok) this.showError(`Failed to delete issue`);
            else this.loadData();
        }).catch(err => {
            this.showError("Error in fetching data from server:", err);
        })
     }

    setFilter(query){
       // console.log(this.props.location.search);
        //console.log(query);
                
        this.props.history.push( {pathname : this.props.location.pathname, search : qs.stringify(query)});
       
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
    
    loadData(){
        fetch(`/api/employees${this.props.location.search}`).then(response =>{
            if(response.ok){
                response.json().then(data => {
                console.log("total count of recordsssss :",data._metadata.total_count);
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
        const query = parse(this.props.location.search);
        // console.log("query --->", query )
        query.staff_code_number ? (query.staff_code_number=Number(query.staff_code_number)) :''
        // console.log("query --->", query )

        return(
            <div className="content">
                <Grid fluid>
                <Row>
                    <Col md={12}>
                        {/* <Card
                            title="Filter Employees"
                            category="Select Details to filter"
                            ctTableFullWidth
                            ctTableFullResponsive
                            content={ */}
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
                             {/* }
                        /> */}
                    </Col>
                    <Col md={12}>
                        <ReportCard
                            title="Manpower"
                            category="Employee list"
                            ctTableFullWidth
                            ctTableFullResponsive
                            content={this.state.employee}
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
        );
    }
}

// EmployeeList.propTypes = {
//         location : PropTypes.object.isRequired,
//         history: PropTypes.object,
//     };

// IssueRow.propTypes = {
//         row_value: PropTypes.object.isRequired,
//         deleteIssue: PropTypes.func.isRequired,
//     };

// IssueTable.propTypes = {
//         issues_prop: PropTypes.array.isRequired,
//         deleteIssue: PropTypes.func.isRequired,
//     };







    // createIssue(new_issue){
    //     const newIssues = this.state.issues_state.slice();
    //     new_issue.id = this.state.issues_state.length+1;
    //     newIssues.push(new_issue);
    //     this.setState({ issues_state : newIssues});
    // }

    // createIssue(newIssue){
    //     fetch('/api/issues',{
    //         method: 'POST',
    //         headers: { 'Content-Type' : 'application/json'},
    //         body: JSON.stringify(newIssue),
    //         }).then( response => {
    //             if(response.ok){            
    //             response.json().then( updatedIssue => {
    //                 console.log("total count of records :",updatedIssue._metadata);
    //                 updatedIssue.new_issue.created=new Date(updatedIssue.new_issue.created);
    //                 if(updatedIssue.new_issue.completionDate)
    //                     updatedIssue.new_issue.completionDate=new Date(updatedIssue.new_issue.completionDate);
    //                 const newIssues = this.state.issues_state.concat(updatedIssue.new_issue);
    //                 this.setState({issues_state : newIssues});
    //                 });
    //             } else{
    //             response.json().then( error => {
    //                 //  alert("Failed to add issue:" + error.message)
    //                     this.showError(`Failed to add issue: ${error.message}`);
    //                 });
    //             }
    //             }).catch(err =>{
    //             // alert("Error in sending data to server:" + err.message);
    //                     this.showError(`Error in sending data to server: ${err.message}`);
    //         }); 
    // }
