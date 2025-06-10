import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import logo from "../../assets/images/logo.png";
import VNFlag from "../../assets/images/Vietnam-flag.webp";
import USAFlag from "../../assets/images/us-flag.webp";
import "./Header.scss";
import { LANGUAGES, path } from "../../utils/constant";
import { changeLanguage } from "../../store/actions/appActions";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageApp(language);
  };

  handleViewHomePage = () => {
    this.props.history.push(`${path.HOMEPAGE}`);
  };

  handleLogout = () => {
    this.props.logout(); // Gọi action logout
    this.props.history.push(path.HOMEPAGE); // Chuyển về trang chủ sau khi logout (tùy ý)
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            {/* <i className="fa-solid fa-bars"></i> */}
            <div onClick={() => this.handleViewHomePage()}>
              <img src={logo} className="logo-img" />
            </div>
            {/* <div className="header-logo"></div> */}
          </div>
          <div className="center-content">
            <div className="child-center-content select">
              <FormattedMessage id="header.all" />
            </div>
            {/* <div className="child-center-content ">Chuyên khoa</div> */}
            <div
              className="child-center-content "
              onClick={() => this.props.history.push(path.CHATBOT)}
            >
              Trợ lý AI
            </div>
            <div className="child-center-content ">Cẩm nang</div>

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
                 <b
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => this.props.history.push(path.PROFILE)}
              >
                Hồ sơ
              </b>
            </div>
            <div className="child-right-content">
              <div>
                <b
                onClick={() => this.props.history.push(path.APPOIINTMENT)}
                >
                  <FormattedMessage id="header.appointment" />
                </b>
                {" | "}
                {isLoggedIn ? (
                  <b style={{ cursor: "pointer" }} onClick={this.handleLogout}>
                    Đăng Xuất
                  </b>
                ) : (
                  <b
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.history.push(path.LOGIN)}
                  >
                    Đăng Nhập
                  </b>
                )}
              </div>
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
    logout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
