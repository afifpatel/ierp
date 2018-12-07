import React from 'react';
import ReactToPrint from "react-to-print";
// import ReactToExcel from 'react-html-table-to-excel';
import XLSX from 'xlsx';
// import {saveAs} from 'file-saver';
// import download from 'downloadjs'


import { Button,ButtonToolbar, Glyphicon, Table, Panel, Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';

import IssueTable from '../IssueTable.jsx';


function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}

export default class ReportsCard extends React.Component{

    constructor(props){
        super(props)
        this.state={
            employee: []
    }
    this.onClick=this.onClick.bind(this)
}

    componentWillReceiveProps(nextProps){
            if(nextProps.content !== this.props.content){
                // console.log("cwrp", nextProps, this.props)

                this.setState({employee:nextProps.content});
            }
        }
    
    onClick(){
        // console.log("this state", this.state.employee)

        var tbl  = document.getElementById('table-to-xls');

        // console.log("table ", tbl)

        const ws = XLSX.utils.table_to_sheet(tbl, {raw : true});
        
        // console.log("tablw sheet", ws)

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "RenewalWB");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "Renewals.xlsx", { cellStyles:true})        
    }

    render(){

        // console.log("Content" , this.props)
        return(

            <div id="report_card" className={"card" + (this.props.plain ? " card-plain": "")} >
                <Row >
                <Col xs={6} sm={8} lg={8}>
                <div  id="report_header" className={"header"
                    + (this.props.hCenter ? " text-center": "")} >
                    <h4  style={{fontSize: '22px'  }} className="title">{this.props.title}</h4>
                    <p style={{fontSize: '20px' }} className="category">{this.props.category}</p>
                </div>
                </Col>
                <Col xs={6} sm={4} lg={4}  >
               
                {/* <Col mdOffset={8} style={{float : 'right'}}> */}
                <ButtonToolbar style={{float:'right', marginTop: '15px', marginRight : '15px'}}>
                 {/* <ReactToExcel 
                className="btn btn-success btn-sm" 
                table="table-to-xls" 
                filename="Renewals"
                sheet="employees"
                buttonText={<div><i className="fas fa-file-excel fa-lg"></i> Export</div>}
                    /> */}
                <Button onClick={this.onClick} bsSize="small" bsStyle="success"><div><i className="fas fa-file-excel fa-lg"></i> Export</div></Button>
                <ReactToPrint
                trigger={() => <Button style={{padding: '5px 13px'}} bsSize="small" bsStyle="primary"><i className="fas fa-print fa-lg"></i> Print </Button>}
                content={() => document.querySelector('#report_content')}
                />
                </ButtonToolbar>
                </Col>
                </Row>
                <div id='report_content' className={"content"
                    +(this.props.ctAllIcons? " all-icons": "")
                    +(this.props.ctTableFullWidth ? " table-full-width": "")
                    +(this.props.ctTableFullResponsive ? " table-responsive":"")
                    +(this.props.ctTableUpgrade ? " table-upgrade": "")}>

                    {this.state.employee && <IssueTable issues_props={this.state.employee}  /> }
                
                    <div className="footer">
                        {this.props.legend}
                        {this.props.stats != null ? <hr />:""}
                        <div className="stats">
                            <i className={this.props.statsIcon}></i> {this.props.stats}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}