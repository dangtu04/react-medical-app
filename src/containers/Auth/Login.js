import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { userLogin } from "../../services/userService";

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
        // console.log("data: ", data.userData)
        console.log('login successful');
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
          <div className="login-content row">
            <h1 className="col-12 text-center">Login</h1>
            <div className="col-12 mt-3 form-group login-input">
              <label>Email</label>
              <input
                className="col-12 input-login"
                type="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleOnchangeEmail}
              />
            </div>
            <div className="col-12 mt-3 form-group login-input">
              <label>Password</label>
              <input
                className="col-12 input-login"
                type="password"
                placeholder="Enter the password"
                value={this.state.password}
                onChange={this.handleOnchangePassword}
              />
            </div>
            <div className="col-12 text-danger">{this.state.errMessage}</div>

            <div className="col-12">
              <button className="btn-login" onClick={this.handleLogin}>
                Login
              </button>
            </div>

            <div className="col-12 mt-2">
              <span>Forgot your password?</span>
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
