import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, 
        ControlLabel, Button, ButtonToolbar, InputGroup, Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';

import NumInput from './NumInput.jsx';


export function SelectCodeType(props){

    switch (props.staff_code_type) {
    case "cos": {
        return (
            <InputGroup>
                    <InputGroup.Addon>COS</InputGroup.Addon>
                <FormControl componentClass={NumInput} name="staff_code_number" 
                    value={props.staff_code_number} 
                    onChange={props.onChange} />
                </InputGroup>
        );
        }
    case "oos": {
        return (
                <InputGroup>
                    <InputGroup.Addon>OOS</InputGroup.Addon>
                    <FormControl componentClass={NumInput} name="staff_code_number" 
                    value={props.staff_code_number} 
                    onChange={props.onChange} />
                </InputGroup>
        );
        }
    case "nos": {
        return (
                <InputGroup>
                    <InputGroup.Addon>NOS</InputGroup.Addon>
                    <FormControl componentClass={NumInput} name="staff_code_number" 
                    value={props.staff_code_number} 
                    onChange={props.onChange} />
                </InputGroup>
        );
    }     
    default: return(
        <FormControl componentClass={NumInput} name="staff_code_number" 
        value={props.staff_code_number} 
        onChange={props.onChange} disabled placeholder="Select Staff Type First"/>
    );
    }
}

