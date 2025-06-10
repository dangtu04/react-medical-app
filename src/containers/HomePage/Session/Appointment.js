import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import { getAppointmentHistory } from "../../../services/userService";
import Header from "../Header";
import "./Appointment.scss";

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentList: [],
    };
  }

  async componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo && userInfo.id) {
      const res = await getAppointmentHistory(userInfo.id);
      if (res && res.errCode === 0) {
        this.setState({ appointmentList: res.data });
      }
    }
  }

  render() {
    const { language } = this.props;
    const { appointmentList } = this.state;
    console.log("Appointment List:", appointmentList);
    return (
      <>
        <Header />
        <div className="appointment-container">
          <h2 className="title">Lịch sử khám bệnh</h2>
          <div className="table-wrapper">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Bác sĩ</th>
                  <th>Ngày khám</th>
                  <th>Thời gian</th>
                  <th>Lý do</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {appointmentList && appointmentList.length > 0 ? (
                  appointmentList.map((item, index) => {
                    const doctorName =
                      language === LANGUAGES.VI
                        ? `${item.doctorData.lastName} ${item.doctorData.firstName.trim()}`
                        : `${item.doctorData.firstName.trim()} ${item.doctorData.lastName}`;

                    const time =
                      language === LANGUAGES.VI
                        ? item.timeTypeDataPatient.valueVi
                        : item.timeTypeDataPatient.valueEn;

                    const status =
                      item.statusDataPatient &&
                      (language === LANGUAGES.VI
                        ? item.statusDataPatient.valueVi
                        : item.statusDataPatient.valueEn);

                    const date = new Date(+item.date).toLocaleDateString();

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{doctorName}</td>
                        <td>{date}</td>
                        <td>{time}</td>
                        <td>{item.reason}</td>
                        <td>{status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      Không có lịch sử khám.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps)(Appointment);
// bug load lại trang Appointment sẽ không hiện được danh sách