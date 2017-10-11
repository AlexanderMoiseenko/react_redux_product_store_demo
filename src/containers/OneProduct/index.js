/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types';
import {Loader} from 'semantic-ui-react';
import {Helmet} from 'react-helmet';
import {ErrorBoundary} from '../../components/addons'

import {removeSomeProduct} from '../../modules/products';
import {loadProductData, clearProductData} from '../../modules/current_product'

import OneProductCardComponent from './components/OneProductCardComponent';

class Product extends Component {
  constructor(props){
    super(props);

    if(!props.productData.productId) {
      this.loadData();
    }
  }

  loadData = () => {
    const {loadProductData, match} = this.props;
    return loadProductData(match.params.productId);
  };

  componentWillUnmount(){
    this.props.clearProductData();
  }

  render() {
    const {
      product,
      productsArrLoading,
      removeSomeProduct,
      productData,
    } = this.props;

    return (
       <div>
         <Helmet>
           <title>Product</title>
         </Helmet>
         <ErrorBoundary>
           {!productsArrLoading
              ? <OneProductCardComponent
                 {...{product, removeSomeProduct, productData}}
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
  const productsArrLoading = state.products.isFetching;
  const productLoaded = state.current_product.isFetching;
  return {
    productData: product,
    productsArr,
    productsArrLoading,
    productLoaded
  };
};

const mapDispatch = (dispatch) => bindActionCreators({
  removeSomeProduct,
  loadProductData,
  clearProductData
}, dispatch);

export default connect(mapState, mapDispatch)(Product)