export function SelectDesignation(props){

        switch (props.department) {
        case "Admin": {
            return (
                <FormControl
                componentClass="select" name="designation" value={props.designation}
                onChange={props.onChange}
            >
                <option value="default" disabled>Please select designation</option>
                <option value="Managing Director">Managing Director</option>
                <option value="GM Finance and Admin">GM Finance and Admin</option>
                <option value="GM Operation and Logistics">GM Operation and Logistics</option>
                <option value="Chief Operating Officer">Chief Operating Officer</option>
                <option value="Executive Logistic">Executive Logistic</option>
                <option value="Admin Executive">Admin Executive</option>
                <option value="Accountant">Accountant</option>
                {/* <option value="AA">Accountant</option> */}
                <option value="Light Driver">Light Driver</option>
                <option value="Cook/Helper">Cook/Helper</option>
                <option value="Cook">Cook</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Asst. PRO">Asst. PRO</option>
                <option value="Typist">Typist</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Asst. HR">Asst. HR</option>
                </FormControl>
            );
            }
        case "Mine": {
            return (
                <FormControl
                componentClass="select" name="designation" value={props.designation}
                onChange={props.onChange}
            >
                <option value="default" disabled>Please select designation</option>
                <option value="Head - Operations">Head - Operations</option>
                <option value="Asst. Manager">Asst. Manager</option>
                <option value="Foreman">Foreman</option>
                <option value="Asst. Foreman">Asst. Foreman</option>
                <option value="Operator (Excavator)">Operator (Excavator)</option>
                <option value="Operator (Excavator/Asst. Screen Operator)">Operator (Excavator/Asst. Screen Operator)</option>
                <option value="Dump Operator">Dump Operator</option>
                <option value="Operator (Dozer)">Operator (Dozer)</option>
                <option value="Operator (Grader, Loader and Exacavator)">Operator (Grader, Loader and Exacavator)</option>
                <option value="Operator (Drill)">Operator (Drill)</option>
                <option value="Asst. Drill Operator">Asst. Drill Operator</option>
                <option value="Dump Operator">Dump Operator</option>
                <option value="Loader Operator">Loader Operator</option>
                <option value="Asst. Loader Operator">Asst. Loader Operator</option>
                <option value="Helper/ Asst. Loader Operator">Helper/ Asst. Loader Operator</option>
                <option value="Asst. Operator (Terex and Loader)">Asst. Operator (Terex and Loader)</option>
                <option value="Screen Operator/Mechanic">Screen Operator/Mechanic</option>
                <option value="Driver - Water Tanker">Driver - Water Tanker</option>
                <option value="Driver - Water Tanker with DL (HTV)">Driver - Water Tanker with DL (HTV)</option>
                <option value="Light Driver">Light Driver</option>
                <option value="Driver - Pickup/Canter">Driver - Pickup/Canter</option>
                <option value="Diesel Distributor">Diesel Distributor</option>
                <option value="Weigh Bridge Operator">Weigh Bridge Operator</option>
                <option value="Weigh Bridge Operator/Light Driver">Weigh Bridge Operator/Light Driver</option>
                <option value="Helper">Helper</option>
                <option value="Unskilled Helper">Unskilled Helper</option>
                <option value="Helper/Drill">Helper/Drill</option>
                </FormControl>
            );
            }
        case "Store and Others": {
            return (
                <FormControl
                componentClass="select" name="designation" value={props.designation}
                onChange={props.onChange}
            >
                <option value="default" disabled>Please select designation</option>
                <option value="Foreman">Foreman</option>
                <option value="Asst. Clerk">Asst. Clerk</option>
                <option value="Office Admin - Clerk">Office Admin - Clerk</option>
                <option value="Driver Pickup/Bus with DL (HTV)">Driver Pickup/Bus with DL (HTV)</option>
                <option value="Driver Pickup/Bus with DL (LTV)">Driver Pickup/Bus with DL (LTV)</option>
                <option value="Cook">Cook</option>
                <option value="Helper - Cook">Helper - Cook</option>
                <option value="Helper - Plumber">Helper - Plumber</option>
                <option value="Security Guard">Security Guard</option>
                </FormControl>
            );
        }     
        case "Plant": {
            return (
                <FormControl
                componentClass="select" name="designation" value={props.designation}
                onChange={props.onChange}
            >
                <option value="default" disabled>Please select designation</option>
                <option value="Manager - Plant Operations">Manager - Plant Operations</option>
                <option value="Foreman (C&S Plant)">Foreman (C&S Plant)</option>
                <option value="Asst. Foreman">Asst. Foreman</option>
                <option value="Senior Foreman - Electrical">Senior Foreman - Electrical</option>
                <option value="Operator (C&S Plant)">Operator (C&S Plant)</option>
                <option value="Asst. Operator (C&S Plant)">Asst. Operator (C&S Plant)</option>
                <option value="Asst. Mechanic/Asst. Operator">Asst. Mechanic/Asst. Operator</option>
                <option value="Asst. Mechanic">Asst. Mechanic</option>
                <option value="Asst. Power Electrician">Asst. Power Electrician</option>
                <option value="Electrician">Electrician</option>
                <option value="Asst. Electrician">Asst. Electrician</option>
                <option value="Asst. Power Electrician">Asst. Power Electrician</option>
                <option value="Welder">Welder</option>
                <option value="Asst. Welder">Asst. Welder</option>
                <option value="Welder and Fitter(Crusher Opt)">Welder and Fitter(Crusher Opt)</option>
                <option value="Helper">Helper</option>
                <option value="Skilled Helper">Skilled Helper</option>
                <option value="Unskilled Helper">Unskilled Helper</option>
                <option value="Helper/Electrician">Helper/Electrician</option>
                <option value="Helper/Asst. Electrician">Helper/Asst. Electrician</option>
                </FormControl>
            );
        }  
        case "Workshop - Mine": {
            return (
                <FormControl
                componentClass="select" name="designation" value={props.designation}
                onChange={props.onChange}
            >
                <option value="default" disabled>Please select designation</option>
                <option value="Asst. Manager HEMM">Asst. Manager HEMM</option>
                <option value="HEMM Technician">HEMM Technician</option>
                <option value="HEMM Electrician">HEMM Electrician</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Asst. Mechanic">Asst. Mechanic</option>
                <option value="Welder">Welder</option>
                <option value="Operator (Dozer)/Helper">Operator (Dozer)/Helper</option>
                <option value="Helper">Helper</option>
                <option value="Unskilled Helper">Unskilled Helper</option>
                <option value="Helper - Mechanic">Helper - Mechanic</option>
                <option value="Auto Electrician Helper">Auto Electrician Helper</option>
                </FormControl>
            );
        }      
        case "Workshop - Sanaya": {
            return (
                <FormControl
                componentClass="select" name="designation" value={props.designation}
                onChange={props.onChange}
            >
                <option value="default" disabled>Please select designation</option>
                <option value="Head - Logistics">Head - Logistics</option>
                <option value="Maintenance Manager">Maintenance Manager</option>
                <option value="Transport Incharge">Transport Incharge</option>
                <option value="Supervisor(Transport & Dispatch)">Supervisor(Transport & Dispatch)</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Asst. Mechanic">Asst. Mechanic</option>
                <option value="Sr. Mechanic">Sr. Mechanic</option>
                <option value="Auto Electrician">Auto Electrician</option>
                <option value="Office Clerk/Asst.">Office Clerk/Asst.</option>
                <option value="Office Clerk/Ship Loading">Office Clerk/Ship Loading</option>
                <option value="Operator (Loader)">Operator (Loader)</option>
                <option value="Helper">Helper</option>
                <option value="Helper - Port">Helper - Port</option>
                <option value="Helper(Tyreman)">Helper(Tyreman)</option>
                <option value="Unskilled Helper">Unskilled Helper</option>
                <option value="Light Driver">Light Driver</option>
                </FormControl>
            );
        }
        case "Dispatch": {
            return (
                <FormControl
                componentClass="select" name="designation" value={props.designation}
                onChange={props.onChange}
            >
                <option value="default" disabled>Please select designation</option>
                <option value="Driver (Trailer)">Driver (Trailer)</option>
                </FormControl>
            );
        }                    
        default:
        return (
            <FormControl
                componentClass="select" name="designation" value={props.designation}
                onChange={props.onChange}
            >
                <option value="default" disabled>Please select department first.</option>
                </FormControl>
            );
        }
}
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

