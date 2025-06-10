import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./ClinicManage.scss";
import CommonUtils from "../../../utils/CommonUtils";
import {
  createClinic,
  deleteClinic,
  getClinic,
  getClinicById,
  updateClinic,
} from "../../../services/clinicService";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import TableClinic from "./TableClinic";

const mdParser = new MarkdownIt();

class ClinicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
      image: null,
      contentMarkdown: "",
      contentHTML: "",
      action: "CREATE",
      clinics: [],
      previewImgRUL: "", // Thêm trường này
    };
  }

  componentDidMount = async () => {
    await this.fetchClinics();
  };
  componentWillUnmount() {
    if (this.state.previewImgRUL) {
      URL.revokeObjectURL(this.state.previewImgRUL);
    }
  }

  fetchClinics = async () => {
    let res = await getClinic();
    if (res && res.errCode === 0) {
      this.setState({ clinics: res.data || [] });
    }
  };

  handleOnChangeInput = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      if (this.state.previewImgRUL) {
        URL.revokeObjectURL(this.state.previewImgRUL);
      }
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        image: base64,
        previewImgRUL: objectUrl,
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
    const { id, name, address, image, contentMarkdown, contentHTML, action } =
      this.state;
    if (!name || !address || !contentMarkdown) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    let res;
    if (action === "EDIT") {
      res = await updateClinic({
        id,
        name,
        address,
        image,
        contentMarkdown,
        contentHTML,
      });
    } else {
      res = await createClinic({
        name,
        address,
        image,
        contentMarkdown,
        contentHTML,
      });
    }

    if (res && res.errCode === 0) {
      toast.success(
        action === "EDIT"
          ? "Cập nhật thành công!"
          : "Tạo phòng khám thành công!"
      );
      this.setState({
        id: "",
        name: "",
        address: "",
        image: null,
        contentMarkdown: "",
        contentHTML: "",
        action: "CREATE",
      });
      await this.fetchClinics();
    } else {
      toast.error(
        res && res.errMessage ? res.errMessage : "Thao tác thất bại!"
      );
    }
  };

 handleEditClinic = async (clinic) => {
    try {
      const res = await getClinicById(clinic.id);
      if (res && res.errCode === 0 && res.data) {
        const detail = res.data;
        let previewImgRUL = "";
        if (detail.image) {
          // Nếu image là base64, chuyển sang url để preview
          previewImgRUL = `data:image/jpeg;base64,${detail.image}`;
        }
        this.setState({
          id: detail.id,
          name: detail.name,
          address: detail.address,
          image: detail.image,
          contentMarkdown: detail.contentMarkdown,
          contentHTML: detail.contentHTML,
          action: "EDIT",
          previewImgRUL: previewImgRUL,
        });
      } else {
        toast.error("Không lấy được thông tin phòng khám!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lấy thông tin phòng khám!");
    }
  };

  handleDeleteClinic = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá phòng khám này?")) {
      let res = await deleteClinic(id);
      if (res && res.errCode === 0) {
        toast.success("Xoá thành công!");
        await this.fetchClinics();
      } else {
        toast.error("Xoá thất bại!");
      }
    }
  };

  handleCancelEdit = () => {
    if (this.state.previewImgRUL) {
      URL.revokeObjectURL(this.state.previewImgRUL);
    }
    this.setState({
      id: "",
      name: "",
      address: "",
      image: null,
      contentMarkdown: "",
      contentHTML: "",
      action: "CREATE",
      previewImgRUL: "",
    });
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
            {this.state.previewImgRUL && (
  <img
    src={this.state.previewImgRUL}
    alt="preview"
    style={{
      marginTop: 8,
      width: 120,
      height: 80,
      border: "1px solid #eee",
      borderRadius: 4,
      objectFit: "cover",
      background: "#fafafa",
    }}
  />
)}
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
        <button
          className="btn btn-primary px-3"
          onClick={this.handleSaveClinic}
        >
          {this.state.action === "EDIT"
            ? "Cập nhật phòng khám"
            : "Lưu phòng khám"}
        </button>
        {this.state.action === "EDIT" && (
          <button
            className="btn btn-secondary ms-2"
            onClick={this.handleCancelEdit}
          >
            Huỷ
          </button>
        )}
        <div className="mt-4">
          <TableClinic
            clinics={this.state.clinics}
            onEdit={this.handleEditClinic}
            onDelete={this.handleDeleteClinic}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
