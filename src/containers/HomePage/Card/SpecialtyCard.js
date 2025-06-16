import React, { Component } from 'react';
import './SpecialtyCard.scss';
import { withRouter } from 'react-router';
import { path } from '../../../utils/constant';

class SpecialtyCard extends Component {
   constructor(props) {
    super(props);
    this.state = {
      imageBase64: "",
    };
  }

  componentDidMount() {
    this.convertImageToBase64();
  }

  convertImageToBase64 = () => {
    const { specialty } = this.props;
    if (specialty && specialty.image) {
      let imageBase64 = "";
      if (specialty.image) {
        imageBase64 = new Buffer(specialty.image, "base64").toString("binary");
      }
      this.setState({ imageBase64 });
    }
  };
  handleClick = (specialtyId) => {
   this.props.history.push(`${path.SPECIALTY_DETAIL}/${specialtyId}`)
  };

  render() {
    const { specialty } = this.props;
    const { imageBase64 } = this.state

    return (
      <div className="specialty-card" onClick={() => this.handleClick(specialty.id)}>
        <div className="specialty-image">
          <img src={imageBase64} alt={specialty.name} />
        </div>
        <div className="specialty-name">{specialty.name}</div>
      </div>
    );
  }
}

export default withRouter(SpecialtyCard);
