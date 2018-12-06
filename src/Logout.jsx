import React from 'react';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Checkbox,
    Panel, Form, Row, Col, Alert, Image, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import classnames from 'classnames';
import validateInput from '../server/issue.js';
import { connect } from 'react-redux';
import login from './login.jsx';
// import { loggedIn } from './action';
// import { loggedOut } from './action';
import {loggedIn, invalidCred} from './action.jsx'
//import loggedIn from './action.jsx'

import store from './store.jsx';
import { loggedOut }  from './action.jsx';

@connect( store => {
    return {
        isLoggedIn : store.isLoggedIn,
    };
})
class Logout extends React.Component {

componentDidMount(){
    console.log("in logout component did mount");
    this.props.dispatch(loggedOut());
}

render(){
    return(
        alert(`Alert from menu item.\neventKey: ${eventKey}`)
    )
}

}

export default Logout;