import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileDoctor } from "../../../services/userService";
import { LANGUAGES, path } from "../../../utils/constant";
import "./ProfileDoctor.scss";
import defaultavt from "../../../assets/images/default-avatar.jpg";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDoctor: {},
    };
  }

  async componentDidMount() {
    const { doctorId } = this.props;
    if (doctorId) {
      await this.fetchProfileDoctor(doctorId);
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.doctorId !== this.props.doctorId) {
      await this.fetchProfileDoctor(this.props.doctorId);
    }
  }

  fetchProfileDoctor = async (doctorId) => {
    if (!doctorId) return;
    try {
      const res = await getProfileDoctor(doctorId);
      if (res && res.errCode === 0) {
        this.setState({ profileDoctor: res.data });
      } else {
        this.setState({ profileDoctor: {} });
      }
    } catch (error) {
      this.setState({ profileDoctor: {} });
    }
  };

  formatDate(timestamp, language) {
    if (!timestamp) return "";
    const date = new Date(+timestamp);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat(
      language === LANGUAGES.VI ? "vi-VN" : "en-US",
      options
    ).format(date);
  }

  formatPrice = (price, language) => {
    if (!price) return "";
    if (language === LANGUAGES.VI) {
      return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    } else {
      return "$" + new Intl.NumberFormat("en-US").format(price);
    }
  };

  formatAppointmentTime = (dataTime, language) => {
    if (!dataTime) return "";
    const timeValue =
      language === LANGUAGES.VI
        ? dataTime?.timeTypeData?.valueVi
        : dataTime?.timeTypeData?.valueEn;
    const formattedDate = this.formatDate(dataTime?.date, language);
    return `${timeValue} - ${formattedDate}`;
  };

  handleViewDoctorDetail = (doctorId) => {
    this.props.history.push(`${path.DOCTOR_DETAIL}/${doctorId}`);
  };

  render() {
    const { language, dataTime, isShowLinkDetail } = this.props;
    const { profileDoctor } = this.state;

    const {
      positionData = {},
      firstName = "",
      lastName = "",
      image = "",
      doctorInfor = {},
    } = profileDoctor || {};

    const { valueVi = "", valueEn = "" } = positionData;
    const nameVi = `${valueVi} ${lastName} ${firstName}`;
    const nameEn = `${valueEn} ${firstName} ${lastName}`;

    let imgBase64 = "";
    if (image) {
      try {
        imgBase64 = new Buffer(image, "base64").toString("binary");
      } catch (e) {
        console.error("Failed to decode image:", e);
      }
    }

    const priceValue =
      language === LANGUAGES.VI
        ? doctorInfor?.priceData?.valueVi
        : doctorInfor?.priceData?.valueEn;

    const formattedPrice = this.formatPrice(priceValue, language);

    return (
      <>
        <div className="appointment-card">
          <img
            src={imgBase64 || defaultavt}
            alt="Doctor"
            className="doctor-image"
          />
          <div className="appointment-info">
            <div className="doctor-name">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            {this.formatAppointmentTime(dataTime, language) && (
              <div className="time">
                <i className="fa-solid fa-calendar-days"></i>
                {this.formatAppointmentTime(dataTime, language)}
              </div>
            )}
            {/* <div className="time">
              <i className="fa-solid fa-calendar-days"></i>
              <span>{this.formatAppointmentTime(dataTime, language)}</span>
            </div> */}
            <div className="clinic">
              <i className="fa-solid fa-house-medical text-dark"></i>
              {doctorInfor?.nameClinic}
            </div>
            <div className="address">
              <i className="fa-solid fa-location-dot"></i>{" "}
              {doctorInfor?.addressClinic}
            </div>
          </div>
          {isShowLinkDetail ? (
            <div className="doctor-detail-link">
              <p onClick={() => this.handleViewDoctorDetail(profileDoctor.id)}>
                <FormattedMessage id="detail" />
              </p>
            </div>
          ) : (
            <div className="price-info">
              {" "}
              <FormattedMessage id="price" /> {formattedPrice}
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

export default withRouter(connect(mapStateToProps)(ProfileDoctor));