export function SelectReporting(props){
            return (
                <Select
                className="select_plus"
                name="reporting"
                value={props.reporting}
                onChange={props.onSelect}
                multi={true}
                placeholder="Select reporting staff"
                closeOnSelect={false}
                options={options}
                // asyncOptions={props.getOptions}
            />
            );
}        
export function SelectDesignationAll(props){

    return (
            <FormControl
            componentClass="select" name="designation" value={props.designation}
            onChange={props.onChange}
        >
            <option value='' disabled>--- select one ---</option>
            <option value="Managing Director">Managing Director</option>
            <option value="GM Finance and Admin">GM Finance and Admin</option>
            <option value="GM Operation and Logistics">GM Operation and Logistics</option>
            <option value="Chief Operating Officer">Chief Operating Officer</option>
            <option value="Executive Logistic<">Executive Logistic</option>
            <option value="Admin Executive">Admin Executive</option>
            <option value="Accountant">Accountant</option>
            {/* <option value="AA">Accountant</option> */}
            <option value="Light Driver">Light Driver</option>
            <option value="Cook/Helper">Cook/Helper</option>
            <option value="Cook">Cook</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Asst. PRO">Asst. PRO</option>
            <option value="Typist">Typist</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Asst. HR">Asst. HR</option>
            <option value="Head - Operations">Head - Operations</option>
            <option value="Asst. Manager">Asst. Manager</option>
            <option value="Foreman">Foreman</option>
            <option value="Asst. Foreman">Asst. Foreman</option>
            <option value="Operator (Excavator)">Operator (Excavator)</option>
            <option value="Operator (Excavator/Asst. Screen Operator)">Operator (Excavator/Asst. Screen Operator)</option>
            <option value="Dump Operator">Dump Operator</option>
            <option value="Operator (Dozer)">Operator (Dozer)</option>
            <option value="Operator (Grader, Loader and Exacavator)">Operator (Grader, Loader and Exacavator)</option>
            <option value="Operator (Drill)">Operator (Drill)</option>
            <option value="Asst. Drill Operator">Asst. Drill Operator</option>
            <option value="Dump Operator">Dump Operator</option>
            <option value="Loader Operator">Loader Operator</option>
            <option value="Asst. Loader Operator">Asst. Loader Operator</option>
            <option value="Helper/ Asst. Loader Operator">Helper/ Asst. Loader Operator</option>
            <option value="Asst. Operator (Terex and Loader)">Asst. Operator (Terex and Loader)</option>
            <option value="Screen Operator/Mechanic">Screen Operator/Mechanic</option>
            <option value="Driver - Water Tanker">Driver - Water Tanker</option>
            <option value="Driver - Water Tanker with DL (HTV)">Driver - Water Tanker with DL (HTV)</option>
            <option value="Light Driver">Light Driver</option>
            <option value="Driver - Pickup/Canter">Driver - Pickup/Canter</option>
            <option value="Diesel Distributor">Diesel Distributor</option>
            <option value="Weigh Bridge Operator">Weigh Bridge Operator</option>
            <option value="Weigh Bridge Operator/Light Driver">Weigh Bridge Operator/Light Driver</option>
            <option value="Helper">Helper</option>
            <option value="Unskilled Helper">Unskilled Helper</option>
            <option value="Helper/Drill">Helper/Drill</option>
            <option value="Foreman">Foreman</option>
            <option value="Asst. Clerk">Asst. Clerk</option>
            <option value="Office Admin - Clerk">Office Admin - Clerk</option>
            <option value="Driver Pickup/Bus with DL (HTV)">Driver Pickup/Bus with DL (HTV)</option>
            <option value="Driver Pickup/Bus with DL (LTV)">Driver Pickup/Bus with DL (LTV)</option>
            <option value="Cook">Cook</option>
            <option value="Helper - Cook">Helper - Cook</option>
            <option value="Helper - Plumber">Helper - Plumber</option>
            <option value="Security Guard">Security Guard</option>
            <option value="Manager - Plant Operations">Manager - Plant Operations</option>
            <option value="Foreman (C&S Plant)">Foreman (C&S Plant)</option>
            <option value="Asst. Foreman">Asst. Foreman</option>
            <option value="Senior Foreman - Electrical">Senior Foreman - Electrical</option>
            <option value="Operator (C&S Plant)">Operator (C&S Plant)</option>
            <option value="Asst. Operator (C&S Plant)">Asst. Operator (C&S Plant)</option>
            <option value="Asst. Mechanic/Asst. Operator">Asst. Mechanic/Asst. Operator</option>
            <option value="Asst. Mechanic">Asst. Mechanic</option>
            <option value="Asst. Power Electrician">Asst. Power Electrician</option>
            <option value="Electrician">Electrician</option>
            <option value="Asst. Electrician">Asst. Electrician</option>
            <option value="Asst. Power Electrician">Asst. Power Electrician</option>
            <option value="Welder">Welder</option>
            <option value="Asst. Welder">Asst. Welder</option>
            <option value="Welder and Fitter(Crusher Opt)">Welder and Fitter(Crusher Opt)</option>
            <option value="Helper">Helper</option>
            <option value="Skilled Helper">Skilled Helper</option>
            <option value="Unskilled Helper">Unskilled Helper</option>
            <option value="Helper/Electrician">Helper/Electrician</option>
            <option value="Helper/Asst. Electrician">Helper/Asst. Electrician</option>
            <option value="Asst. Manager HEMM">Asst. Manager HEMM</option>
            <option value="HEMM Technician">HEMM Technician</option>
            <option value="HEMM Electrician">HEMM Electrician</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Asst. Mechanic">Asst. Mechanic</option>
            <option value="Welder">Welder</option>
            <option value="Operator (Dozer)/Helper">Operator (Dozer)/Helper</option>
            <option value="Helper">Helper</option>
            <option value="Unskilled Helper">Unskilled Helper</option>
            <option value="Helper - Mechanic">Helper - Mechanic</option>
            <option value="Auto Electrician Helper">Auto Electrician Helper</option>
            <option value="Head - Logistics">Head - Logistics</option>
            <option value="Maintenance Manager">Maintenance Manager</option>
            <option value="Transport Incharge">Transport Incharge</option>
            <option value="Supervisor(Transport & Dispatch)">Supervisor(Transport & Dispatch)</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Asst. Mechanic">Asst. Mechanic</option>
            <option value="Sr. Mechanic">Sr. Mechanic</option>
            <option value="Auto Electrician">Auto Electrician</option>
            <option value="Office Clerk/Asst.">Office Clerk/Asst.</option>
            <option value="Office Clerk/Ship Loading">Office Clerk/Ship Loading</option>
            <option value="Operator (Loader)">Operator (Loader)</option>
            <option value="Helper">Helper</option>
            <option value="Helper - Port">Helper - Port</option>
            <option value="Helper(Tyreman)">Helper(Tyreman)</option>
            <option value="Unskilled Helper">Unskilled Helper</option>
            <option value="Light Driver">Light Driver</option>
            <option value="Driver (Trailer)">Driver (Trailer)</option>
            </FormControl>
        );
    
}

