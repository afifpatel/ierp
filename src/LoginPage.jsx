import React from 'react';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Checkbox,
    Panel, Form, Row, Col, Alert, Image, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import classnames from 'classnames';
// import validateInput from '../server/issue.js';
import { connect } from 'react-redux';
import login from './login.jsx';
// import { loggedIn } from './action';
// import { loggedOut } from './action';
import {loggedIn, invalidCred, loggedOut, validateInput, clearError, clearUsernameError, clearPasswordError} from './action.jsx'
//import loggedIn from './action.jsx'
import isEmpty from 'lodash/isEmpty';
import Toast from './Toast.jsx';
import Validator from 'validator';




import store from './store.jsx';

@connect( store => {
    return {
        isLoggedIn : store.isLoggedIn,
        errors : store.errors
    };
})
class LoginPage extends React.Component {

    
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            //errors : {},
            isLoading : false,
            showingValidation: false,                                  //Bootstrap validation
        //    toastVisible: false, toastMessage: '', toastType: 'success',
        }

        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.isValid=this.isValid.bind(this);
       // this.showError=this.showError.bind(this);
        this.dismissValidation=this.dismissValidation.bind(this);
    
    }

    componentDidMount(){
        this.props.dispatch(loggedOut());
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value })
        console.log("CHANGINGGGGGGGGG")
        console.log("TARGETTTTTTTT",e.target.value)

        if(e.target.value !== '' && e.target.name === "username"){
            console.log("TARGETTTTTTTT",[e.target.name])
            this.props.dispatch(clearUsernameError())
        }
        if(e.target.value !== '' && e.target.name === "password"){
            console.log("TARGETTTTTTTT",[e.target.name])
            this.props.dispatch(clearPasswordError())
        }
        // console.log(this.state)
    }

    isValid(){
        this.props.dispatch(validateInput(this.state.username,this.state.password));
        const { errors } = this.props
        console.log("ERRORDSSSSSSSSSS: ", errors)
        let isValid = null;
        if(errors.username === '' && errors.password === '' )
            isValid = true;
        else
            isValid = false;
        // if (!isValid){
        //    this.setState({ errors });
        // }
        return isValid;
    }

    onSubmit(e){       
        e.preventDefault();
        var form = document.forms.loginValidate;
        console.log("username and password", form.username.value)

        console.log("isValid() --->", this.isValid())

        if(this.isValid() && form.username.value === 'a' && form.password.value === 'p'){
            //console.log("Vaidation true")
            this.props.dispatch(loggedIn())
            this.setState({ errors: {}, isLoading: true})
        } else {
            this.props.dispatch(invalidCred())
            this.setState({ showingValidation : true})
           // this.showError("Invalid user credentials.")
        }
    }

    // showError(message) {
    //     this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    // }

    dismissValidation() {
        this.setState({ showingValidation : false });
        this.props.dispatch(clearError())
    }

    render() {
        const { isLoggedIn, errors } = this.props;

        let validationMessage = null;
        if (this.state.showingValidation) {
                validationMessage = (
                    <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
                        <strong>Invalid username or password</strong>
                    </Alert>
                    // <div className="LoginError" style={{ color : 'red'}}>
                    //     <h5>Invalid Username/Password</h5>
                    // </div>
                );
        }
        console.log("STATE BEFORE  RETURN ", this.props)

        let emptyUsername = null
        if(errors.username)
            emptyUsername=(<div className="css_empty">Username is required</div>)

        let emptyPassword = null
        if(errors.password)
            emptyPassword=(<div className="css_empty">Password is required</div>)
    

        // console.log("emptyUser value", emptyUsername)

        return (
            <div className="login">
                <Image className="img" src="./1.jpg" />
                {/* <div>
                <Col xs={6} smOffset={6} >  
                <h1>
                 Welcome to Majan Mining  
                </h1>
                </Col>
                </div> */}
                <div className="form-title">
                <Col xs={6} smOffset={3} >
                <p>Sign In</p>
                {/* <Toast
                    showing={this.state.toastVisible} 
                    message={this.state.toastMessage}
                    onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                /> */}
                </Col>
                <FormGroup>
                    <div className="css_alert">
                        <Col xs={6} xsOffset={3}>{validationMessage}</Col>
                    </div>
                </FormGroup>
                
                </div>
                {/* <FormGroup>
                    <Col smOffset={3} sm={9}>{validationMessage}</Col>
                </FormGroup> */}
                    <Col xs={6} smOffset={3} >
                        <Form name="loginValidate" onSubmit={this.onSubmit} bsStyle="css_form">
                            <FormGroup >
                                {/* <Col componentClass={ControlLabel} sm={3}>Username</Col> */}
                                <Col sm={6} smOffset={3}>
                                <FormControl name="username" placeholder="Username" onChange={this.onChange}
                                bsClass="css_input" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                            <Col sm={6} smOffset={3}>{emptyUsername}</Col>
                            </FormGroup>
                            <FormGroup >
                                <Col sm={6} smOffset={3}>
                                <FormControl type="password" name="password"  
                                placeholder="Password" onChange={this.onChange} 
                                bsClass="css_input" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                            <Col sm={6} smOffset={3}>{emptyPassword}</Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={6} smOffset={3} >
                                    <Button type="submit"  disabled={this.state.isLoading} bsClass="css_button">Sign In</Button>
                                </Col>
                             </FormGroup>
                        </Form>
                    </Col>
            </div>
        );
    } 
}

