import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./OutStandingDoctors.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES, path } from "../../../utils/constant";

import defaultAvt from "../../../assets/images/default-avatar.jpg";
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

class OutStandingDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }

  componentDidMount() {
    this.props.fetchTopDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.topDoctor !== this.props.topDoctor) {
      this.setState({
        arrDoctor: this.props.topDoctor,
      });
    }
  }

  handleViewDoctorDetail = (doctor) => {
    this.props.history.push(`${path.DOCTOR_DETAIL}/${doctor.id}`)
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    let arrDoctor = this.state.arrDoctor;
    console.log(arrDoctor);
    let { language } = this.props;

    return (
      <div className="featured-dr">
        <div className="featured-dr-container">
          <div className="featured-dr-header">
            <h3 className="featured-dr-title">
              <FormattedMessage id="featured-doctor" />
            </h3>
            <Link to="#" className="more">
              <FormattedMessage id="specialty.more" />
            </Link>
          </div>
          <div className="featured-dr-content">
            <Slider {...settings}>
              {arrDoctor &&
                arrDoctor.length > 0 &&
                arrDoctor.map((item, index) => {

                  let imgBase64 = "";
                  if (item.image) {
                    imgBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }

                  let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                  return (
                    <div key={index} className="slide-item">
                      <div className="slide-inner"
                        onClick={()=>this.handleViewDoctorDetail(item)}
                      >
                        <img
                          className="featured-dr-img"
                          src={imgBase64 || defaultAvt}
                          // alt={`featured-dr-${item}`}
                        />
                        <span>
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </span>
                        <p>Bệnh Viêm gan</p>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  isLoggedIn: state.user.isLoggedIn,
  topDoctor: state.user.topDoctor,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctors));
