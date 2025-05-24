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
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: null,
      description: "",
      listDoctor: [],
      hasOldData: false
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({
        listDoctor: dataSelect,
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
    await this.props.fetchMarkdownByDoctorId(selectedDoctor.value);
    let { doctorMarkdown } = this.props;
    if (doctorMarkdown) {
      this.setState({
        description: doctorMarkdown?.description,
        contentMarkdown: doctorMarkdown?.contentMarkdown,
        contentHTML: doctorMarkdown?.contentHTML,
        hasOldData: true
      });
    } else {
      this.setState({
        description: "",
        contentMarkdown: "",
        contentHTML: "",
        hasOldData: false
      });
    }
  };

  handleOnChangDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleSaveInfo = async () => {
    let {hasOldData} = this.state;
    let res = await this.props.saveDoctorDetail({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? manageActions.EDIT : manageActions.CREATE
    });
    if (res && res.errCode === 0) {
      toast.success(res.message);
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    const { selectedDoctor, hasOldData } = this.state;
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
                onChange={(event) => this.handleOnChangDescription(event)}
                value={this.state.description}
              ></textarea>
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
          className={hasOldData === true ? "save-btn btn-info text-white px-2" : "save-btn btn-primary px-2"}
          onClick={() => this.handleSaveInfo()}
        >
        {hasOldData === true ? "Lưu thay đổi": "Thêm thông tin"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctor: state.user.allDoctor,
    doctorMarkdown: state.user.doctorMarkdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDoctorDetail: (data) => dispatch(actions.saveDoctorDetail(data)),
    fetchMarkdownByDoctorId: (doctorId) =>
      dispatch(actions.fetchMarkdownByDoctorId(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
