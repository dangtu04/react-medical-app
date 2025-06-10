import React, { Component } from "react";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils/constant";
import moment from "moment";
import localization from "moment/locale/vi";
import { getDoctorSchedule } from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";
import { connect } from "react-redux";

// ...existing code...
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDays: [],
      isOpenModalBooking: false,
      dataSchedule: {},
      doctorSchedule: [],
    };
  }

  getArrDays = (language) => {
    let arrDays = [];
    for (let i = 1; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDays.push(object);
    }
    return arrDays;
  };

  fetchDoctorSchedule = async (doctorId, date) => {
    try {
      let res = await getDoctorSchedule(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({ doctorSchedule: res.data });
      } else {
        this.setState({ doctorSchedule: [] });
      }
    } catch (error) {
      this.setState({ doctorSchedule: [] });
    }
  };

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorId && this.props.doctorId !== -1) {
      let date = event.target.value;
      await this.fetchDoctorSchedule(this.props.doctorId, date);
    }
  };

  async componentDidMount() {
    let { language, doctorId } = this.props;
    let arrDays = this.getArrDays(language);
    this.setState({ arrDays: arrDays });

    if (doctorId && arrDays.length > 0) {
      await this.fetchDoctorSchedule(doctorId, arrDays[0].value);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let arrDays = this.getArrDays(this.props.language);
      this.setState({ arrDays: arrDays });
    }

    if (prevProps.doctorId !== this.props.doctorId) {
      let { arrDays } = this.state;
      if (this.props.doctorId && arrDays.length > 0) {
        await this.fetchDoctorSchedule(this.props.doctorId, arrDays[0].value);
      }
    }
  }

handleOnClickScheduleTime = (item) => {
  if (!this.props.isLoggedIn) {
    alert("Vui lòng đăng nhập để đặt lịch!");
    return;
  }
  this.setState({
    isOpenModalBooking: true,
    dataSchedule: item,
  });
};

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    const { arrDays, isOpenModalBooking, dataSchedule, doctorSchedule } = this.state;
    const { language } = this.props;

    return (
      <>
        <div className="schedule">
          <div className="select-date">
            <select onChange={this.handleOnChangeSelect}>
              {arrDays &&
                arrDays.length > 0 &&
                arrDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
            <i className="fa-solid fa-angle-down"></i>
          </div>
          <h5>
            <i className="fa-solid fa-calendar-days"></i> Lịch khám
          </h5>
          <div className="schedule-grid">
            {doctorSchedule && doctorSchedule.length > 0 ? (
              <>
                {doctorSchedule.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item?.timeTypeData?.valueVi
                      : item?.timeTypeData?.valueEn;

                  return (
                    <div
                      key={index}
                      className="time-slot"
                      onClick={() => this.handleOnClickScheduleTime(item)}
                    >
                      {timeDisplay}
                    </div>
                  );
                })}
              </>
            ) : (
              <span>Chưa có lịch khám</span>
            )}
          </div>
          <div className="note">
            Chọn{" "}
            <span role="img" aria-label="book">
              📅
            </span>{" "}
            và đặt (Phí đặt lịch 0đ)
          </div>
        </div>

        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataSchedule}
        />
      </>
    );
  }
}

export default connect(
  state => ({
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn, 
  })
)(DoctorSchedule);
// ...end of file...