import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Specialty from "./Session/Specialty";
import Header from "./Header";
import Clinic from "./Session/Clinic";
import OutStandingDoctors from "./Session/OutStandingDoctors";
import Footer from "./Footer";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Specialty />
        <Clinic />
        <OutStandingDoctors />
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
