import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils/constant";
import moment from "moment";
import localization from "moment/locale/vi";
import { getDoctorSchedule } from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDays: [],
      isOpenModalBooking: false,
      dataSchedule: {},
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

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorId && this.props.doctorId !== -1) {
      const { doctorId } = this.props;
      let date = event.target.value;
      await this.props.fetchDoctorSchedule(doctorId, date);
    }
  };

  async componentDidMount() {
    let { language } = this.props;
    let arrDays = this.getArrDays(language);
    this.setState({ arrDays: arrDays });
  }

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      let arrDays = this.getArrDays(this.props.language);
      this.setState({ arrDays: arrDays });
    }

    if (prevProps.doctorId !== this.props.doctorId) {
      let date = this.state.arrDays[0].value;
      await this.props.fetchDoctorSchedule(this.props.doctorId, date);
    }
  }

  handleOnClickScheduleTime = (item) => {
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
    const { arrDays, isOpenModalBooking, dataSchedule } = this.state;
    const { doctorSchedule } = this.props;
    let { language } = this.props;

    return (
      <>
        <div className="schedule">
          <div className="select-date">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
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

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorSchedule: state.user.doctorSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorSchedule: (doctorId, date) =>
      dispatch(actions.fetchDoctorSchedule(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
