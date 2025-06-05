import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import "./ClinicDetail.scss";
import Header from "../Header";
import { withRouter } from "react-router";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getClinicDetail } from "../../../services/clinicService";
import _ from "lodash";

class ClinicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataClinic: {},
    };
  }

  async componentDidMount() {
    const id = this.props.match?.params?.id;
    if (id) {
      let res = await getClinicDetail({ id });
      if (res && res.errCode === 0) {
        let data = res.data;
        this.setState({
          dataClinic: data,
        });
        
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.forEach((item) => {
              arrDoctorId.push(item.doctorId);
            });
            this.setState({
              arrDoctorId: arrDoctorId,
            });
          }
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    const { language } = this.props;
    const { arrDoctorId, dataClinic } = this.state;
    return (
      <>
        <Header />
        <div className="description-clinic">
          <p
            dangerouslySetInnerHTML={{ __html: dataClinic?.contentHTML }}
          ></p>
        </div>
        <div className="list-doctor">
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor row" key={index}>
                  <div className="content-left col-md-6">
                    <ProfileDoctor doctorId={item} isShowLinkDetail={true} />
                  </div>
                  <div className="content-right col-md-6">
                    <DoctorSchedule doctorId={item} />
                    <DoctorExtraInfor doctorId={item} />
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClinicDetail));