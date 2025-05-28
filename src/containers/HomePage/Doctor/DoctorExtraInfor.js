import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils/constant";

class DoctorExtraInfor extends Component {
  componentDidMount() {
    this.props.fetchDoctorInforExtra(this.props.doctorId);
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.doctorId !== this.props.doctorId) {
      this.props.fetchDoctorInforExtra(this.props.doctorId);
    }
  }

  formatPrice = (price, language) => {
    if (!price) return "";

    if (language === LANGUAGES.VI) {
      return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    } else {
      return "$" + new Intl.NumberFormat("en-US").format(price);
    }
  };

  render() {
    const { language, doctorExtraInfor } = this.props;

    const priceValue =
      language === LANGUAGES.VI
        ? doctorExtraInfor?.priceData?.valueVi
        : doctorExtraInfor?.priceData?.valueEn;

    const formattedPrice = this.formatPrice(priceValue, language);

    return (
      <div className="extra-infor">
        <p>
          <strong>Địa chỉ khám:</strong> <br />
          <span className="clinic-name">{doctorExtraInfor?.nameClinic}</span>
          <br />
          {doctorExtraInfor?.addressClinic}
        </p>

        <p>
          <strong>Giá khám:</strong> {formattedPrice}
        </p>

        <p>
          <strong>Phương thức thanh toán:</strong>
          <br />
          {language === LANGUAGES.VI
            ? doctorExtraInfor?.paymentData?.valueVi
            : doctorExtraInfor?.paymentData?.valueEn}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  doctorExtraInfor: state.user.doctorExtraInfor,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctorInforExtra: (doctorId) =>
    dispatch(actions.fetchDoctorInforExtra(doctorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
