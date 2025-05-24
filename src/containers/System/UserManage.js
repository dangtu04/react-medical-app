import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  createNewUser,
  deleteUser,
  editUser,
  getAllUsers,
} from "../../services/userService";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import { use } from "react";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalAddUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  async componentDidMount() {
    await this.getAllUser();
  }

  getAllUser = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddUser = () => {
    this.setState({
      isOpenModalAddUser: true,
    });
  };
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  createUser = async (data) => {
    try {
      let response = await createNewUser(data);
      if (response && response.message.errCode !== 0) {
        alert(response.message.message);
      } else {
        await this.getAllUser();
        this.toggleUserModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalAddUser: !this.state.isOpenModalAddUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  handleDeleteUser = async (userId) => {
    try {
      let response = await deleteUser(userId);
      console.log(response);
      if (response.message.errCode === 0) {
        await this.getAllUser();
      } else {
        alert(response.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  editUser = async (user) => {
   try {
    let response = await editUser(user)
    if(response && response.message.errCode === 0) {
      await this.getAllUser();
    } else {
      alert(response.errMessage);
    }
    this.toggleEditUserModal()
   } catch (error) {
    console.log(error)
   }
  }

  render() {
    return (
      <div className="user-container">
        <h1 className="title text-center">Manage Users</h1>
        <ModalAddUser
          isOpen={this.state.isOpenModalAddUser}
          toggleUserModal={this.toggleUserModal}
          createUser={this.createUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleUserModal={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.editUser}
          />
        )}
        <div className="user-table mx-3">
          <div className="mb-2">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddUser()}
            >
              + Add new user
            </button>
          </div>

          <table id="customers">
            <tbody>
              <tr>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>RoleId</th>
                <th>Actions</th>
              </tr>
              {this.state.arrUsers &&
                this.state.arrUsers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.roleId}</td>
                    <td>
                      <button
                        className="btn btn-actions no-outline text-info"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fa-solid fa-pen text-info"></i> EDIT
                      </button>
                      <button
                        className="btn no-outline text-danger"
                        onClick={() => this.handleDeleteUser(item.id)}
                      >
                        <i className="fa-solid fa-trash text-danger"></i> DELETE
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
