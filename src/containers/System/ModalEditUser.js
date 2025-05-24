import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "1",
      role: "patient",
      address: "",
    };
  }

  handleOnChangeInput = (event) => {
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
      "phoneNumber",
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

  handleUpdateUser = () => {
    let isValid = this.validateUserData();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        role: user.role,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleUserModal();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        size="lg"
        className={"modal-add-user"}
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <div className="modal-body">
            <div className="input-container">
              <label>First Name</label>
              <input
                className="input"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                className="input"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                className="input"
                type="email"
                name="email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event)}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Phone Number</label>
              <input
                className="input"
                type="text"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={this.state.gender}
                onChange={(event) => this.handleOnChangeInput(event)}
                required
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={this.state.role}
                onChange={(event) => this.handleOnChangeInput(event)}
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="input-container">
              <label>Address</label>
              <input
                className="input"
                type="text"
                name="address"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleUpdateUser()}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
