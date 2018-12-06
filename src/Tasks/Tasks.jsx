import React, { Component } from 'react';
import {Tooltip,OverlayTrigger} from 'react-bootstrap';
import Checkbox from './CustomCheckbox.jsx';
import Button from './CustomButton.jsx';

export class Tasks extends Component{
    handleCheckbox(event){
        const target = event.target;
        console.log(event.target);
        this.setState({
            [target.name]: target.checked
        });
    };

    render(){
        const edit = (<Tooltip id="edit_tooltip">Edit Task</Tooltip>);
        const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);
        const tasks_title = [
            'Deadline : 5 Resident Card Renewal by the end of this month',
            'MIS Report for board meeting',
            'Termination: Employee #245378 terminated on Dec 22, 2017. Report requested and clear salary. ',
            'Sign Contract and collect documents for two Employees that joined in December.',
            'Fleet Management : Fleet #2305 accident reported. Contact ROP for clearance.',
            'Family of Employee #xxxxx requires renewal of visa.'
        ];
        var tasks = [];
        var number;
        for (var i = 0; i < tasks_title.length; i++) {
            number = "checkbox"+i;
            tasks.push(
                <tr key={i}>
                    <td>
                        <Checkbox
                            number={number}
                            isChecked={i === 1 || i === 2 ? true:false}
                        />
                    </td>
                    <td>{tasks_title[i]}</td>
                    <td className="td-actions text-right">
                    {/* <ButtonToolbar> */}
                        <OverlayTrigger placement="top" overlay={edit}>
                            <Button
                                 bsStyle="info"
                                 simple
                                 type="button"
                                 bsSize="xs"
                            >
                                <i className="fas fa-edit fa-sm"></i>
                            </Button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={remove}>
                            <Button
                                bsStyle="danger"
                                simple
                                type="button"
                                bsSize="xs"
                            >
                                <i className="fa fa-times fa-sm"></i>
                            </Button>
                        </OverlayTrigger>
                    {/* </ButtonToolbar> */}
                    </td>
                </tr>
            );
        }
        return (
            <tbody>
                {tasks}
            </tbody>
        );
    }
}

export default Tasks;