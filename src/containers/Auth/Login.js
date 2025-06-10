import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { userLogin } from "../../services/userService";
import { path } from "../../utils";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errMessage: "",
    };
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      const { email, password } = this.state;
      let data = await userLogin(email, password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.userData);
        // Kiểm tra role
        if (data.userData && data.userData.roleId === "R3") {
          this.props.navigate(path.HOMEPAGE);
        } else if (data.userData && data.userData.roleId === "R2") {
          this.props.navigate('/doctor/manage-patient');
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        this.setState({
          errMessage: error.response.data.message,
        });
      }
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row position-relative">
            <div className="home-icon">
              <i
                className="fa-solid fa-house-medical"
                onClick={() => this.props.navigate("/")}
              ></i>
              {/* <i className="fas fa-home" ></i> */}
            </div>
            <h1 className="col-12 text-center">Đăng nhập</h1>
            <div className="col-12 mt-3 form-group login-input">
              <label>Email</label>
              <input
                className="col-12 input-login"
                type="email"
                placeholder="Nhập email"
                value={this.state.email}
                onChange={this.handleOnchangeEmail}
              />
            </div>
            <div className="col-12 mt-3 form-group login-input">
              <label>Mật khẩu</label>
              <input
                className="col-12 input-login"
                type="password"
                placeholder="Nhập mật khẩu"
                value={this.state.password}
                onChange={this.handleOnchangePassword}
              />
            </div>
            <div className="col-12 text-danger">{this.state.errMessage}</div>

            <div className="col-12">
              <button className="btn-login" onClick={this.handleLogin}>
                Đăng nhập
              </button>
            </div>

            <div className="col-12 mt-2">
              <span onClick={() => this.props.history.push(path.REGISTER)}>
                Đăng ký
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (path) => dispatch(push(path)),
  userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
