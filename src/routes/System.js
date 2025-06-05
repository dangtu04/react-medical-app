import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserManagerV2 from "../containers/System/Admin/UserManagerV2";
import Header from "../containers/Header/Header";
import DoctorManage from "../containers/System/Admin/DoctorManage";
import SpecialtyManage from "../containers/System/Specialty/SpecialtyManage";
import ClinicManage from "../containers/System/Clinic/ClinicManage";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage-v1" component={UserManage} />
              <Route path="/system/user-manage-v2" component={UserManagerV2} />
              <Route path="/system/doctor-introduce" component={DoctorManage} />
              <Route path="/system/specialty-manage" component={SpecialtyManage} />
              <Route path="/system/clinic-manage" component={ClinicManage} />
      
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