export function SelectNationality(props){
    return (
        <FormControl
            componentClass="select" name="nationality" value={props.nationality}
            onChange={props.onChange}
        >
            <option value='' disabled>-- select one --</option>
            <option value="afghan">Afghan</option>
            <option value="albanian">Albanian</option>
            <option value="algerian">Algerian</option>
            <option value="american">American</option>
            <option value="andorran">Andorran</option>
            <option value="angolan">Angolan</option>
            <option value="antiguans">Antiguans</option>
            <option value="argentinean">Argentinean</option>
            <option value="armenian">Armenian</option>
            <option value="australian">Australian</option>
            <option value="austrian">Austrian</option>
            <option value="azerbaijani">Azerbaijani</option>
            <option value="bahamian">Bahamian</option>
            <option value="bahraini">Bahraini</option>
            <option value="bangladeshi">Bangladeshi</option>
            <option value="barbadian">Barbadian</option>
            <option value="barbudans">Barbudans</option>
            <option value="batswana">Batswana</option>
            <option value="belarusian">Belarusian</option>
            <option value="belgian">Belgian</option>
            <option value="belizean">Belizean</option>
            <option value="beninese">Beninese</option>
            <option value="bhutanese">Bhutanese</option>
            <option value="bolivian">Bolivian</option>
            <option value="bosnian">Bosnian</option>
            <option value="brazilian">Brazilian</option>
            <option value="british">British</option>
            <option value="bruneian">Bruneian</option>
            <option value="bulgarian">Bulgarian</option>
            <option value="burkinabe">Burkinabe</option>
            <option value="burmese">Burmese</option>
            <option value="burundian">Burundian</option>
            <option value="cambodian">Cambodian</option>
            <option value="cameroonian">Cameroonian</option>
            <option value="canadian">Canadian</option>
            <option value="cape verdean">Cape Verdean</option>
            <option value="central african">Central African</option>
            <option value="chadian">Chadian</option>
            <option value="chilean">Chilean</option>
            <option value="chinese">Chinese</option>
            <option value="colombian">Colombian</option>
            <option value="comoran">Comoran</option>
            <option value="congolese">Congolese</option>
            <option value="costa rican">Costa Rican</option>
            <option value="croatian">Croatian</option>
            <option value="cuban">Cuban</option>
            <option value="cypriot">Cypriot</option>
            <option value="czech">Czech</option>
            <option value="danish">Danish</option>
            <option value="djibouti">Djibouti</option>
            <option value="dominican">Dominican</option>
            <option value="dutch">Dutch</option>
            <option value="east timorese">East Timorese</option>
            <option value="ecuadorean">Ecuadorean</option>
            <option value="egyptian">Egyptian</option>
            <option value="emirian">Emirian</option>
            <option value="equatorial guinean">Equatorial Guinean</option>
            <option value="eritrean">Eritrean</option>
            <option value="estonian">Estonian</option>
            <option value="ethiopian">Ethiopian</option>
            <option value="fijian">Fijian</option>
            <option value="filipino">Filipino</option>
            <option value="finnish">Finnish</option>
            <option value="french">French</option>
            <option value="gabonese">Gabonese</option>
            <option value="gambian">Gambian</option>
            <option value="georgian">Georgian</option>
            <option value="german">German</option>
            <option value="ghanaian">Ghanaian</option>
            <option value="greek">Greek</option>
            <option value="grenadian">Grenadian</option>
            <option value="guatemalan">Guatemalan</option>
            <option value="guinea-bissauan">Guinea-Bissauan</option>
            <option value="guinean">Guinean</option>
            <option value="guyanese">Guyanese</option>
            <option value="haitian">Haitian</option>
            <option value="herzegovinian">Herzegovinian</option>
            <option value="honduran">Honduran</option>
            <option value="hungarian">Hungarian</option>
            <option value="icelander">Icelander</option>
            <option value="indian">Indian</option>
            <option value="indonesian">Indonesian</option>
            <option value="iranian">Iranian</option>
            <option value="iraqi">Iraqi</option>
            <option value="irish">Irish</option>
            <option value="israeli">Israeli</option>
            <option value="italian">Italian</option>
            <option value="ivorian">Ivorian</option>
            <option value="jamaican">Jamaican</option>
            <option value="japanese">Japanese</option>
            <option value="jordanian">Jordanian</option>
            <option value="kazakhstani">Kazakhstani</option>
            <option value="kenyan">Kenyan</option>
            <option value="kittian and nevisian">Kittian and Nevisian</option>
            <option value="kuwaiti">Kuwaiti</option>
            <option value="kyrgyz">Kyrgyz</option>
            <option value="laotian">Laotian</option>
            <option value="latvian">Latvian</option>
            <option value="lebanese">Lebanese</option>
            <option value="liberian">Liberian</option>
            <option value="libyan">Libyan</option>
            <option value="liechtensteiner">Liechtensteiner</option>
            <option value="lithuanian">Lithuanian</option>
            <option value="luxembourger">Luxembourger</option>
            <option value="macedonian">Macedonian</option>
            <option value="malagasy">Malagasy</option>
            <option value="malawian">Malawian</option>
            <option value="malaysian">Malaysian</option>
            <option value="maldivan">Maldivan</option>
            <option value="malian">Malian</option>
            <option value="maltese">Maltese</option>
            <option value="marshallese">Marshallese</option>
            <option value="mauritanian">Mauritanian</option>
            <option value="mauritian">Mauritian</option>
            <option value="mexican">Mexican</option>
            <option value="micronesian">Micronesian</option>
            <option value="moldovan">Moldovan</option>
            <option value="monacan">Monacan</option>
            <option value="mongolian">Mongolian</option>
            <option value="moroccan">Moroccan</option>
            <option value="mosotho">Mosotho</option>
            <option value="motswana">Motswana</option>
            <option value="mozambican">Mozambican</option>
            <option value="namibian">Namibian</option>
            <option value="nauruan">Nauruan</option>
            <option value="nepalese">Nepalese</option>
            <option value="new zealander">New Zealander</option>
            <option value="ni-vanuatu">Ni-Vanuatu</option>
            <option value="nicaraguan">Nicaraguan</option>
            <option value="nigerien">Nigerien</option>
            <option value="north korean">North Korean</option>
            <option value="northern irish">Northern Irish</option>
            <option value="norwegian">Norwegian</option>
            <option value="omani">Omani</option>
            <option value="pakistani">Pakistani</option>
            <option value="palauan">Palauan</option>
            <option value="panamanian">Panamanian</option>
            <option value="papua new guinean">Papua New Guinean</option>
            <option value="paraguayan">Paraguayan</option>
            <option value="peruvian">Peruvian</option>
            <option value="polish">Polish</option>
            <option value="portuguese">Portuguese</option>
            <option value="qatari">Qatari</option>
            <option value="romanian">Romanian</option>
            <option value="russian">Russian</option>
            <option value="rwandan">Rwandan</option>
            <option value="saint lucian">Saint Lucian</option>
            <option value="salvadoran">Salvadoran</option>
            <option value="samoan">Samoan</option>
            <option value="san marinese">San Marinese</option>
            <option value="sao tomean">Sao Tomean</option>
            <option value="saudi">Saudi</option>
            <option value="scottish">Scottish</option>
            <option value="senegalese">Senegalese</option>
            <option value="serbian">Serbian</option>
            <option value="seychellois">Seychellois</option>
            <option value="sierra leonean">Sierra Leonean</option>
            <option value="singaporean">Singaporean</option>
            <option value="slovakian">Slovakian</option>
            <option value="slovenian">Slovenian</option>
            <option value="solomon islander">Solomon Islander</option>
            <option value="somali">Somali</option>
            <option value="south african">South African</option>
            <option value="south korean">South Korean</option>
            <option value="spanish">Spanish</option>
            <option value="sri lankan">Sri Lankan</option>
            <option value="sudanese">Sudanese</option>
            <option value="surinamer">Surinamer</option>
            <option value="swazi">Swazi</option>
            <option value="swedish">Swedish</option>
            <option value="swiss">Swiss</option>
            <option value="syrian">Syrian</option>
            <option value="taiwanese">Taiwanese</option>
            <option value="tajik">Tajik</option>
            <option value="tanzanian">Tanzanian</option>
            <option value="thai">Thai</option>
            <option value="togolese">Togolese</option>
            <option value="tongan">Tongan</option>
            <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
            <option value="tunisian">Tunisian</option>
            <option value="turkish">Turkish</option>
            <option value="tuvaluan">Tuvaluan</option>
            <option value="ugandan">Ugandan</option>
            <option value="ukrainian">Ukrainian</option>
            <option value="uruguayan">Uruguayan</option>
            <option value="uzbekistani">Uzbekistani</option>
            <option value="venezuelan">Venezuelan</option>
            <option value="vietnamese">Vietnamese</option>
            <option value="welsh">Welsh</option>
            <option value="yemenite">Yemenite</option>
            <option value="zambian">Zambian</option>
            <option value="zimbabwean">Zimbabwean</option>            
            </FormControl>
        );
}

