import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Clinic.scss";
import * as actions from "../../../store/actions";
import { CommonUtils, path } from "../../../utils";
import { withRouter } from "react-router";

// Custom arrow components for next/prev buttons
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

class Clinic extends React.Component {
  componentDidMount() {
    this.props.fetchAllClinic();
  }

  handleViewClinicDetail = (clinic) => {
    this.props.history.push(`${path.CLINIC_DETAIL}/${clinic.id}`);
  };

  render() {
    const { allClinic } = this.props;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <div className="clinic-container">
        <div className="clinic-header">
          <h3 className="clinic-title">
            <FormattedMessage id="clinic.clinic" />
          </h3>
          <Link to="#" className="more">
            <FormattedMessage id="specialty.more" />
          </Link>
        </div>
        <div className="clinic-content">
          <Slider {...settings}>
            {allClinic && allClinic.length > 0 ? (
              allClinic.map((item) => (
                <div key={item.id} className="slide-item">
                  <div
                    className="slide-inner"
                    onClick={() => this.handleViewClinicDetail(item)}
                  >
                    <img
                      className="clinic-img"
                      src={CommonUtils.decodeBase64ImageToBinary(item.image)}
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                   
                  </div>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  allClinic: state.clinic.allClinic,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));