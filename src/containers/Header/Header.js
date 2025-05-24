import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp : []
    };
  }

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = []
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if(role === USER_ROLE.ADMIN) {
        menu = adminMenu
      }
      if(role === USER_ROLE.DOCTOR) {
        menu = doctorMenu
      }
    }
    this.setState({
      menuApp: menu
    })
  }

  changeLanguage = (language) => {
    this.props.changeLanguageApp(language);
  };
  render() {
    const { processLogout, userInfo } = this.props;
    // console.log("userInfo: ", userInfo);
    // console.log(this.state.menuApp)
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="right-header">
          <span>
            {" "}
            <FormattedMessage id="menu.welcome" />{" "}
            {userInfo && userInfo.email ? userInfo.email : ""}
          </span>
          <div className="language-container">
            <span
              className={
                this.props.language === LANGUAGES.VI
                  ? "language active"
                  : "language"
              }
              onClick={() => this.changeLanguage(LANGUAGES.VI)}
            >
              VI
            </span>
            |
            <span
              className={
                this.props.language === LANGUAGES.EN
                  ? "language active"
                  : "language"
              }
              onClick={() => this.changeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fa-solid fa-power-off" title="Logout"></i>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageApp: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
