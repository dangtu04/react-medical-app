import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import "./PatientManage.scss";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { lang } from "moment";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";

class PatientManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      dataPatients: [],
      isOpenRemedyModal: false,
      dataModal: {},
    };
  }

  handleDateChange = (date) => {
    this.setState({ currentDate: date[0] }, async () => {
      await this.getDataPatients();
    });
  };

  componentDidMount() {
    this.getDataPatients();
  }

  getDataPatients = async () => {
    let { userInfo } = this.props;
    let formattedDate = new Date(this.state.currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: userInfo.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatients: res.data ? res.data : [],
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
  }

  handleComfirmBtn = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName:
        this.props.language === LANGUAGES.VI
          ? item.patientData.lastName + " " + item.patientData.firstName
          : item.patientData.firstName + " " + item.patientData.lastName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
    console.log("data: ", data);
  };
  handleCloseModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    console.log("dataChild: ", dataChild);
    let res = await postSendRemedy({
      email: dataChild.email,
      imageBase64: dataChild.imageBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      toast.success("Gửi hóa đơn thành công!");
      await this.getDataPatients();
      this.handleCloseModal();
    } else {
      toast.error("Gửi hóa đơn thất bại!");
    }
  };
  render() {
    const { currentDate, dataPatients, isOpenRemedyModal, dataModal } =
      this.state;
    const { language } = this.props;
    return (
      <>
        <div className="patient-manage-container">
          <div className="pm-title">Quản lý bệnh nhân khám bệnh</div>
          <div className="row">
            <div className="col-3 pm-date-picker">
              <label>Chọn ngày:</label>
              <DatePicker
                className="form-control"
                onChange={this.handleDateChange}
                value={currentDate}
              />
            </div>
          </div>
          <div className="pm-table-wrapper">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Họ và tên</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Thời gian</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataPatients && dataPatients.length > 0 ? (
                  dataPatients.map((item, index) => {
                    let nameVi =
                      item.patientData?.lastName +
                      " " +
                      item.patientData?.firstName;
                    let nameEn =
                      item.patientData?.firstName +
                      " " +
                      item.patientData?.lastName;

                    let time =
                      language === LANGUAGES.VI
                        ? item.timeTypeDataPatient?.valueVi
                        : item.timeTypeDataPatient?.valueEn;
                    let gender =
                      language === LANGUAGES.VI
                        ? item.patientData?.genderData?.valueVi
                        : item.patientData?.genderData?.valueEn;
                    return (
                      <tr key={index}>
                        <td>{language === LANGUAGES.VI ? nameVi : nameEn}</td>
                        <td>{gender}</td>
                        <td>{item.patientData?.dateOfBirth}</td>
                        <td>{item.patientData?.email}</td>
                        <td>{item.patientData?.phoneNumber}</td>
                        <td>{time}</td>
                        <td>
                          <button
                            className="pm-action-btn"
                            onClick={() => this.handleComfirmBtn(item)}
                          >
                            Xác nhận
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      Không có lịch khám
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          dataModal={dataModal}
          handleCloseModal={this.handleCloseModal}
          sendRemedy={this.sendRemedy}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps)(PatientManage);
