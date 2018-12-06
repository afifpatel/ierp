import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { Switch, Redirect, browserHistory} from 'react-router';
import Validator from 'validator';


export function loggedIn(){
    console.log("In loggedIn()")
    return {
        type : "LOGGED_IN",
        payload : window.location.pathname,
    }
}

export function invalidCred(){
    return {
        type: 'ERROR',
        payload : window.location.pathname,

    }
}

export function initialState(){
    return {
        type: 'INITIALISE',
        payload : window.location.pathname,

    }
}

export function loggedOut(){
    return {
        type: 'LOGGED_OUT',
        payload : window.location.pathname,

    }
}

export function validateInput(username,password){
    let errors = {}

    if(username === '') {
        console.log("Username is required")
        errors.username = 'Username is required'
    }

    if(password === '') {
        console.log("Password is required")
        errors.password = 'Password is required'
    }

    console.log("errors set----->", errors)


    return {
        type: 'CHECK_VALID',
        payload : errors,

    }
}

export function clearError(){
    return {
        type: 'CLEAR_ERROR',
        //payload : window.location.pathname,

    }
}

export function clearUsernameError(){
    let errors={};
    errors.username='';
    return {
        type: 'CLEAR_USERNAME_ERROR',
        payload : errors

    }
}

export function clearPasswordError(){
    let errors={};
    errors.password='';
    return {
        type: 'CLEAR_PASSWORD_ERROR',
        payload : errors
        //payload : window.location.pathname,

    }
}

export function userLoggedOut(){
    return {
        type : 'USER_LOGOUT'
    }
}