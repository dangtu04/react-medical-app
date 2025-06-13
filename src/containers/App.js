import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { Bounce, toast, ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage';
import CustomScrollbars from '../components/CustomScrollbars';
import DoctorDetail from './HomePage/Doctor/DoctorDetail';
import Doctor from '../routes/Doctor';
import VerifyEmail from './HomePage/VerifyEmail';
import SpecialtyDetail from './HomePage/Specialty/SpecialtyDetail';
import ClinicDetail from './HomePage/Clinic/ClinicDetail';
import Chatbot from './HomePage/Chatbot';
import Register from './Auth/Register';
import Appointment from './HomePage/Session/Appointment';
import Profile from './HomePage/Session/Profile';
import Search from './HomePage/Search';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {/* <ConfirmModal /> */}

                        <div className="content-container">
                            <CustomScrollbars style={{with:'100%', height:'100vh'}}>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.REGISTER} component={userIsNotAuthenticated(Register)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={`${path.DOCTOR_DETAIL}/:id`} component={DoctorDetail} />
                                <Route path={`${path.SPECIALTY_DETAIL}/:id`} component={SpecialtyDetail} />
                                <Route path={`${path.CLINIC_DETAIL}/:id`} component={ClinicDetail} />
                                <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                <Route path={path.APPOIINTMENT} component={Appointment} />
                                <Route path={path.CHATBOT} component={Chatbot} />
                                <Route path={path.PROFILE} component={Profile} />
                                <Route path={path.SEARCH} component={Search} />


                            </Switch>
                            </CustomScrollbars>
                          
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                       <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Bounce}
                            />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);