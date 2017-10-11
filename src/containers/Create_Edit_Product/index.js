/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { ErrorBoundary } from '../../components/addons';
import ProductForm from '../../components/addons/ProductForm';

import { actions } from 'react-redux-form';
import { removeSomeProduct, createNewProduct, saveEditedProduct } from '../../modules/products';
import {
  loadProductData,
  clearProductData,
  resetProductData,
  removeProductImg
} from '../../modules/current_product';


const defaultState = {
  title: '',
  price: 0,
  description: '',
  image: {name: 'Default image', src: '../assets/dummy.png'}
};

class CreateEditProductContainer extends Component {
  state = {
    mode: null
  };

  loadProductData = () => {
    let neededProduct;
    if (this.state.mode === 'edit') {
      neededProduct = [...this.props.productsArr].find((item) => item.id.toString() === this.props.match.params.productId);
    } else {
      neededProduct = defaultState;
    }
    return this.props.dispatch(actions.load('myForms.product', neededProduct));
  };

  loadData = () => {
    const {loadProductData, match} = this.props;
    return loadProductData(match.params.productId);
  };

  componentWillUnmount(){
    this.props.clearProductData();
    this.clearFormState();
  }

  clearFormState = () => {
    this.props.dispatch(actions.load('myForms.product', defaultState));
  };

  componentDidMount(){
    if(this.props.match.params && this.props.match.params.productId) {
      this.setState(() => {
        return {mode: 'edit'}
      }, () => {
        this.loadProductData();
        this.loadData();
      });
    }
    
    if (!Object.keys(this.props.match.params).length) {
      this.setState(() => {
          return {mode: 'create'}
      }, () => {
        this.loadProductData();
        this.loadData();
      });
    }
  };

  componentDidUpdate(prevProps){
    if (prevProps.match.params && !this.props.match.params) {
      this.clearFormState();
      this.loadData();
      this.loadProductData();
    }
  };


  componentWillReceiveProps(nextProps) {
    console.log("nextProps: ", nextProps);
    console.log("this.props: ", this.props);
    if (Object.keys(nextProps.match.params).length !== Object.keys(this.props.match.params).length) {
      this.clearFormState();
    }
    if (Object.keys(nextProps.match.params).length === 0) {
      this.setState(() => {
          return { mode: 'create'}
      });
    }
  }

  createProduct = (product) => {
      return this.props.createNewProduct(product)
         .then(() => setTimeout(() => this.props.history.push('/'), 1000))
         .catch(err => new Error(err))
  };

  editProductData = (product) => {
    return this.props.saveEditedProduct(product)
       .then(() => setTimeout(() => this.props.history.push('/'), 1000))
       .catch(err => new Error(err))
  };

  submitFormSwitcher = (product) => {
    if (this.state.mode === 'edit'){
      return this.editProductData(product)
    } else {
      return this.createProduct(product)
    }
  };

  render() {
    const {
      productsLoaded,
      currentProductLoaded
    } = this.props;

    return (
       <div className="container_inner">
         <Helmet>
           <title>
             {this.state.mode === 'edit' ? 'Edit Product' : 'Create New Product'}
           </title>
         </Helmet>
         <ErrorBoundary>
           {productsLoaded && currentProductLoaded
              ? <ProductForm
                 mode={this.state.mode}
                 product={this.props.productData}
                 edit={this.props.saveEditedProduct}
                 submit={this.submitFormSwitcher}
                 removeImg={this.props.removeProductImg}
                 dispatch={this.props.dispatch}
              />
              : <Loader active>Loading...</Loader>}
         </ErrorBoundary>
       </div>
    )
  }
}

const mapState = (state) => {
  const product = state.current_product;
  const productsArr = state.products.productArr;
  const productsLoaded = state.products.dataIsLoaded;
  return {
    productData: product,
    currentProductLoaded: !product.isFetching,
    productsArr,
    productsLoaded
  };
};

const mapDispatch = (dispatch) => bindActionCreators({
  removeSomeProduct,
  loadProductData,
  clearProductData,
  resetProductData,
  createNewProduct,
  saveEditedProduct,
  removeProductImg,
  dispatch
}, dispatch);

export default connect(mapState, mapDispatch)(CreateEditProductContainer)