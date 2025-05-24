import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import "./Footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <p>&copy; 2025 Đặng Thanh Tú - My Github:<a href="https://github.com/dangtu04"> Click hear</a></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Footer);
