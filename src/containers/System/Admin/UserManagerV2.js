import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCode } from "../../../services/allcodeService";
import * as actions from "../../../store/actions";
import { LANGUAGES, manageActions } from "../../..//utils/constant";
import "./UserManagerV2.scss";
import TableUser from "./TableManageUser";
import { toast } from "react-toastify";
import CommonUtils from "../../../utils/CommonUtils";
import moment from "moment";

class UserManageV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgRUL: null,

      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      dateOfBirth: "",
      positionId: "",
      address: "",
      gender: "",
      roleId: "",
      action: "",
      userIdEdit: "",
      image: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.genders !== this.props.genders &&
      this.props.genders.length > 0
    ) {
      this.setState({ gender: this.props.genders[0].key });
    }

    if (
      prevProps.positions !== this.props.positions &&
      this.props.positions.length > 0
    ) {
      this.setState({ positionId: this.props.positions[0].key });
    }

    if (prevProps.roles !== this.props.roles && this.props.roles.length > 0) {
      this.setState({ roleId: this.props.roles[0].key });
    }

    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        dateOfBirth: "",
        positionId: "",
        address: "",
        gender: "",
        roleId: "",
        previewImgRUL: "",
      });
    }
  }

  componentWillUnmount() {
    if (this.state.previewImgRUL) {
      URL.revokeObjectURL(this.state.previewImgRUL);
    }
  }

  handleOnChangImage = async (event) => {
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

  onChangInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  validateUserData = () => {
    let arrInput = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phoneNumber",
      // "gender",
      // "positionId",
      "dateOfBirth",
      // "roleId",
      "address",
    ];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };

  handleSubmitUserInfo = async (event) => {
    event.preventDefault();

    let { action } = this.state;
    if (action === manageActions.EDIT) {
       let formattedDate = moment(this.state.dateOfBirth).format('DD/MM/YYYY')
      let data = {
        id: this.state.userIdEdit,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        dateOfBirth: formattedDate,
        positionId: this.state.positionId,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.roleId,
        image: this.state.image,
      };
      let res = await this.props.editAUser(data);
      if (res && res.message && res.message.errCode === 0) {
        toast.success(res && res.message && res.message.message);
        this.setState({
          action: manageActions.CREATE,
        });
        this.props.fetchAllUser();
      } else {
        toast.error(
          (res && res.errMessage) ||
            (res && res.message && res.message.errMessage) ||
            "Error"
        );
      }
    } else {
      let isValid = this.validateUserData();
      if (isValid === false) return;

      let formattedDate = moment(this.state.dateOfBirth).format('DD/MM/YYYY')
      let res = await this.props.addNewUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        dateOfBirth: formattedDate,
        positionId: this.state.positionId,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.roleId,
        image: this.state.image,
      });

      if (res && res.message && res.message.errCode === 0) {
        toast.success(res.message.message);
        this.props.fetchAllUser();
      } else {
        toast.error(res.message.errMessage);
        console.log("res: ", res);
      }
    }
  };

  handleEditUser = (user) => {
    let imgBase64 = "";
    if (user.image) {
      imgBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    this.setState({
      userIdEdit: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // password: user.password,
      dateOfBirth: user.dateOfBirth,
      positionId: user.positionId,
      address: user.address,
      gender: user.gender,
      roleId: user.roleId,
      action: manageActions.EDIT,
      previewImgRUL: imgBase64,
    });
  };

  cancelEdit = () => {
    this.setState({
      action: manageActions.READ,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      dateOfBirth: "",
      positionId: "",
      address: "",
      gender: "",
      roleId: "",
      previewImgRUL: "",
    });
  };

  render() {
    let languae = this.props.language;
    let genders = this.props.genders;
    let positions = this.props.positions;
    let roles = this.props.roles;

    let {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      dateOfBirth,
      positionId,
      address,
      gender,
      roleId,
    } = this.state;

    return (
      <div className="user-container">
        <h1 className="title text-center">
          {" "}
          <FormattedMessage id="user-manage.form.user-manage-title" />
        </h1>

        <div className="container">
          <form>
            {/* Row: Name and Email */}
            <div className="row gx-3 mb-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  <FormattedMessage id="user-manage.form.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(event) => this.onChangInput(event)}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  <FormattedMessage id="user-manage.form.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => this.onChangInput(event)}
                />
              </div>
            </div>

            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  <FormattedMessage id="user-manage.form.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => this.onChangInput(event)}
                  disabled={this.state.action === manageActions.EDIT}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phoneNumber" className="form-label">
                  <FormattedMessage id="user-manage.form.phone-number" />
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(event) => this.onChangInput(event)}
                />
              </div>
            </div>

            {/* Row: DateOfBirth, Gender, Position, Role */}
            <div className="row gx-3 mb-3">
              <div className="col-md-3">
                <label htmlFor="dateOfBirth" className="form-label">
                  <FormattedMessage id="user-manage.form.date-of-birth" />
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="form-control"
                  value={dateOfBirth}
                  onChange={(event) => this.onChangInput(event)}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="gender" className="form-label">
                  <FormattedMessage id="user-manage.form.gender" />
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  onChange={(event) => this.onChangInput(event)}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item) => (
                      <option key={item.id} value={item.keyMap}>
                        {languae === LANGUAGES.VI ? item.valueVi : item.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="positionId" className="form-label">
                  <FormattedMessage id="user-manage.form.position-id" />
                </label>
                <select
                  className="form-select"
                  id="positionId"
                  name="positionId"
                  onChange={(event) => this.onChangInput(event)}
                  value={positionId}
                  disabled={this.state.roleId === "R3"}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item) => (
                      <option key={item.id} value={item.keyMap}>
                        {languae === LANGUAGES.VI ? item.valueVi : item.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="roleId" className="form-label">
                  <FormattedMessage id="user-manage.form.role" />
                </label>
                <select
                  className="form-select"
                  id="roleId"
                  name="roleId"
                  onChange={(event) => this.onChangInput(event)}
                  value={roleId}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item) => (
                      <option key={item.id} value={item.keyMap}>
                        {languae === LANGUAGES.VI ? item.valueVi : item.valueEn}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row gx-3 mb-3">
              <div
                className={
                  this.state.action === manageActions.EDIT
                    ? "d-none"
                    : "col-md-2"
                }
              >
                <label htmlFor="password" className="form-label">
                  <FormattedMessage id="user-manage.form.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => this.onChangInput(event)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="address" className="form-label">
                  <FormattedMessage id="user-manage.form.address" />
                </label>
                <input
                  className="form-control"
                  id="address"
                  name="address"
                  rows="2"
                  value={address}
                  onChange={(event) => this.onChangInput(event)}
                />
              </div>
              <div className="col-md-4 image-container">
                <label htmlFor="image" className="form-label">
                  <FormattedMessage id="user-manage.form.image" />
                </label>
                <div className="input-img">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    hidden
                    onChange={(event) => this.handleOnChangImage(event)}
                  />
                  <label className="image-label" htmlFor="image">
                    <FormattedMessage id="user-manage.form.upload" />{" "}
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  </label>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${this.state.previewImgRUL})`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Address */}

            {/* Submit */}
            <div className="text-end">
              <button
                type="submit"
                className={
                  this.state.action === manageActions.EDIT
                    ? "btn btn-info text-white px-3"
                    : "btn btn-primary px-3"
                }
                onClick={(event) => this.handleSubmitUserInfo(event)}
              >
                {this.state.action === manageActions.EDIT ? (
                  <FormattedMessage id="user-manage.form.update" />
                ) : (
                  <FormattedMessage id="user-manage.form.create" />
                )}
              </button>
              {this.state.action === manageActions.EDIT ? (
                <button
                  className="btn btn-white text-info mx-3 px-2 border-primary"
                  onClick={() => this.cancelEdit()}
                >
                  Huỷ
                </button>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
        <div className="px-5 mt-3">
          <TableUser
            handleEditUser={this.handleEditUser}
            action={this.state.action}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.allcode.genders,
    positions: state.allcode.positions,
    roles: state.allcode.roles,
    listUser: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    addNewUser: (data) => dispatch(actions.addNewUser(data)),
    fetchAllUser: () => dispatch(actions.fetchAllUser()),
    editAUser: (editData) => dispatch(actions.editAUser(editData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageV2);
