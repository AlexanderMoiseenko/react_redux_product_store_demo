/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types';
import {Loader} from 'semantic-ui-react';
import {Helmet} from 'react-helmet';

import {removeSomeProduct} from '../../modules/products';

import ProductBoardComponent from './components';

import './style.css'

class Products extends Component {

  render() {
    const {
      products,
      productsLoaded,
      removeSomeProduct
    } = this.props;

    return (
       <div className="container_inner">
         <Helmet>
           <title>All Products</title>
         </Helmet>
         {productsLoaded
            ? <ProductBoardComponent
               {...{products, productsLoaded, removeSomeProduct}}
            />
            : <Loader active size={'medium'}>Loading...</Loader>}
       </div>
    )
  }
}


const mapState = (state) => {
  const {
    productArr: products,
    dataIsLoaded: productsLoaded
  } = state.products;
  return {
    products,
    productsLoaded
  }
};


const mapDispatch = (dispatch) => bindActionCreators({
  removeSomeProduct
}, dispatch);

export default connect(mapState, mapDispatch)(Products)