import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Specialty.scss";
import * as actions from "../../../store/actions";
import { CommonUtils, path } from "../../../utils";
import { withRouter } from "react-router";

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
class Specialty extends React.Component {
  componentDidMount() {
    this.props.fetchAllSpecialty();
  }

    handleViewSpecialtyDetail = (specialty) => {
      this.props.history.push(`${path.SPECIALTY_DETAIL}/${specialty.id}`)
    }
  render() {
    const { allSpecialty } = this.props;

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
      <div className="specialty-container">
        <div className="specialty-header">
          <h3 className="specialty-title">
            <FormattedMessage id="specialty.specialty" />
          </h3>
          <Link to="#" className="more">
            <FormattedMessage id="specialty.more" />
          </Link>
        </div>
        <div className="specialty-content">
          <Slider {...settings}>
            {allSpecialty && allSpecialty.length > 0 ? (
              allSpecialty.map((item) => (
                <div key={item.id} className="slide-item">
                  <div className="slide-inner"
                   onClick={()=>this.handleViewSpecialtyDetail(item)}
                  >
                    <img
                      className="specialty-img"
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
  allSpecialty: state.specialty.allSpecialty,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
