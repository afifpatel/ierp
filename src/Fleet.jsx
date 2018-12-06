import React from 'react';
import 'whatwg-fetch'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import  qs from 'query-string';
import { parse } from 'query-string';
import { Button, Glyphicon, Table, Panel, Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';


import Toast from './Toast.jsx';
import Card  from './Card/Card.jsx';

function FleetTable(props){
    const vehiclesRows= props.vehicles_prop.map( i => <VehiclesRow key={i._id} row_value={i} />)
    return(
            
            <Table striped hover>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Type</th>
                        <th>Make</th>
                        <th>Date of Purchase</th>
                        <th>Supplier Name</th>
                        <th>Cost</th>
                        <th>Registration Number</th>
                        <th>Issue Date</th>
                        <th>Expiry Date</th>
                        <th>Insurance Number</th>
                        <th>Issue Date</th>
                        <th>Expiry Date</th>
                        <th>Depreciation</th>
                        {/* <th>Remarks</th> */}

                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>{vehiclesRows}</tbody>
            </Table>
        )
}

const VehiclesRow = (props) => {

    
   
    return(
    <tr>
    {/* <td><Link to={`/issues/${props.row_value._id}`}>{props.row_value._id.substr(-4)} </Link></td> */}
    {/* <Link to={`/employees/editEmployee/${props.row_value.staff_code_type}-${props.row_value.staff_code_number}`}></Link> */}
    <td>{props.row_value.type}</td>
    <td>{props.row_value.make}</td>
    <td>{props.row_value.dop ? formatDate(props.row_value.dop) : ''}</td>
    <td>{props.row_value.supplier}</td> 
    <td>{props.row_value.cost}</td> 
    <td>{props.row_value.registration.number}</td>
    <td>{props.row_value.registration.issue_date ? formatDate(props.row_value.registration.issue_date) : ''}</td>
    <td>{props.row_value.registration.expiry_date ? formatDate(props.row_value.registration.expiry_date) : ''}</td>
    <td>{props.row_value.insurance.number}</td>
    <td>{props.row_value.insurance.issue_date ? formatDate(props.row_value.insurance.issue_date) : ''}</td>
    <td>{props.row_value.insurance.expiry_date ? formatDate(props.row_value.insurance.expiry_date) : ''}</td>
    <td>{props.row_value.depriciation}</td> 
    {/* <td>{props.row_value.completionDate ? props.row_value.completionDate.toDateString() : '' }</td>
    <td>{props.row_value.title}</td> */}
    {/* <td><Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button></td> */}
</tr>
    );
};

function formatDate(date){

    let day = date.getDate() ;
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    return (  day + '.' + month + '.' + year    )
}


export default class Fleet extends React.Component {

    constructor(){
        super();
        this.state = {
                vehicles : [],
                toastVisible: false, toastMessage: '', toastType: 'success', 
        };
    
    }
    
    componentDidMount(){
        this.loadData();
    }
    
    loadData(){
        fetch(`/api/fleet`).then(response =>{
            if(response.ok){
                response.json().then(data => {
                console.log("total count of recordsssss :",data._metadata.total_count);
                data.records.forEach( vehicles => {
                    console.log("Vehicles fetched isss  ===>", vehicles)
                    // employee.dob=employee.dob != null ? new Date(employee.dob) : null;
                    vehicles.dop=vehicles.dop != null ? new Date(vehicles.dop) : null;
                    // employee.dot=employee.dot != null ? new Date(employee.dot) : null;
                    vehicles.registration.issue_date=vehicles.registration.issue_date != null ? new Date(vehicles.registration.issue_date) : null;
                    vehicles.registration.expiry_date=vehicles.registration.expiry_date != null ? new Date(vehicles.registration.expiry_date) : null;
                    vehicles.insurance.issue_date=vehicles.insurance.issue_date != null ? new Date(vehicles.insurance.issue_date) : null;
                    vehicles.insurance.expiry_date=vehicles.insurance.expiry_date != null ? new Date(vehicles.insurance.expiry_date) : null;
    
                // if (issue.completionDate)
                //     issue.completionDate=new Date(issue.completionDate);
        });
            this.setState({ vehicles : data.records});
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

        return(
            <div className="content"> 
        <Grid fluid>

         <Col md={12} style={{ marginLeft : '0px'}}>
                        <Card
                            title="MAJAN MINING COMPANY LLC"
                            category="Fleet Summary"
                            ctTableFullWidth
                            ctTableFullResponsive
                            content={<FleetTable vehicles_prop={this.state.vehicles} />}
                        />
                    </Col>
        </Grid>
            </div>  

            )
    }


}
