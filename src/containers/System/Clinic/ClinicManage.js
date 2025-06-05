import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./ClinicManage.scss";
import CommonUtils from "../../../utils/CommonUtils";
import { createClinic } from "../../../services/clinicService";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";

const mdParser = new MarkdownIt();

class ClinicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      image: null,
      contentMarkdown: "",
      contentHTML: "",
    };
  }

  handleOnChangeInput = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        image: base64,
      });
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveClinic = async () => {
    let res = await createClinic({
      name: this.state.name,
      address: this.state.address,
      image: this.state.image,
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
    });

    if (res && res.errCode === 0) {
      toast.success("Tạo phòng khám thành công!");
      this.setState({
        name: "",
        address: "",
        image: null,
        contentMarkdown: "",
        contentHTML: "",
      });
    } else {
      toast.error("Tạo phòng khám thất bại!");
    }
  };

  render() {
    return (
      <div className="clinic-manage-container">
        <h2 className="title text-center mb-4">Quản lý phòng khám</h2>
        <div className="row">
          <div className="form-group mb-3 col-md-4">
            <label>Tên phòng khám</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.handleOnChangeInput(e, "name")}
              placeholder="Nhập tên phòng khám"
            />
          </div>
          <div className="form-group mb-3 col-md-4">
            <label>Địa chỉ phòng khám</label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={(e) => this.handleOnChangeInput(e, "address")}
              placeholder="Nhập địa chỉ phòng khám"
            />
          </div>
          <div className="form-group mb-3 col-md-4">
            <label>Ảnh phòng khám</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={this.handleOnChangeImage}
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label>Mô tả chi tiết</label>
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSaveClinic}>
          Lưu phòng khám
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
