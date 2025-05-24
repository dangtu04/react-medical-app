import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import moment from "moment";
import { dateFormat, LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import "./ScheduleManage.scss";
import { toast } from "react-toastify";
import { saveBulkDoctorSchedule } from "../../../services/userService";

class ScheduleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: null,
      listDoctor: [],
      currentDate: "",
      timeList: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchScheduleTime();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allDoctor !== this.props.allDoctor ||
      prevProps.language !== this.props.language
    ) {
      const dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({ listDoctor: dataSelect });
    }

    if (prevProps.times !== this.props.times) {
      let data = this.props.times;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        timeList: data,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    const result = [];
    const { language } = this.props;
    if (inputData && inputData.length) {
      inputData.forEach((item) => {
        const labelVi = `${item.lastName} ${item.firstName}`;
        const labelEn = `${item.firstName} ${item.lastName}`;
        result.push({
          value: item.id,
          label: language === LANGUAGES.VI ? labelVi : labelEn,
        });
      });
    }
    return result;
  };

  handleChangeDoctor = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] });
  };

  handleOnclickBtnTime = (time) => {
    let { timeList } = this.state;
    if (timeList && timeList.length > 0) {
      const updatedTimeList = timeList.map((item) => {
        if (item.id === time.id) {
          return { ...item, isSelected: !item.isSelected };
        }
        return item;
      });

      this.setState({ timeList: updatedTimeList });
    }
  };

  handleSaveSchedule = async () => {
    let { selectedDoctor, currentDate, timeList } = this.state;
    let result = [];
    if (!selectedDoctor) {
      toast.error("Doctor not selected!");
      return;
    }
    if (!currentDate) {
      toast.error("Date not selected!");
      return;
    }
    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formattedDate = new Date(currentDate).getTime();

    if (timeList && timeList.length > 0) {
      let selectedTime = timeList.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Time not selected!");
        return;
      }
    }
    let res = await this.props.saveBulkDoctorScheduleRedux({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate,
    });
    if (res && res.errCode === 0) {
      toast.success(res.message);
    } else {
      toast.error(res.errMessage);
    }
    console.log("check response: ", res);
    // console.log("check result: ", result);
  };

  render() {
    const { listDoctor, selectedDoctor, currentDate, timeList } = this.state;
    const { language } = this.props;
    return (
      <div className="schedule-manage-container">
        <div className="s-m-title">
          <FormattedMessage id="schedule-manage.title" />
        </div>

        <div className="row mt-5">
          <div className="col-6 form-group mb-3">
            <label className="mb-2">
              <FormattedMessage id="schedule-manage.choose-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeDoctor}
              options={listDoctor}
            />
          </div>
          <div className="col-6 form-group mb-3">
            <label className="mb-2">
              <FormattedMessage id="schedule-manage.choose-date" />
            </label>
            <DatePicker
              className="form-control"
              onChange={this.handleOnChangeDatePicker}
              value={currentDate}
              minDate={new Date()}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <div className="schedule-grid">
              {timeList &&
                timeList.length > 0 &&
                timeList.map((time, index) => (
                  <button
                    key={index}
                    className={
                      time.isSelected === true
                        ? "time-slot active"
                        : "time-slot"
                    }
                    onClick={() => this.handleOnclickBtnTime(time)}
                  >
                    {language === LANGUAGES.VI ? time.valueVi : time.valueEn}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary px-3 mt-4"
          onClick={() => this.handleSaveSchedule()}
        >
          <FormattedMessage id="schedule-manage.save" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  systemMenuPath: state.app.systemMenuPath,
  isLoggedIn: state.user.isLoggedIn,
  allDoctor: state.user.allDoctor,
  language: state.app.language,
  times: state.allcode.times,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
  fetchScheduleTime: () => dispatch(actions.fetchScheduleTime()),
  saveBulkDoctorScheduleRedux: (data) =>
    dispatch(actions.saveBulkDoctorScheduleRedux(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
