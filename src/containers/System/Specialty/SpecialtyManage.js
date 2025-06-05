import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./SpecialtyManage.scss";
import CommonUtils from "../../../utils/CommonUtils";
import { createSpecialty } from "../../../services/specialtyService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

class SpecialtyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: null,
      contentMarkdown: "",
      contentHTML: "",
    };
  }

  handleOnChangeInput = (e) => {
    this.setState({ name: e.target.value });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      // if (this.state.previewImgRUL) {
      //   URL.revokeObjectURL(this.state.previewImgRUL);
      // }
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImgRUL: objectUrl,
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

  handleSaveSpecialty = async () => {
    let res = await createSpecialty({
      name: this.state.name,
      image: this.state.image,
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
    });
    console.log("Check res: ", res);

    if( res && res.errCode === 0) {
      toast.success("Tạo chuyên khoa thành công!");
      this.setState({
        name: "",
        image: null,
        contentMarkdown: "",
        contentHTML: "",
        previewImgRUL: "",
      });
    } else {
      toast.error("Tạo chuyên khoa thất bại!");}

    console.log(this.state);

    console.log("State image: ", this.state.image);
  };

  render() {
    return (
      <div className="specialty-manage-container">
        <h2 className="title text-center mb-4">Quản lý chuyên khoa</h2>
        <div className="row">
          <div className="form-group mb-3 col-md-6">
            <label>Tên chuyên khoa</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.handleOnChangeInput}
              placeholder="Nhập tên chuyên khoa"
            />
          </div>
          <div className="form-group mb-3 col-md-6">
            <label>Ảnh chuyên khoa</label>
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
        <button className="btn btn-primary" onClick={this.handleSaveSpecialty}>
          Lưu chuyên khoa
        </button>
      </div>
    );
  }
}

export default SpecialtyManage;
