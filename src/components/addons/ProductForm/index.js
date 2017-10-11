/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Control,
  Form,
  Errors
} from 'react-redux-form';

import ImageUploader from '../ImageUploader'
import ImageCard from './form_components/ImageCard'

import { success } from 'react-notification-system-redux'

import './style.css';

// validators
const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const isPositive = (val) => parseInt(val, 10) >= 0;


const preventEventBubbling = (e) => {
  if (e.target.nodeName === 'BUTTON') {
    e.preventDefault()
  }
};

export default class ProductForm extends Component {
  handleSubmit = (product) => {
    this.props.submit(product);
  };

  addListener() {
    document.querySelector('.preventDefault').addEventListener('click', preventEventBubbling, true);
  }

  componentDidMount(){
    let target = document.querySelector('.preventDefault');
    target && this.addListener();
  }

  componentWillUnmount(){
    let target = document.querySelector('.preventDefault');
    target && target.removeEventListener('click', preventEventBubbling);
  }

  removeImg = () => {
    this.props.removeImg();
  };

  renderImageFieldContent = () => {
    if (this.props.product.isFetching === true || !this.props.product.currentProductData.image) return;
    return this.props.product.currentProductData.image.src !== '../assets/dummy.png'
       ? <ImageCard image={this.props.product.currentProductData.image} removeImage={this.removeImg}/>
       :<ImageUploader model="myForms.product.image"/>
  };

  render() {

    return (
       <Form
          className={'product_form'}
          model="myForms.product"
          onSubmit={product => this.handleSubmit(product)}>

         <div className={'field'}>
           <label>Product Title</label>
           <Control.text
              model="myForms.product.title"
              required
              validators={{
                required
              }}
              validateOn="blur"
           />
           <Errors
              className={'errors'}
              model="myForms.product.title"
              show={(field) => field.touched && !field.focus}
              messages={{
                valueMissing: 'Product title is required',
              }}
           />
         </div>

         <div className={'field'}>
           <label>Price</label>
           <Control
              type="number"
              model="myForms.product.price"
              validators={{
                isNumber,
                required,
                isPositive
              }}
              required
              validateOn="blur"
           />
           <Errors
              className={'errors'}
              model="myForms.product.price"
              show={(field) => field.touched && !field.focus}
              messages={{
                isPositive: 'A price should be a positive value',
                valueMissing: 'Product price is required',
                typeMismatch: 'Must be a number'
              }}
           />
         </div>

         <div className={'field'}>
           <label>Description</label>
           <Control.textarea model="myForms.product.description"
                             validators={{required}}
                             validateOn="blur"
           />
           <Errors
              className={'errors'}
              model="myForms.product.description"
              show={(field) => field.touched && !field.focus}
              messages={{
                valueMissing: 'Product description is required',
              }}
           />
         </div>

         <div className={'field preventDefault'}>
           {this.renderImageFieldContent()}
         </div>

         <button type="submit">
           {this.props.mode === 'edit' ? 'Save Changes' : 'Create Product'}
         </button>
         <Control.reset model="myForms.product" className={"secondary"}>
           {this.props.mode === 'edit' ? 'Reset Values' : 'Clear Values'}
         </Control.reset>
       </Form>
    );
  }
}
