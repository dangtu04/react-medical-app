import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import logo from "../../assets/images/bookingcare.png";
import VNFlag from "../../assets/images/Vietnam-flag.webp";
import USAFlag from "../../assets/images/us-flag.webp";
import "./Header.scss";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguage } from "../../store/actions/appActions";
class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageApp(language);
  };

  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fa-solid fa-bars"></i>
            <div>
              <img src={logo} className="logo-img" />
            </div>
            {/* <div className="header-logo"></div> */}
          </div>
          <div className="center-content">
            <div className="child-center-content select">
              <FormattedMessage id="header.all" />
            </div>
            <div className="child-center-content ">
              <FormattedMessage id="header.at-the-hospital" />
            </div>
            <div className="child-center-content ">
              <FormattedMessage id="header.live-healthy" />
            </div>

            <div className="child-center-content">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <FormattedMessage id="header.search">
                {(placeholder) => (
                  <input className="input-search" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>
          </div>
          <div className="right-content">
            <div className="child-right-content">
              <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                <img
                  src={VNFlag}
                  className={
                    this.props.language === LANGUAGES.VI
                      ? "flag active"
                      : "flag"
                  }
                />
              </span>
              {" | "}

              <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                <img
                  src={USAFlag}
                  className={
                    this.props.language === LANGUAGES.EN
                      ? "flag active"
                      : "flag"
                  }
                />
              </span>
            </div>
            <div className="child-right-content">
              <b>
                <i className="fa-solid fa-clock-rotate-left appointment-icon"></i>
              </b>
              <b>
                <FormattedMessage id="header.appointment" />
              </b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageApp: (language) => dispatch(changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
