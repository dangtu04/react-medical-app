import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./SpecialtyManage.scss";
import CommonUtils from "../../../utils/CommonUtils";
import {
  createSpecialty,
  getAllSpecialty,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
  getSpecialty,
} from "../../../services/specialtyService";
import { toast } from "react-toastify";
import TableSpecialty from "./TableSpecialty";

const mdParser = new MarkdownIt();

class SpecialtyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      image: null,
      contentMarkdown: "",
      contentHTML: "",
      action: "CREATE",
      specialties: [],
      previewImgRUL: "",
    };
  }

  componentDidMount = async () => {
    await this.fetchSpecialties();
  };

  componentWillUnmount() {
    if (this.state.previewImgRUL) {
      URL.revokeObjectURL(this.state.previewImgRUL);
    }
  }

  fetchSpecialties = async () => {
    let res = await getSpecialty();
    if (res && res.errCode === 0) {
      this.setState({ specialties: res.data || [] });
    }
  };

  handleOnChangeInput = (e) => {
    this.setState({ name: e.target.value });
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

  handleSaveSpecialty = async () => {
    const { id, name, image, contentMarkdown, contentHTML, action } = this.state;
    if (!name || !contentMarkdown) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    let res;
    if (action === "EDIT") {
      res = await updateSpecialty({
        id,
        name,
        image,
        contentMarkdown,
        contentHTML,
      });
    } else {
      res = await createSpecialty({
        name,
        image,
        contentMarkdown,
        contentHTML,
      });
    }

    if (res && res.errCode === 0) {
      toast.success(
        action === "EDIT" ? "Cập nhật thành công!" : "Tạo chuyên khoa thành công!"
      );
      this.setState({
        id: "",
        name: "",
        image: null,
        contentMarkdown: "",
        contentHTML: "",
        action: "CREATE",
        previewImgRUL: "",
      });
      await this.fetchSpecialties();
    } else {
      toast.error(res && res.errMessage ? res.errMessage : "Thao tác thất bại!");
    }
  };

  handleEditSpecialty = async (specialty) => {
    try {
      const res = await getSpecialtyById(specialty.id);
      if (res && res.errCode === 0 && res.data) {
        const detail = res.data;
        let previewImgRUL = "";
        let image = detail.image;
        // Nếu image là object Buffer, convert sang base64
        if (image && typeof image === "object" && image.data) {
          const base64String = btoa(
            new Uint8Array(image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          previewImgRUL = `data:image/jpeg;base64,${base64String}`;
          image = base64String;
        } else if (typeof image === "string") {
          previewImgRUL = `data:image/jpeg;base64,${image}`;
        }
        this.setState({
          id: detail.id,
          name: detail.name,
          image: image,
          contentMarkdown: detail.contentMarkdown,
          contentHTML: detail.contentHTML,
          action: "EDIT",
          previewImgRUL: previewImgRUL,
        });
      } else {
        toast.error("Không lấy được thông tin chuyên khoa!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lấy thông tin chuyên khoa!");
    }
  };

  handleDeleteSpecialty = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá chuyên khoa này?")) {
      let res = await deleteSpecialty(id);
      if (res && res.errCode === 0) {
        toast.success("Xoá thành công!");
        await this.fetchSpecialties();
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
      image: null,
      contentMarkdown: "",
      contentHTML: "",
      action: "CREATE",
      previewImgRUL: "",
    });
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
        <button className="btn btn-primary px-3" onClick={this.handleSaveSpecialty}>
          {this.state.action === "EDIT" ? "Cập nhật chuyên khoa" : "Lưu chuyên khoa"}
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
          <TableSpecialty
            specialties={this.state.specialties}
            onEdit={this.handleEditSpecialty}
            onDelete={this.handleDeleteSpecialty}
          />
        </div>
      </div>
    );
  }
}

export default SpecialtyManage;