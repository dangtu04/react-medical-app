import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import moment from "moment";
import ProfileDoctor from "../ProfileDoctor";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fullName: "",
      // phoneNumber: "",
      // email: "",
      // address: "",
      // reason: "",
      // birthday: "",
      // selectedGender: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapShot) {}

  toggle = () => {};

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        // isOpen={true}
        // toggle={''}
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
                <label>Họ tên</label>
                <input className="form-control" />
              </div>
              <div className="col-6">
                <label>Số điện thoại</label>
                <input className="form-control" />
              </div>
              <div className="col-6">
                <label>Địa chỉ Email</label>
                <input className="form-control" />
              </div>
              <div className="col-6">
                <label>Địa chỉ liên hệ</label>
                <input className="form-control" />
              </div>
              <div className="col-12">
                <label>Lý do khám</label>
                <input className="form-control" />
              </div>
              <div className="col-6">
                <label>Đặt cho ai</label>
                <input className="form-control" />
              </div>
              <div className="col-6">
                <label>Giới tính</label>
                <input className="form-control" />
              </div>
            </div>
          </div>

          <div className="bk-md-footer">
            <button className="btn-booking-confirm">Xác nhận</button>
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