// {/* <FormControl
// componentClass="select" multiple 
// name="reporting" 
// value={props.reporting}
// onChange={props.onChange} 
// >
// <option value="default" disabled>Please select reporting staff</option>

// <optgroup label="Admin">
//     <option value="Managing Director">Managing Director</option>
//     <option value="GM Finance and Admin">GM Finance and Admin</option>
//     <option value="GM Operation and Logistics">GM Operation and Logistics</option>
//     <option value="Admin Executive">Admin Executive</option>
//     <option value="Asst. Admin">Asst. Admin</option>
//     <option value="HR Manager">HR Manager</option>
// </optgroup>

// <optgroup label="Mine" >
//     <option value="Head - Operations">Head - Operations</option>
//     <option value="Manager">Manager</option>
//     <option value="Asst. Manager">Asst. Manager</option>
//     <option value="Foreman">Foreman</option>    
// </optgroup>

// <optgroup label="Plant" >
//     <option value="Head - Operations">Head - Operations</option>
//     <option value="Manager">Manager</option>
//     <option value="Asst. Manager HEMM">Asst. Manager HEMM</option>
// </optgroup>

// <optgroup label="Workshop - Mine" >
//     <option value="Manager">Manager</option>
//     {/* <option value="Asst. Manager HEMM">Asst. Manager HEMM</option> */}
// </optgroup>

// <optgroup label="Workshop - Sanaya" >
//     <option value="Head - Logistics">Head - Logistics</option>
//     <option value="Maintenance Manager">Maintenance Manager</option>
// </optgroup>

// <optgroup label="Dispatch" >
//     <option value="Supervisor">Supervisor (Transport & Dispatch)</option>
// </optgroup>

// <optgroup label="Store & Others" >
//     <option value="Supervisor">Foreman</option>
// </optgroup>

// </FormControl> */}