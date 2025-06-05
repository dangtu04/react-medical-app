import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import * as actions from "../../../store/actions";
import "./DoctorDetail.scss";
import { LANGUAGES } from "../../../utils/constant";
import defaultAvt from "../../../assets/images/default-avatar.jpg";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

class DoctorDetail extends Component {
  componentDidMount() {
    const id = this.props.match?.params?.id;
    if (id) {
      this.props.fetchDoctorDetail(id);
    }
  }

  render() {
    const { doctorDetail = {}, language } = this.props;

    const positionData = doctorDetail?.positionData || {};
    const firstName = doctorDetail?.firstName || "";
    const lastName = doctorDetail?.lastName || "";
    const image = doctorDetail?.image || "";
    const Markdown = doctorDetail?.Markdown || {};
    const doctorInfor = doctorDetail?.doctorInfor || {};

    const nameVi = `${positionData?.valueVi || ""} ${lastName} ${firstName}`;
    const nameEn = `${positionData?.valueEn || ""} ${firstName} ${lastName}`;

    const description = Markdown?.description || "";
    const contentHTML = Markdown?.contentHTML || "";

    let imgBase64 = "";
    if (image) {
      try {
        imgBase64 = new Buffer(image, "base64").toString("binary");
      } catch (e) {
        console.error("Failed to decode image:", e);
      }
    }

    const provinceName =
      language === LANGUAGES.VI
        ? doctorInfor?.provinceData?.valueVi || ""
        : doctorInfor?.provinceData?.valueEn || "";

    return (
      <>
        <Header />
        <div className="doctor-detail">
          <div className="doctor-info">
            <div className="doctor-photo">
              <img src={imgBase64 || defaultAvt} alt="avatar" />
            </div>
            <div className="doctor-description">
              <div className="favorite-badge">
                <i className="fa-solid fa-heart"></i> Yêu thích
              </div>
              <h2>{language === LANGUAGES.VI ? nameVi : nameEn}</h2>
              <p>{description}</p>
              <p>
                <i className="fa-solid fa-location-dot"></i> {provinceName}
              </p>
            </div>
          </div>

          <div className="doctor-main">
            <DoctorSchedule
              className="schedule"
              doctorId={doctorDetail?.id || -1}
            />
            <DoctorExtraInfor
              className="extra-infor"
              doctorId={doctorDetail?.id || -1}
            />
          </div>

          <div className="doctor-bio">
            <h4>{language === LANGUAGES.VI ? nameVi : nameEn}</h4>
            {contentHTML ? (
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: contentHTML }}
              />
            ) : null}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorDetail: state.user.doctorDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorDetail: (id) => dispatch(actions.fetchDoctorDetail(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