// LoginPage.propTypes = {
//     login : PropTypes.func.isRequired
// }

// LoginPage.contextTypes = {
//     router : PropTypes.object.isRequired
// }
export default LoginPage;


// LoginPage.propTypes = {
//     route_param: PropTypes.boolean,
//     };
// LoginPage.propTypes = {
//      history: PropTypes.object,
// };

/*<div>
            // <Image className="img" src="./1.jpg" />
            // <Col xs={6} smOffset={3} >
            // {/*<Panel id="panel">
            // <Panel.Heading bsStyle="panel_heading">
            //     <Panel.Title>
            //         Login
            //     </Panel.Title>
            // </Panel.Heading>
            // <Panel.Body bsStyle="panel_body"> */
            // {/* <div className="wrap"> */}
            // {/* <Row bsClass="row_title"> */}
            //     {/* <p className="form-title" text-align="center"> <strong>Sign In</strong></p> */}
            // {/* </Row> */}
            // {/* <Row bsClass="row_form"> */}
            //     <Form name="loginValidate" onSubmit={this.handleSubmit} bsStyle="css_form">
            //         <FormGroup>
            //             {/* <Col componentClass={ControlLabel} sm={3}>Username</Col> */}
            //             <Col sm={9} smOffset={3}>
            //             <FormControl name="username" placeholder="Username" bsClass="css_input" />
            //             </Col>
            //         </FormGroup>
            //         <FormGroup>
            //             {/* <Col componentClass={ControlLabel} sm={3}>Password</Col> */}
            //             <Col sm={6} smOffset={3}>
            //             <FormControl name="password" placeholder="Password" bsClass="css_input" />
            //             </Col>
            //         </FormGroup>
            //         <FormGroup>
            //             <Col smOffset={3} sm={6}>
            //                 <Button type="submit" bsClass="css_button">Sign In</Button>
            //             </Col>
            //         </FormGroup>
            //         {/* <Col smOffset={3} sm={3}>
            //         <FormGroup>
            //                 <Checkbox bsClass="css_checkbox">Remember me</Checkbox>
            //         </FormGroup>
            //         </Col>
            //         <Col  sm={3}>
            //         <FormGroup>
            //                 <a href="https://accounts.google.com/signin/recovery?hl=en">Forgot password</a>
            //         </FormGroup>
            //         </Col> */}
            //     </Form>
            // {/* </div>  */}
            //     {/* </Panel.Body >
            //     <Panel.Footer bsStyle="panel_footer">New User? Register</Panel.Footer>
            // </Panel> */}
            // {/* </Row> */}
            // </Col>
            // </div>
// */