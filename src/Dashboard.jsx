import React from 'react' ;
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import Card  from './Card/Card.jsx';
import StatsCard from  './Card/StatsCard.jsx';
import Tasks from './Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from './variables/Variables.jsx';

export default class Dashboard extends React.Component{

    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }

    render() {
        console.log("Dashboarddddddddddddd renderingggggggggggg...............")
        return (
           <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={
                                <div style={{color:'orange'}}>
                                <i className="fas fa-database"></i>
                                </div>
                                }
                                statsText="Files"
                                statsValue="2GB"
                                statsIcon={<i className="fas fa-sync"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={
                                <div style={{color:'SpringGreen'}}>
                                    <i className="fa fa-dollar-sign"></i>
                                </div>
                                }
                                statsText="Revenue"
                                statsValue="$1,345"
                                statsIcon={<i className="fa fa-calendar"></i>}
                                statsIconText="Last day"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={
                                <div style={{color:'red'}}>
                                    <i className="fas fa-exclamation-triangle"></i> 
                                </div>
                                }
                                statsText="Alerts"
                                statsValue="5"
                                statsIcon={<i className="fa fa-clock"></i>}
                                statsIconText="In the last hour"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={
                                <div style={{color:'#00BFFF'}}>
                                    <i className="fab fa-twitter"></i>
                                </div>
                                }
                                statsText="Users"
                                statsValue="+45"
                                statsIcon={<i className="fa fa-sync"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title="Majan Performance Chart"
                                category="Yearly behaviour"
                                stats="Updated 3 minutes ago"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataSales}
                                            type="Line"
                                            options={optionsSales}
                                            responsiveOptions={responsiveSales}
                                        />
                                    </div>
                                    }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendSales)}
                                    </div>
                                }
                            />
                        </Col>
                        <Col md={4}>
                            <Card
                                statsIcon="fa fa-clock"
                                title="Manpower Statistics"
                                category="Last Campaign Report"
                                stats="Campaign sent 2 days ago"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <ChartistGraph data={dataPie} type="Pie"/>
                                    </div>
                                }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendPie)}
                                    </div>
                                }
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="2014 Sales"
                                category="All products including Taxes"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataBar}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendBar)}
                                    </div>
                                }
                            />
                        </Col>

                        <Col md={6}>
                            <Card
                                title="Tasks"
                                category="December"
                                stats="Updated 3 minutes ago"
                                statsIcon="fa fa-history"
                                content={
                                    <div className="table-full-width">
                                        <table className="table">
                                            <Tasks />
                                        </table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

 // <div className="content">
            //     <Grid fluid>
            //         <Row>
            //             <Col lg={3} sm={6}>
            //                 <StatsCard
            //                     bigIcon={<i className="fas fa-database" color="orange"></i>}
            //                     statsText="Database"
            //                     statsValue="2GB"
            //                     statsIcon={<i className="fas fa-sync"></i>}
            //                     statsIconText="Updated now"
            //                 />
            //             </Col>
            //             <Col lg={3} sm={6}>
            //                 <StatsCard
            //                     bigIcon={<i className="fa fa-dollar-sign" color="SpringGreen"></i>}
            //                     statsText="Revenue"
            //                     statsValue="$1,345"
            //                     statsIcon={<i className="fa fa-calendar"></i>}
            //                     statsIconText="Last day"
            //                 />
            //             </Col>
            //             <Col lg={3} sm={6}>
            //                 <StatsCard
            //                     bigIcon={<i className="fas fa-exclamation-triangle" color="red"></i>}
            //                     statsText="Errors"
            //                     statsValue="23"
            //                     statsIcon={<i className="fa fa-clock"></i>}
            //                     statsIconText="In the last hour"
            //                 />
            //             </Col>
            //             <Col lg={3} sm={6}>
            //                 <StatsCard
            //                     bigIcon={<i className="fab fa-twitter" color="#00BFFF"></i>}
            //                     statsText="Followers"
            //                     statsValue="+45"
            //                     statsIcon={<i className="fa fa-sync"></i>}
            //                     statsIconText="Updated now"
            //                 />
            //             </Col>
            //         </Row>
            //         <Row>
            //             <Col md={8}>
            //                 <Card
            //                     statsIcon="fa fa-history"
            //                     id="chartHours"
            //                     title="Users Behavior"
            //                     category="24 Hours performance"
            //                     stats="Updated 3 minutes ago"
            //                     content={
            //                         <div className="ct-chart">
            //                             <ChartistGraph
            //                                 data={dataSales}
            //                                 type="Line"
            //                                 options={optionsSales}
            //                                 responsiveOptions={responsiveSales}
            //                             />
            //                         </div>
            //                         }
            //                     legend={
            //                         <div className="legend">
            //                             {this.createLegend(legendSales)}
            //                         </div>
            //                     }
            //                 />
            //             </Col>
            //             <Col md={4}>
            //                 <Card
            //                     statsIcon="fa fa-clock"
            //                     title="Email Statistics"
            //                     category="Last Campaign Performance"
            //                     stats="Campaign sent 2 days ago"
            //                     content={
            //                         <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
            //                             <ChartistGraph data={dataPie} type="Pie"/>
            //                         </div>
            //                     }
            //                     legend={
            //                         <div className="legend">
            //                             {this.createLegend(legendPie)}
            //                         </div>
            //                     }
            //                 />
            //             </Col>
            //         </Row>

            //         <Row>
            //             <Col md={6}>
            //                 <Card
            //                     id="chartActivity"
            //                     title="2014 Sales"
            //                     category="All products including Taxes"
            //                     stats="Data information certified"
            //                     statsIcon="fa fa-check"
            //                     content={
            //                         <div className="ct-chart">
            //                             <ChartistGraph
            //                                 data={dataBar}
            //                                 type="Bar"
            //                                 options={optionsBar}
            //                                 responsiveOptions={responsiveBar}
            //                             />
            //                         </div>
            //                     }
            //                     legend={
            //                         <div className="legend">
            //                             {this.createLegend(legendBar)}
            //                         </div>
            //                     }
            //                 />
            //             </Col>

            //             <Col md={6}>
            //                 <Card
            //                     title="Tasks"
            //                     category="Backend development"
            //                     stats="Updated 3 minutes ago"
            //                     statsIcon="fa fa-history"
            //                     content={
            //                         <div className="table-full-width">
            //                             <table className="table">
            //                                 <Tasks />
            //                             </table>
            //                         </div>
            //                     }
            //                 />
            //             </Col>
            //         </Row>

            //     </Grid>
            // </div>