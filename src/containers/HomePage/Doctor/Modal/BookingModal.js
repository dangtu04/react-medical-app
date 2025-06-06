import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "../../../../components/Input/DatePicker";
import _ from "lodash";
import moment from "moment";
import ProfileDoctor from "../ProfileDoctor";
import { postBookingAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      selectedGender: "",
      address: "",
      reason: "",
      timeType: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        selectedGender: this.props.genders[0].keyMap,
      });
    }

    if (prevProps.dataTime !== this.props.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let value = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = value;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({ dateOfBirth: date[0] });
  };

  handleBuildDoctorName = () => {
    let { dataTime, language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = "";
      if (language === LANGUAGES.VI) {
        name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
      } else {
        name = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      }
      return name;
    }
    return "";
  };

  handleConfirmBooking = async () => {
    // let date = new Date(this.state.dateOfBirth).getTime();
      let dob = new Date(this.state.dateOfBirth);
    let formattedDate = dob.toLocaleDateString("vi-VN");
    let timeString = this.formatAppointmentTime(
      this.props.dataTime,
      this.props.language
    );
    let doctorName = this.handleBuildDoctorName();
    let res = await postBookingAppointment({
      doctorId: this.state.doctorId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      date: this.props.dataTime.date,
      dateOfBirth: formattedDate,
      selectedGender: this.state.selectedGender,
      address: this.state.address,
      reason: this.state.reason,
      timeType: this.state.timeType,
      timeString: timeString,
      doctorName: doctorName,
      language: this.props.language,
    });

    if (res && res.errCode === 0) {
      toast.success("Booking appointment succeed!");
      this.props.closeBookingModal();
    } else {
      toast.error("Booking appointment failed!");
    }
  };

  formatDate(timestamp, language) {
    if (!timestamp) return "";
    const date = new Date(+timestamp);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat(
      language === LANGUAGES.VI ? "vi-VN" : "en-US",
      options
    ).format(date);
  }
  formatAppointmentTime = (dataTime, language) => {
    if (!dataTime) return "";

    const timeValue =
      language === LANGUAGES.VI
        ? dataTime?.timeTypeData?.valueVi
        : dataTime?.timeTypeData?.valueEn;

    const formattedDate = this.formatDate(dataTime?.date, language);

    return `${timeValue} - ${formattedDate}`;
  };

  render() {
    let { selectedGender } = this.state;
    let { isOpenModal, closeBookingModal, dataTime, genders, language } =
      this.props;
    console.log("check props: ", this.props)
    return (
      <Modal
        isOpen={isOpenModal}
        size="lg"
        className="bk-md-container"
        centered
      >
        <div className="bk-md-content">
          <div className="bk-md-header">
            <span className="left">Thông tin đặt lịch khám bệnh</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="bk-md-body">
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={dataTime?.doctorId}
                dataTime={dataTime}
              />
            </div>

            <div className="row">
                 <div className="col-6">
                <label>Họ</label>
                <input
                  className="form-control"
                  value={this.state.lastName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "lastName")
                  }
                />
              </div>
              <div className="col-6">
                <label>Tên</label>
                <input
                  className="form-control"
                  value={this.state.firstName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "firstName")
                  }
                />
              </div>
           
              <div className="col-6">
                <label>Địa chỉ Email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
              <div className="col-6">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-6">
                <label>Ngày sinh</label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnChangeDatePicker}
                  value={this.state.dateOfBirth}
                />
              </div>
              <div className="col-6">
                <label>Giới tính</label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "selectedGender")
                  }
                  value={selectedGender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item) => (
                      <option key={item.id} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-12">
                <label>Địa chỉ liên hệ</label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-12">
                <label>Lý do khám</label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "reason")
                  }
                />
              </div>
            </div>
          </div>

          <div className="bk-md-footer">
            <button
              className="btn-booking-confirm"
              onClick={this.handleConfirmBooking}
            >
              Xác nhận
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  genders: state.allcode.genders,
});

const mapDispatchToProps = (dispatch) => ({
  getGenderStart: () => dispatch(actions.fetchGenderStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
