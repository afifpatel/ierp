import React from 'react'               //import npm installed libs...replacement to html script includes
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { Switch, Redirect, browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Alert, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import EmployeeList from './EmployeeList.jsx';
import EmployeeEdit from './EmployeeEdit.jsx';
import EmployeeAddNavItem from './EmployeeAddNavItem.jsx';
import LoginPage from './LoginPage.jsx';
import { Provider } from 'react-redux';
import thunk  from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { store } from './store.jsx';
import { persistor } from './store.jsx';
import  { loggedIn, initialState, userLoggedOut } from './action.jsx'
import { persistStore, autoRehydrate } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Logout from './Logout.jsx';
import { Confirm } from 'react-confirm-bootstrap';
import App from './App.jsx';
import Dashboard from './Dashboard.jsx';
import Accounts from './Accounts.jsx';
import PayrollEdit from './Reports/PayrollEdit.jsx';
import Fleet from './Fleet.jsx'
import AddVehicle from './AddVehicle.jsx';
import Reports from './Reports/Reports.jsx';
import Renewals from './Reports/Renewals.jsx';
import Leave from './Reports/Leave.jsx';
import Payroll from './Reports/Payroll.jsx';
import NotFound from './NotFound.jsx';



const NoMatch = () => <p>Page Not Found</p>;


// @connect( store => {
//     return {
//         isLoggedIn : store.isLoggedIn,
//     };
// })
class RoutedApp extends React.Component {

componentDidUpdate(prevProps) {

    console.log("In ComponentDidUpdateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log("PrevProps",prevProps.isLoggedIn)
    console.log("this.props",this.props.isLoggedIn)


    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn
    const isIn = prevProps.isLoggedIn && this.props.isLoggedIn 

    if(isLoggingOut)
        this.props.dispatch(userLoggedOut())

    if(isLoggingIn) {
        this.props.dispatch(loggedIn())
    }
}

render(){

    const { isLoggedIn } = this.props;
    // console.log("App render() isLoggedIn value : ", isLoggedIn);
     
    return(
        <Router history={browserHistory}>
            {/* <App isLoggedIn={isLoggedIn}> */}
            <App>
                {/* {isLoggedIn && window.location.pathname != '/login'? ( */}
                <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/employees/editEmployee/:id" component={EmployeeEdit} />
                <Route exact path="/employees/addEmployee" component={withRouter(EmployeeAddNavItem)} />
                <Route exact path="/employees" component={withRouter(EmployeeList)} />
                <Route exact path="/reports" component={withRouter(Reports)} />
                <Route exact path="/reports/renewals" component={withRouter(Renewals)} />
                <Route exact path="/reports/leave" component={withRouter(Leave)} />
                <Route exact path="/reports/payroll" component={withRouter(Payroll)} />
                <Route exact path="/reports/payroll/:id" component={withRouter(PayrollEdit)} />

                <Route exact path="/accounts" component={withRouter(NotFound)} />
                <Route exact path="/fleet" component={withRouter(NotFound)} />
                <Route exact path="/shipment" component={withRouter(NotFound)} />

                {/* <Route exact path="/fleet/addVehicle" component={withRouter(AddVehicle)} /> */}

                {/* <Route exact path="/reports" component={NoMatch} />  */}
                {/* <Route exact path="/login" component={LoginPage} />  */}
                <Redirect from="*" to="/dashboard" />
                </Switch>
                {/* ) :
                (
                <Switch>
                <Route exact path="/login_form"
                render={(routeProps) => ( 
                    <LoginPage onChange={this.onChange} />)}
                    />
                <Redirect from="*" to="/login_form" /> */}
                {/* </Switch> */}
                {/* )} */}
            </App>
        </Router>
    )
    
}
}

export default RoutedApp;
