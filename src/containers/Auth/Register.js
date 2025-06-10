import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { LANGUAGES, path } from "../../utils/constant";
import { toast } from "react-toastify";
import CommonUtils from "../../utils/CommonUtils";
import moment from "moment";
import "./Register.scss";
import Header from "../HomePage/Header";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      dateOfBirth: "",
      address: "",
      gender: "",
      image: "",
      previewImgRUL: null,
      roleId: "R3",
      positionId: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.genders !== this.props.genders &&
      this.props.genders.length > 0
    ) {
      this.setState({ gender: this.props.genders[0].key });
    }
  }

  componentWillUnmount() {
    if (this.state.previewImgRUL) {
      URL.revokeObjectURL(this.state.previewImgRUL);
    }
  }

  onChangInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({
      ...copyState,
    });
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
        previewImgRUL: objectUrl,
        image: base64,
      });
    }
  };

  validateUserData = () => {
    let arrInput = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phoneNumber",
      "dateOfBirth",
      "address",
    ];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error(`Missing parameter ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };

  handleRegister = async (event) => {
    event.preventDefault();
    let isValid = this.validateUserData();
    if (!isValid) return;

    let formattedDate = moment(this.state.dateOfBirth).format("DD/MM/YYYY");
    let res = await this.props.addNewUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      dateOfBirth: formattedDate,
      positionId: "", // luôn rỗng
      address: this.state.address,
      gender: this.state.gender,
      roleId: "R3", // luôn là R3
      image: this.state.image,
    });

    if (res && res.message && res.message.errCode === 0) {
      toast.success(res.message.message);
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        dateOfBirth: "",
        address: "",
        gender: this.props.genders[0]?.key || "",
        image: "",
        previewImgRUL: null,
      });
    } else {
      toast.error(res.message?.errMessage || "Error");
    }
  };

  render() {
    let { genders, language } = this.props;
    let {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      dateOfBirth,
      address,
      gender,
      previewImgRUL,
    } = this.state;

    return (
      <>
        <Header />
        <div className="register-container">
          <form className="register-form" onSubmit={this.handleRegister}>
            <div
              className="go-login"
              onClick={() => this.props.history.push(path.LOGIN)}
            >
              Đăng nhập
            </div>

            <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
            <div className="row gx-3 mb-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  Họ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={this.onChangInput}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={this.onChangInput}
                />
              </div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.onChangInput}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phoneNumber" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.onChangInput}
                />
              </div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.onChangInput}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="dateOfBirth" className="form-label">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={this.onChangInput}
                />
              </div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="gender" className="form-label">
                  Giới tính
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={this.onChangInput}
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
              <div className="col-md-6">
                <label htmlFor="address" className="form-label">
                  Địa chỉ
                </label>
                <input
                  className="form-control"
                  id="address"
                  name="address"
                  value={address}
                  onChange={this.onChangInput}
                />
              </div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="image" className="form-label">
                  Ảnh đại diện
                </label>
                <div className="input-img">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    hidden
                    onChange={this.handleOnChangeImage}
                  />
                  <label className="image-label" htmlFor="image">
                    Tải ảnh lên{" "}
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  </label>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${previewImgRUL})`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary px-4">
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  genders: state.allcode.genders,
});

const mapDispatchToProps = (dispatch) => ({
  getGenderStart: () => dispatch(actions.fetchGenderStart()),
  addNewUser: (data) => dispatch(actions.addNewUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
