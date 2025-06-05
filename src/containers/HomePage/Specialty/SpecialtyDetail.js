import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import "./SpecialtyDetail.scss";
import Header from "../Header";
import { withRouter } from "react-router";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getSpecialtyDetail } from "../../../services/specialtyService";
import _ from "lodash";
class SpecialtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataSpecialty: {},
    };
  }
  async componentDidMount() {
    const id = this.props.match?.params?.id;
    if (id) {
      let res = await getSpecialtyDetail({ id: id, location: "ALL" });
      if (res && res.errCode === 0) {
        let data = res.data;
        this.setState({
          dataSpecialty: res.data,
        });
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
            this.setState({
              // dataSpecialty: res.data,
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
    const { arrDoctorId, dataSpecialty } = this.state;
    return (
      <>
        <Header />
        <div className="description-specialty">
          <p
            dangerouslySetInnerHTML={{ __html: dataSpecialty?.contentHTML }}
          ></p>
        </div>
        <div className="list-doctor">
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <>
                  <div className="each-doctor row" key={index}>
                    <div className="content-left col-md-6">
                      <ProfileDoctor doctorId={item} isShowLinkDetail={true} />
                    </div>
                    <div className="content-right col-md-6">
                      <DoctorSchedule doctorId={item} />

                      <DoctorExtraInfor doctorId={item} />
                    </div>
                  </div>
                </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
