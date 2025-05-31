import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import "./ProfileDoctor.scss";
import defaultavt from "../../../assets/images/default-avatar.jpg";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let id = this.props.doctorId;
    if (id) {
      this.props.fetchProfileDoctor(id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {}

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

  // Hàm xử lý thông tin thời gian khám
  formatAppointmentTime = (dataTime, language) => {
    if (!dataTime) return "";
    
    const timeValue = language === LANGUAGES.VI 
      ? dataTime?.timeTypeData?.valueVi 
      : dataTime?.timeTypeData?.valueEn;
    
    const formattedDate = this.formatDate(dataTime?.date, language);
    
    return `${timeValue} - ${formattedDate}`;
  };

  render() {
    const { language, profileDoctor, dataTime } = this.props;
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
            <div className="title">ĐẶT LỊCH KHÁM</div>
            <div className="doctor-name">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="time">
              <i className="fa-solid fa-calendar-days"></i>
              <span>{this.formatAppointmentTime(dataTime, language)}</span>
            </div>
            <div className="clinic">
              <i className="fa-solid fa-house-medical text-dark"></i>
              {doctorInfor?.nameClinic}
            </div>
            <div className="address">
              <i className="fa-solid fa-location-dot"></i>{" "}
              {doctorInfor?.addressClinic}
            </div>
          </div>
        </div>
        <div className="price-info">Giá khám {formattedPrice}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  profileDoctor: state.user.profileDoctor,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfileDoctor: (doctorId) =>
    dispatch(actions.fetchProfileDoctor(doctorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);