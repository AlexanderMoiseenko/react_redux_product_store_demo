/* eslint-disable */

import uuidV4 from 'uuid/v4';

// actions constants
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';
export const START_FETCHING_PRODS = 'START_FETCHING_PRODS';
export const END_FETCHING_PRODS = 'END_FETCHING_PRODS';

const promise = () => Promise.resolve();

import data from '../../data';
import {loadState} from '../../helpers/localStorage'
import { successNotify } from '../../helpers/notificationActions'

const initialState = {
  productArr: loadState() ? loadState().products : [],
  isFetching: false,
  dataIsLoaded: false
};

export default (state = initialState, action) => {
   const {type, payload} = action;
   switch (type) {
      case GET_ALL_PRODUCTS: {
         return {
            ...state,
           productArr: payload.products,
           dataIsLoaded: true,
           isFetching: false
         }
      }

     case START_FETCHING_PRODS: {
       return {
          ...state,
          isFetching: true
       }
     }

     case END_FETCHING_PRODS: {
       return {
         ...state,
         isFetching: false
       }
     }

     case DELETE_PRODUCT: {
       return {
          ...state,
         productArr: payload.newProdArr
       }
     }

     case CREATE_PRODUCT:
     case CHANGE_PRODUCT:{
       return {
          ...state,
         productArr: payload.newProdArr,
       }
     }

      default:
         return state
   }
}

export const createNewProduct = (productItem) => (dispatch, getState) => {

  let extensibleProdItem = Object.assign({}, productItem);
  extensibleProdItem.id = uuidV4();
  let newProdArr = [...getState().products.productArr];
  newProdArr.push(extensibleProdItem);

  return promise()
     .then(() => dispatch({type: CREATE_PRODUCT, payload: {newProdArr}}))
     .then(() => dispatch(successNotify({message: 'New Product has been created successfully', title: 'Product Creation', delay: 8})))
     .then((productItem) => productItem)
     .catch(err => new Error(err))
};

const startFetching = () => (dispatch) => dispatch({type: START_FETCHING_PRODS});
const endFetching = () => (dispatch) => dispatch({type: END_FETCHING_PRODS});

export const getProductsFromLS = () => (dispatch) => {
  dispatch(startFetching());

  const stateData = loadState().products;
  let savedData = (stateData && stateData.length) ? stateData : data;

  let newData = [...savedData];
  newData.forEach(item => !item.id ? item.id = uuidV4() : item.id);

   return promise()
      .then((products => dispatch({
         type: GET_ALL_PRODUCTS,
         payload: {
            products: newData
         }
      })))
      .catch(err => new Error(err))
};

export const removeSomeProduct = (prodId) => (dispatch, getState) => {
  dispatch(startFetching());

  const newProdArr = [...getState().products.productArr].filter(product => product.id !== prodId);
  
  return promise()
     .then(() => dispatch({type: DELETE_PRODUCT, payload: {newProdArr}}))
     .then(() => dispatch(successNotify({message: 'Product has been removed successfully', title: 'Product removing'})))
     .then(() => dispatch(endFetching()))
     .catch(err => {
       console.error(err);
       throw new Error(err);
     });
};

const handleExistedProductChanges = (arr, obj) => {
  let objIdx = arr.findIndex(item => item.id === obj.id);
  arr[objIdx] = obj;
  return arr;
};

const handleProductCreation = (arr, obj) => {
  let newObj = Object.assign({}, obj);
  newObj.id = uuidV4();
  arr.push(newObj);
  return arr;
};

export const saveEditedProduct = (obj) => (dispatch, getState) => {
  dispatch(startFetching());
  let updatedProdArr = [...getState().products.productArr];

  if (obj.id) {
    updatedProdArr = handleExistedProductChanges(updatedProdArr, obj);
  } else {
    updatedProdArr = handleProductCreation(updatedProdArr, obj);
  }

  return promise()
     .then(() => dispatch({type: CHANGE_PRODUCT, payload: {newProdArr: updatedProdArr}}))
     .then(obj => dispatch(endFetching()))
     .then(() => dispatch(successNotify({message: 'Product has been successfully updated', title: 'Product editing', delay: 5})))
     .catch(err => {
       console.error(err);
       throw new Error(err);
     });
};

