/* eslint-disable */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { combineForms } from 'react-redux-form';
import products from './products';
import current_product from './current_product'
import {reducer as notifications} from 'react-notification-system-redux'


const initialProductData = {
  title: '',
  price: 0,
  description: '',
  image: {name: 'Default image', src: './assets/dummy.png'}
};

export default combineReducers({
  routing: routerReducer,
  products,
  current_product,
  notifications,
  myForms: combineForms({
     product: initialProductData,
   }, 'myForms')
})