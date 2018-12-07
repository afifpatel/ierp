import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row, FormGroup, FormControl, ControlLabel, 
         InputGroup, ButtonToolbar, Button} from 'react-bootstrap';

import NumInput from './NumInput.jsx';
import { SelectCodeType, SelectDesignation, SelectDesignationAll, SelectNationality, SelectReporting } from './Select.jsx';


export default class EmployeeFilter extends React.Component{
    constructor(props){
        super(props);
        // this.clearFilter = this.clearFilter.bind(this);
        // this.setFilterOpen = this.setFilterOpen.bind(this);
        // this.setFilterAssigned = this.setFilterAssigned.bind(this);
        
        this.state = {
            staff_code_type: props.initFilter.staff_code_type || '',
            staff_code_number: props.initFilter.staff_code_number || null,
            name : props.initFilter.name || '',
            nationality : props.initFilter.nationality || '',
            department : props.initFilter.department || '',
            designation : props.initFilter.designation || '',

            // effort_gte: props.initFilter.effort_gte || '',
            // effort_lte: props.initFilter.effort_lte || '',
            // name : props.initFilter.name || '',
            changed: false,
        };
        this.onChangeStaffCode = this.onChangeStaffCode.bind(this);
        this.onChangeStaffNumber = this.onChangeStaffNumber.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeNationality = this.onChangeNationality.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeDesignation = this.onChangeDesignation.bind(this);

        // this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
        // this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
        // this.onChangeOwner=this.onChangeOwner.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            staff_code_type: newProps.initFilter.staff_code_type || '',
            staff_code_number: newProps.initFilter.staff_code_number || null,
            name : newProps.initFilter.name || '',
            nationality: newProps.initFilter.nationality || '',
            department : newProps.initFilter.department || '',
            designation : newProps.initFilter.designation || '',

            // effort_gte: newProps.initFilter.effort_gte || '',
            // effort_lte: newProps.initFilter.effort_lte || '',
            // owner : newProps.initFilter.owner || '',
            changed: false,
        });
    }

    resetFilter(){
        // console.log("this.props.initFilter.name and this.state.name ", this.props.initFilter.nationality,this.state.name )
        this.setState({
            staff_code_type: this.props.initFilter.staff_code_type || '',
            staff_code_number: this.props.initFilter.staff_code_number || null,
            nationality: this.props.initFilter.nationality || '',
            department : this.props.initFilter.department || '',
            designation : this.props.initFilter.designation || '',
            name : this.props.initFilter.name || '',
            // effort_gte: this.props.initFilter.effort_gte || '',
            // effort_lte: this.props.initFilter.effort_lte || '',
            // owner : this.props.initFilter.owner || '',
            changed: false,
        });
    }

    // setFilterEffort(e){
    //     e.preventDefault();
    //     this.setFilterEffort ={ }
    // }
    // setFilterOpen(e){
    //     e.preventDefault();
    //     this.props.setFilter({ status : 'Open'});
    // }
    
    // setFilterAssigned(e) {
    //     e.preventDefault();
    //     this.props.setFilter({ status: 'Assigned' });
    // }

    // clearFilter(e) {
    //     e.preventDefault();
    //     this.props.setFilter({});
    // }

    onChangeStaffCode(e){
        this.setState({ staff_code_type: e.target.value, changed: true});
    }
    onChangeStaffNumber(e, convvertedValue){
        console.log("Staff Number ", e.target.value)
        const value = (convvertedValue !== undefined) ? convvertedValue :e.target.value;

        this.setState({ staff_code_number: value, changed: true});
    }
    onChangeNationality(e){
        this.setState({ nationality: e.target.value, changed: true});
    }

    onChangeName(e){
        this.setState({ name: e.target.value, changed: true});
    }

    onChangeDepartment(e){
        this.setState({ department: e.target.value, changed: true});
    }

    onChangeDesignation(e){
        this.setState({ designation: e.target.value, changed: true});
    }
    // onChangeEffortGte(e){
    //     const effortString = e.target.value;
    //     if(effortString.match(/^\d*$/)){
    //         this.setState({ effort_gte: e.target.value, changed: true });
    //     }
    // }

    // onChangeEffortLte(e){
    //     const effortString = e.target.value;
    //     if(effortString.match(/^\d*$/)){
    //         this.setState({ effort_lte: e.target.value, changed: true });
    //     }
    // }

    // onChangeOwner(e){
    //     this.setState({ owner : e.target.value, changed : true})
    // }

    applyFilter(){
        const newFilter = {};
        if(this.state.staff_code_type) newFilter.staff_code_type = this.state.staff_code_type;
        if(this.state.staff_code_number) newFilter.staff_code_number = this.state.staff_code_number;
        if(this.state.name) newFilter.name = this.state.name;
        if(this.state.nationality) newFilter.nationality = this.state.nationality;
        if(this.state.department) newFilter.department = this.state.department;
        if(this.state.designation) newFilter.designation = this.state.designation;


        // if(this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
        // if(this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
        // if(this.state.owner) newFilter.owner = this.state.owner;
        // console.log(newFilter);
        this.props.setFilter(newFilter);
    }
    clearFilter() {
        this.props.setFilter({});
    }
