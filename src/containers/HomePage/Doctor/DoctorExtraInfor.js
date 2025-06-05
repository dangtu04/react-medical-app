import React, { Component } from "react";
import { connect } from "react-redux";
import { getDoctorInforExtra } from "../../../services/userService"; // Thêm dòng này
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils/constant";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorExtraInfor: {},
    };
  }

  async componentDidMount() {
    await this.fetchDoctorExtraInfor(this.props.doctorId);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.doctorId !== this.props.doctorId) {
      await this.fetchDoctorExtraInfor(this.props.doctorId);
    }
  }

  fetchDoctorExtraInfor = async (doctorId) => {
    if (!doctorId) return;
    try {
      const res = await getDoctorInforExtra(doctorId);
      if (res && res.errCode === 0) {
        this.setState({ doctorExtraInfor: res.data });
      } else {
        this.setState({ doctorExtraInfor: {} });
      }
    } catch (error) {
      this.setState({ doctorExtraInfor: {} });
    }
  };

  formatPrice = (price, language) => {
    if (!price) return "";

    if (language === LANGUAGES.VI) {
      return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    } else {
      return "$" + new Intl.NumberFormat("en-US").format(price);
    }
  };

  render() {
    const { language } = this.props;
    const { doctorExtraInfor } = this.state;

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

        <div className="price">
          <strong>Giá khám:</strong> <p>{formattedPrice}</p>
        </div>

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
});

export default connect(mapStateToProps)(DoctorExtraInfor);