import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { LANGUAGES } from "../../utils/constant";
import "./Search.scss";
import DoctorCard from "./Card/DoctorCard";
import ClinicCard from "./Card/ClinicCard";
import SpecialtyCard from "./Card/SpecialtyCard";
import { searchDoctor } from "../../services/userService";
import { searchClinic } from "../../services/clinicService";
import { searchSpecialty } from "../../services/specialtyService";
import Header from "./Header";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchType: "doctor",
      results: [],
      isLoading: false,
      hasSearched: false,
      error: null,
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapShot) {}

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchTypeChange = (event) => {
    this.setState({ searchType: event.target.value });
  };

  handleSearch = async () => {
    const { searchTerm, searchType } = this.state;
    if (!searchTerm.trim()) return;

    this.setState({ isLoading: true, hasSearched: true, error: null });

    try {
      let results = [];
      let response;
      switch (searchType) {
        case "doctor":
          response = await searchDoctor(searchTerm);
          break;
        case "clinic":
          response = await searchClinic(searchTerm);
          break;
        case "specialty":
          response = await searchSpecialty(searchTerm);
          break;
        default:
          break;
      }

      if (response && response.errCode === 0) {
        results = response.data.map((item) => ({
          ...item,
          type: searchType,
        }));
      }

      this.setState({
        results,
        isLoading: false,
      });
    } catch (error) {
      console.error("Search error:", error);
      this.setState({
        isLoading: false,
        error: "Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại!",
      });
    }
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  };

  renderResultCard = (result) => {
    switch (result.type) {
      case "doctor":
        return (
          <DoctorCard
            key={`doctor-${result.id}`}
            doctor={result}
            language={this.props.language}
          />
        );
      case "clinic":
        return (
          <ClinicCard
            key={`clinic-${result.id}`}
            clinic={result}
            language={this.props.language}
          />
        );
      case "specialty":
        return (
          <SpecialtyCard
            key={`specialty-${result.id}`}
            specialty={result}
            language={this.props.language}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { language } = this.props;
    const { searchTerm, searchType, results, isLoading, hasSearched, error } =
      this.state;

    return (
      <>
        <Header />
        <div className="search-container">
          {/* Header Search Section */}
          <div className="search-header">
            <div className="search-header-content">
              <h1 className="search-title">Tìm kiếm dịch vụ y tế</h1>
              <p className="search-subtitle">
                Tìm bác sĩ, bệnh viện, chuyên khoa phù hợp với bạn
              </p>
            </div>
          </div>

          {/* Main Search Bar */}
          <div className="search-main">
            <div className="search-box-container">
              <div className="search-box">
                <div className="search-input-wrapper">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm bác sĩ, bệnh viện, chuyên khoa..."
                    value={searchTerm}
                    onChange={this.handleSearchChange}
                    onKeyPress={this.handleKeyPress}
                  />
                </div>

                <div className="search-filter">
                  <select
                    className="search-select"
                    value={searchType}
                    onChange={this.handleSearchTypeChange}
                  >
                    <option value="doctor">Bác sĩ</option>
                    <option value="clinic">Phòng khám</option>
                    <option value="specialty">Chuyên khoa</option>
                  </select>
                </div>

                <button
                  className="search-button"
                  onClick={this.handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Tìm kiếm"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div className="search-results">
              <div className="results-header">
                <h3>Kết quả tìm kiếm</h3>
                {!isLoading && (
                  <span className="results-count">
                    Tìm thấy {results.length} kết quả cho "{searchTerm}"
                  </span>
                )}
              </div>

              {isLoading ? (
                <div className="loading-results">
                  <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Đang tìm kiếm...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="error-results">
                  <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>{error}</p>
                    <button className="retry-btn" onClick={this.handleSearch}>
                      Thử lại
                    </button>
                  </div>
                </div>
              ) : (
                <div className="results-grid">
                  {results.length > 0 ? (
                    results.map((result) => this.renderResultCard(result))
                  ) : (
                    <div className="no-results">
                      <i className="fas fa-search"></i>
                      <h4>Không tìm thấy kết quả</h4>
                      <p>Hãy thử tìm kiếm với từ khóa khác</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Popular Searches */}
          {!hasSearched && (
            <div className="popular-searches">
              <h3>Tìm kiếm phổ biến</h3>
              <div className="popular-list">
                <div className="popular-item">
                  <i className="fas fa-heart"></i>
                  <div>
                    <h4>Bác sĩ tim mạch</h4>
                    <p>Khám và điều trị các bệnh về tim mạch</p>
                  </div>
                </div>
                <div className="popular-item">
                  <i className="fas fa-baby"></i>
                  <div>
                    <h4>Bác sĩ nhi khoa</h4>
                    <p>Chăm sóc sức khỏe trẻ em</p>
                  </div>
                </div>
                <div className="popular-item">
                  <i className="fas fa-eye"></i>
                  <div>
                    <h4>Bác sĩ mắt</h4>
                    <p>Khám và điều trị các bệnh về mắt</p>
                  </div>
                </div>
                <div className="popular-item">
                  <i className="fas fa-tooth"></i>
                  <div>
                    <h4>Nha khoa</h4>
                    <p>Chăm sóc và điều trị răng miệng</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
