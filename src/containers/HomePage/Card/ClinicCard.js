import React, { Component } from "react";
import "./ClinicCard.scss";
import { withRouter } from "react-router";
import { path } from "../../../utils/constant";
import { FormattedMessage } from "react-intl";
class ClinicCard extends Component {
  handleViewDetail = (clinicId) => {
    this.props.history.push(`${path.CLINIC_DETAIL}/${clinicId}`);
  };

  handleBookAppointment = () => {
    // Navigate to booking page
    console.log("Book appointment at clinic:", this.props.clinic.id);
    // You can add booking logic here
  };

  render() {
    const { clinic } = this.props;
    console.log(this.props);
    return (
      <div className="clinic-card">
        <div className="clinic-card-header">
          <div className="clinic-icon">
            <i className="fas fa-hospital"></i>
          </div>
          <div className="clinic-info">
            <h3 className="clinic-name">{clinic.name}</h3>
            {clinic.address && (
              <p className="clinic-address">
                <i className="fas fa-map-marker-alt"></i>
                {clinic.address}
              </p>
            )}
          </div>
        </div>

        <div className="clinic-card-actions">
          <button
            className="btn-secondary"
            onClick={() => this.handleViewDetail(clinic.id)}
          >
            <FormattedMessage id="detail" />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(ClinicCard);
