import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";
import "./DoctorManage.scss";
import { LANGUAGES, manageActions } from "../../..//utils/constant";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: null,
      description: "",
      listDoctor: [],

      hasOldData: false,

      // save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: null,
      selectedPayment: null,
      selectedProvince: null,
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.getRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USER");
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor, "USER");

      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      this.setState({
        listDoctor: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChangeSelector = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let { listPrice, listPayment, listProvince } = this.state;
    await this.props.fetchDoctorDetail(selectedDoctor.value);
    let { doctorDetail } = this.props;

    let priceId = "",
      paymentId = "",
      provinceId = "",
      nameClinic = "",
      addressClinic = "",
      note = "",
      selectedPayment = "",
      selectedPrice = "",
      selectedProvince = "";

    if (doctorDetail.doctorInfor) {
      nameClinic = doctorDetail?.doctorInfor?.nameClinic || "";
      addressClinic = doctorDetail?.doctorInfor?.addressClinic || "";
      note = doctorDetail?.doctorInfor?.note || "";
      paymentId = doctorDetail?.doctorInfor?.paymentId || "";
      priceId = doctorDetail?.doctorInfor?.priceId || "";
      provinceId = doctorDetail?.doctorInfor?.provinceId || "";

      selectedPayment = listPayment.find((item) => {
        return item && item.value === paymentId;
      });

      selectedPrice = listPrice.find((item) => {
        return item && item.value === priceId;
      });

      selectedProvince = listProvince.find((item) => {
        return item && item.value === provinceId;
      });
    
      this.setState({
        description: doctorDetail?.Markdown?.description || "",
        contentMarkdown: doctorDetail?.Markdown?.contentMarkdown || "",
        contentHTML: doctorDetail?.Markdown?.contentHTML || "",
        nameClinic,
        addressClinic,
        note,
        selectedPayment,
        selectedPrice,
        selectedProvince,
        hasOldData: true,
      });
    } else {
      this.setState({
        description: "",
        contentMarkdown: "",
        contentHTML: "",
        hasOldData: false,
        nameClinic: "",
        addressClinic: "",
        note: "",
        selectedPayment: null,
        selectedPrice: null,
        selectedProvince: null,
      });
    }
  };

  handleOnChangeText = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USER") {
        inputData.map((item) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      } else if (type === "PRICE") {
        inputData.map((item) => {
          let object = {};
          // let labelVi = `${item.valueVi}`;
          let formattedCurrency = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.valueVi);
          let labelEn = `${item.valueEn} USD`;
          object.label =
            language === LANGUAGES.VI ? formattedCurrency : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      } else {
        inputData.map((item) => {
          let object = {};
          object.label =
            language === LANGUAGES.VI ? item.valueVi : item.valueEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    return result;
  };

  handleSaveInfo = async () => {
    let { hasOldData } = this.state;
    let res = await this.props.saveDoctorDetail({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? manageActions.EDIT : manageActions.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
    if (res && res.errCode === 0) {
      toast.success(res.message);
    } else {
      toast.error(res.errMessage);
    }
  };

  handleOnChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    this.setState({
      [stateName]: selectedOption,
    });
  };

  render() {
    const {
      selectedDoctor,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      hasOldData,
    } = this.state;

    return (
      <div className="manage-doctor-container">
        <h1 className="title text-center">Manage Doctor</h1>

        <div className="manage-doctor-editor">
          <div className="more-info row p-3 bg-light mb-3">
            <div className="left-content col-md-4">
              <label className="form-label">Chọn bác sĩ</label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChangeSelector}
                options={this.state.listDoctor}
                placeholder="Chọn bác sĩ"
              />
            </div>
            <div className="right-content col-md-8">
              <label htmlFor="introduction" className="form-label">
                Giới thiệu
              </label>
              <textarea
                id="introduction"
                name="introduction"
                rows="6"
                className="form-control"
                placeholder="Nhập thông tin giới thiệu tại đây..."
                onChange={(event) =>
                  this.handleOnChangeText(event, "description")
                }
                value={this.state.description}
              ></textarea>
            </div>
          </div>

          <div className="mt-4 px-2">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="priceId" className="form-label">
                  Price
                </label>
                <Select
                  value={selectedPrice}
                  onChange={this.handleOnChangeSelectDoctorInfor}
                  options={this.state.listPrice}
                  placeholder="Chọn giá"
                  name={"selectedPrice"}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="provinceId" className="form-label">
                  Province
                </label>
                <Select
                  value={selectedProvince}
                  onChange={this.handleOnChangeSelectDoctorInfor}
                  options={this.state.listProvince}
                  placeholder="Chọn địa điểm"
                  name={"selectedProvince"}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="paymentId" className="form-label">
                  Payment Method
                </label>
                <Select
                  value={selectedPayment}
                  onChange={this.handleOnChangeSelectDoctorInfor}
                  options={this.state.listPayment}
                  placeholder="Chọn phương thức thanh toán"
                  name={"selectedPayment"}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="addressClinic" className="form-label">
                  Clinic Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addressClinic"
                  name="addressClinic"
                  onChange={(event) =>
                    this.handleOnChangeText(event, "addressClinic")
                  }
                  value={this.state.addressClinic}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="nameClinic" className="form-label">
                  Clinic Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameClinic"
                  name="nameClinic"
                  onChange={(event) =>
                    this.handleOnChangeText(event, "nameClinic")
                  }
                  value={this.state.nameClinic}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="note" className="form-label">
                  Note
                </label>
                <textarea
                  className="form-control"
                  id="note"
                  name="note"
                  rows="3"
                  onChange={(event) => this.handleOnChangeText(event, "note")}
                  value={this.state.note}
                ></textarea>
              </div>
            </div>
          </div>

          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-btn btn-info text-white px-2 mb-5"
              : "save-btn btn-primary px-2 mb-5"
          }
          onClick={() => this.handleSaveInfo()}
        >
          {hasOldData === true ? "Lưu thay đổi" : "Thêm thông tin"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctor: state.user.allDoctor,
    doctorDetail: state.user.doctorDetail,
    allRequiredDoctorInfor: state.allcode.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDoctorDetail: (data) => dispatch(actions.saveDoctorDetail(data)),
    fetchDoctorDetail: (doctorId) =>
      dispatch(actions.fetchDoctorDetail(doctorId)),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
