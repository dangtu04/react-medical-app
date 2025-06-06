import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: null,
    };
  }
  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email || "",

      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email || "",
      });
    }
  }


  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

   handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      if (this.state.previewImgRUL) {
        URL.revokeObjectURL(this.state.previewImgRUL);
      }

      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    console.log("handleSendRemedy called with state:", this.state); // Thêm dòng này
    this.props.sendRemedy(this.state)
  };

  render() {
    const { isOpenModal, handleCloseModal, dataModal, sendRemedy } = this.props;
    const { email } = this.state;

    if (!isOpenModal) return null;

    return (
      <div className="remedy-modal-overlay">
        <div className="remedy-modal">
          <div className="remedy-modal-header">
            <h3>Send Remedy</h3>
            <span className="close-btn" onClick={handleCloseModal}>
              &times;
            </span>
          </div>
          <div className="remedy-modal-body">
            <label>Email:</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(event) => this.handleEmailChange(event)}
              placeholder="Enter patient email"
            />
            <label>Choose File:</label>
            <input type="file" onChange={(event) => this.handleOnChangeImage(event)} />
          </div>
          <div className="remedy-modal-footer">
             <button className="btn-submit" onClick={this.handleSendRemedy}>
              Send
            </button>
            <button className="btn-cancel" onClick={handleCloseModal}>
              Cancel
            </button>
           
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(RemedyModal);
