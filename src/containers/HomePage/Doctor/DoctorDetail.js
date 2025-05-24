import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import * as actions from "../../../store/actions";
import "./DoctorDetail.scss";
import { LANGUAGES } from "../../../utils/constant";
import defaultAvt from "../../../assets/images/default-avatar.jpg";
class DoctorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const id = this.props.match?.params?.id;
    if (id) {
      this.props.fetchDoctorDetail(id);
    }
  }

  render() {
    const { doctorDetail = {}, language } = this.props;
    const {
      positionData = {},
      firstName = "",
      lastName = "",
      image = "",
      Markdown = {},
    } = doctorDetail;
    const { valueVi = "", valueEn = "" } = positionData;
    const { description = "", contentHTML = "" } = Markdown;

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
              <p>{description || ""}</p>
              <p>
                <span role="img" aria-label="location">
                  <i className="fa-solid fa-location-dot"></i>
                </span>{" "}
                Hà Nội
              </p>
              <button className="share-button">Chia sẻ</button>
            </div>
          </div>

          <div className="doctor-main">
            <div className="schedule">
              <h5>Thứ 4 - 21/5</h5>
              <h5>
                <i className="fa-solid fa-calendar-days"></i> Lịch khám
              </h5>
              <div className="schedule-grid">
                {[
                  "07:30 - 08:00",
                  "08:00 - 08:30",
                  "08:30 - 09:00",
                  "09:00 - 09:30",
                  "09:30 - 10:00",
                  "10:00 - 10:30",
                  "13:30 - 14:00",
                  "14:00 - 14:30",
                  "14:30 - 15:00",
                  "15:00 - 15:30",
                ].map((time, index) => (
                  <div key={index} className="time-slot">
                    {time}
                  </div>
                ))}
              </div>
              <div className="note">
                Chọn{" "}
                <span role="img" aria-label="book">
                  📅
                </span>{" "}
                và đặt (Phí đặt lịch 0đ)
              </div>
            </div>

            <div className="clinic-info">
              <p>
                <strong>Địa chỉ khám:</strong> <br />
                <span className="clinic-name">
                  Bệnh viện Ung bướu Hưng Việt
                </span>
                <br />
                34 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
              </p>
              <p>
                <strong>Giá khám:</strong> 500.000đ <a href="#">Xem chi tiết</a>
              </p>
              <p>
                <strong>Loại bảo hiểm áp dụng:</strong>{" "}
                <a href="#">Xem chi tiết</a>
              </p>
            </div>
          </div>

          <div className="doctor-bio">
            <h4>{language === LANGUAGES.VI ? nameVi : nameEn}</h4>
            {contentHTML ? (
              <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
            ) : (
              ""
            )}
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
