import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCode } from "../../../services/allcodeService";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import { toast } from "react-toastify";
// import "./UserManagerV2.scss";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        userArr: this.props.listUser,
      });
    }
  }

  handleDeleteUser = async (id) => {
    let res = await this.props.deleteAUser(id);
    console.log(res);
    if (res && res.message && res.message.errCode === 0) {
      toast.info(res.message.message);
      this.props.fetchAllUser();
    } else {
      toast.error(res.message.message);
    }
  };

  handleEditUser = (userData) => {
    this.props.handleEditUser(userData)
  };

  render() {
    let users = this.state.userArr;
    return (
      <div className="user-table mx-3 mb-5">
        <hr />
        <table id="customers">
          <tbody>
            <tr>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>Role</th>
              <th>PositionId</th>
              <th>Actions</th>
            </tr>

            {users &&
              users.length > 0 &&
              users.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.roleId}</td>
                  <td>{item.positionId}</td>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listUser: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUser: () => dispatch(actions.fetchAllUser()),
    deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
