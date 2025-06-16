import React, { Component } from "react";
import { LANGUAGES, path } from "../../../utils/constant";
import "./DoctorCard.scss";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
class DoctorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBase64: "",
    };
  }

  componentDidMount() {
    this.convertImageToBase64();
  }

  convertImageToBase64 = () => {
    const { doctor } = this.props;
    if (doctor && doctor.image) {
      let imageBase64 = "";
      if (doctor.image) {
        imageBase64 = new Buffer(doctor.image, "base64").toString("binary");
      }
      this.setState({ imageBase64 });
    }
  };

  handleViewDetail = (doctorId) => {
    this.props.history.push(`${path.DOCTOR_DETAIL}/${doctorId}`);
    console.log("go to detail", doctorId);
  };

  handleBookAppointment = () => {
    // Navigate to booking page
    console.log("Book appointment with doctor:", this.props.doctor.id);
    // You can add booking logic here
  };

  render() {
    const { doctor, language } = this.props;
    const { imageBase64 } = this.state;

    const doctorName = `${doctor.positionData?.valueVi || "Bác sĩ"} ${
      doctor.firstName
    } ${doctor.lastName}`;
    const doctorPosition =
      language === LANGUAGES.VI
        ? doctor.positionData?.valueVi
        : doctor.positionData?.valueEn;

    console.log("props: ", this.props);
    return (
      <div className="doctor-card">
        <div className="doctor-card-header">
          <div className="doctor-avatar">
            {imageBase64 ? (
              <img
                src={imageBase64}
                alt={doctorName}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="avatar-placeholder"
              style={{ display: imageBase64 ? "none" : "flex" }}
            >
              <i className="fas fa-user-md"></i>
            </div>
          </div>
          <div className="doctor-info">
            <h3 className="doctor-name">{doctorName}</h3>
            <p className="doctor-position">{doctorPosition}</p>
          </div>
        </div>

        <div className="doctor-card-actions">
          <button
            className="btn-secondary"
            onClick={() => this.handleViewDetail(doctor.id)}
          >
            <FormattedMessage id="detail" />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(DoctorCard);
