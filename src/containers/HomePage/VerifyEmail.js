import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { LANGUAGES } from "../../utils/constant";
import { postVerifyBookingAppointment } from "../../services/userService";
import Header from "./Header";
import "./VerifyEmail.scss";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerify: false,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");

      let res = await postVerifyBookingAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          isVerify: true,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    const { language } = this.props;

    console.log("check props:", this.props);
    return (
      <>
        <Header />
        <div className="verify-email-container">
          {this.state.isVerify ? (
            <div className="verify-email-content">
              <p>
                {language === LANGUAGES.VI
                  ? "Xác nhận lịch hẹn thành công"
                  : "Appointment confirmation successful"}
              </p>
            </div>
          ) : (
            <div className="verify-email-content">
              <p>
                {language === LANGUAGES.VI
                  ? "Lịch hẹn không tồn tại hoặc đã được xác nhận"
                  : "Appointment does not exist or has been confirmed"}
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