render(){
    
    return(
        <Row>
            <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Staff Type</ControlLabel>
                    <FormControl
                        componentClass="select" value={this.state.staff_code_type} onChange={this.onChangeStaffCode}
                    >
                        <option value="">(Any)</option>
                        <option value="cos">Company Staff</option>
                        <option value="oos">Omani Staff</option>
                        <option value="nos">Contractor</option>
                    </FormControl>
                </FormGroup>
            </Col>
            <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Staff Number</ControlLabel>
                    <FormControl componentClass={NumInput} name="staff_code_number" 
                         value={this.state.staff_code_number} 
                         onChange={this.onChangeStaffNumber} />
                </FormGroup>
            </Col>
            <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl name="name" value={this.state.name} 
                         onChange={this.onChangeName} />
                </FormGroup>
            </Col>
            <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Nationality</ControlLabel>
                    <SelectNationality nationality={this.state.nationality} 
                         onChange={this.onChangeNationality} />
                </FormGroup>
            </Col>
            <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Department</ControlLabel>
                    <FormControl componentClass="select" name="department" value={this.state.department} onChange={this.onChangeDepartment}
                                    >
                                         <option value='' disabled>-- select one --</option>
                                         <option value="Admin">Admin</option>
                                         <option value="Mine">Mine</option>
                                         <option value="Plant">Plant</option>
                                         <option value="Workshop - Mine">Workshop - Mine</option>
                                         <option value="Workshop - Sanaya">Workshop - Sanaya</option>
                                         <option value="Dispatch">Dispatch</option>
                                         <option value="Store and Others">Store and Others</option>
                    </FormControl>
                </FormGroup>
            </Col>
            <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Designation</ControlLabel>
                    <SelectDesignationAll  department={this.state.department}
                                        designation={this.state.designation}
                                        onChange={this.onChangeDesignation}
                                                            />
                </FormGroup>
            </Col>
            <Col sm={6}>
                <FormGroup>
                    <ControlLabel>&nbsp;</ControlLabel>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.applyFilter}>Apply</Button>
                        <Button onClick={this.resetFilter} disabled={!this.state.changed}>Reset</Button>
                        <Button onClick={this.clearFilter}>Clear</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Col>
        </Row>
    );
}

    // render(){          //wo Bootstrap
    //     const Separator = () => <span> | </span>;
    //     return(
    //         <div>
    //            {/* <a href="#" onClick={this.clearFilter}>All Issues</a>
    //            <Separator />
    //            <a href="#" onClick={this.setFilterOpen}>Open Issues</a>
    //            <Separator />
    //            <a href="#" onClick={this.setFilterAssigned}>Assigned Issues</a> */}
    //            Status:
    //            <select value={this.state.status} onChange={this.onChangeStatus}>
    //                 <option value="">(Any)</option>
    //                 <option value="New">New</option>
    //                 <option value="Open">Open</option>
    //                 <option value="Assigned">Assigned</option>
    //                 <option value="Fixed">Fixed</option>
    //                 <option value="Verified">Verified</option>
    //                 <option value="Closed">Closed</option>
    //            </select>
    //            &nbsp;
    //            Owner :
    //            <input size={10} value={this.state.owner} onChange={this.onChangeOwner} />
    //            &nbsp;
    //            Effort between:
    //            <input size={5} value={this.state.effort_gte} onChange={this.onChangeEffortGte} />
    //            &nbsp;-&nbsp;
    //            <input size={5} value={this.state.effort_lte} onChange={this.onChangeEffortLte} />
    //            &nbsp;
    //            <button onClick={this.applyFilter}>Apply</button>
    //            <button onClick={this.resetFilter} disabled={!this.state.changed}>Reset</button>
    //            <button onClick={this.clearFilter}>Clear</button>
    //         </div>
    //     );
    // }
}

EmployeeFilter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    initFilter: PropTypes.object.isRequired,
};