/* eslint-disable */
import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import { connect } from 'react-redux'
import {actions} from 'react-redux-form';

const preventEventBubbling = (e) => {
  if (e.target.nodeName === 'BUTTON') {
    e.preventDefault()
  }
};


class ImageUploaderHOC extends Component {
    state = { pictures: [] };

  transformImageToBase64 = () => {
    const target = this.state.pictures[0][0];
    if (!target) return;
    return new Promise((res, rej) => {
      let result = {};
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        result.src = reader.result;
        result.name = target.name;
        res(result);
      });
      reader.addEventListener('error', (err) => {
        rej(err)
      });
      reader.readAsDataURL(target);
    })
  };

  onDrop = (picture) => {
    this.setState(() => {
      return {
        pictures: this.state.pictures.concat(picture)
      }}, () => {
        return this.transformImageToBase64()
           .then((res) => this.props.dispatch(actions.change(this.props.model, res)))
           .catch(err => new Error(err))
    })
  };

  render() {

    return (
       <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText='Choose image'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
       />
    );
  }
}

export default connect()(ImageUploaderHOC);