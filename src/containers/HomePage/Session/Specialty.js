/* Specialty.js */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Specialty.scss";

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

class Specialty extends React.Component {
  render() {
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
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="slide-item">
                <div className="slide-inner">
                  <img
                    className="specialty-img"
                    src="https://cdn.bookingcare.vn/fo/w640/2023/12/26/101739-y-hoc-co-truyen.png"
                    alt={`specialty-${item}`}
                  />
                  <span>Y học cổ truyển</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Specialty);
