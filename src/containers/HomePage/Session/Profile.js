import React, { Component } from "react"; 
import { connect } from "react-redux"; 
import * as actions from "../../../store/actions"; 
import { LANGUAGES } from "../../../utils/constant"; 
import "./Profile.scss"; 
import Header from "../Header"; 
import { getAllUsers } from "../../../services/userService"; 
import defaultAvt from "../../../assets/images/default-avatar.jpg";
import CommonUtils from "../../../utils/CommonUtils"; 
import { FormattedMessage } from "react-intl";

class Profile extends Component { 
  constructor(props) { 
    super(props); 
    this.state = { 
      user: null, 
    }; 
  } 
 
  async fetchUserDetail(userId) { 
    if (!userId) return; 
    try { 
      const response = await getAllUsers(userId); 
      if (response && response.users) { 
        this.setState({ user: response.users }); 
      } 
    } catch (error) { 
      console.error("Failed to fetch user:", error); 
    } 
  } 
 
  componentDidMount() { 
    const { userInfo } = this.props; 
    console.log("User Info:", userInfo); 
    if (userInfo && userInfo.id) { 
      this.fetchUserDetail(userInfo.id); 
    } 
  } 
 
  componentDidUpdate(prevProps) { 
    if ( 
      this.props.userInfo && 
      this.props.userInfo.id && 
      prevProps.userInfo && 
      prevProps.userInfo.id !== this.props.userInfo.id 
    ) { 
      this.fetchUserDetail(this.props.userInfo.id); 
    } 
  } 

  formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    } catch (error) {
      return "Chưa cập nhật";
    }
  }
 
  render() { 
    const { user } = this.state; 

 
    return ( 
      <> 
        <Header /> 
        <div className="profile-container"> 
          <div className="profile-header">
            <h2>              <FormattedMessage id="profile.title" /></h2>
            <p className="profile-subtitle"><FormattedMessage id="profile.sub-title" /></p>
          </div>

          {user ? ( 
            <div className="profile-card">
              <div className="profile-banner">
                <div className="avatar-container">
                  <div className="avatar-wrapper">
                    <img 
                      src={defaultAvt} 
                      alt="avatar"
                    /> 
                  </div>
            
                </div>
                <h3 className="profile-name">
                  {user.firstName} {user.lastName}
                </h3>
              </div>

              <div className="profile-content">
                <div className="info-section">
                  <h4 className="section-title"><FormattedMessage id="profile.personal-information" /></h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <div className="info-label"><FormattedMessage id="profile.fullname" /></div>
                      <div className="info-value">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <div className="info-label">Email</div>
                      <div className="info-value">{user.email}</div>
                    </div>
                    
                    <div className="info-item">
                      <div className="info-label"><FormattedMessage id="profile.phone-number" /></div>
                      <div className="info-value">
                        {user.phoneNumber || "Chưa cập nhật"}
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <div className="info-label"><FormattedMessage id="profile.date-of-birth" /></div>
                      <div className="info-value">
                        {user.dateOfBirth || "Chưa cập nhật"}
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <div className="info-label"><FormattedMessage id="profile.address" /></div>
                      <div className="info-value">
                        {user.address || "Chưa cập nhật"}
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <div className="info-label"><FormattedMessage id="profile.gender" /></div>
                      <div className="info-value">
                        {user.gender === 'M' ? 'Nam' : 
                         user.gender === 'F' ? 'Nữ' : 'Chưa cập nhật'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : ( 
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text"><FormattedMessage id="profile.loading" /></p>
            </div>
          )} 
        </div> 
      </> 
    ); 
  } 
} 
 
const mapStateToProps = (state) => ({ 
  language: state.app.language, 
  userInfo: state.user.userInfo, 
}); 
 
export default connect(mapStateToProps)(Profile);