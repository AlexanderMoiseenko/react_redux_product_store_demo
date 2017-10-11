/* eslint-disable */
export const RESET_PRODUCT_DATA = 'RESET_PRODUCT_DATA';
export const SAVE_NEW_PRODUCT_DATA = 'SAVE_NEW_PRODUCT_DATA';
export const CLEAR_PRODUCT_DATA = 'CLEAR_PRODUCT_DATA';
export const START_FETCHING_PRODUCT = 'START_FETCHING_PRODUCT';
export const END_FETCHING_PRODUCT = 'END_FETCHING_PRODUCT';
export const REMOVE_PRODUCT_IMAGE = 'REMOVE_PRODUCT_IMAGE';
export const SAVE_PRODUCT_IMAGE = 'SAVE_PRODUCT_IMAGE';
export const SET_PRODUCT_TO_DEFAULT = 'SET_PRODUCT_TO_DEFAULT';

const promise = () => new Promise((res) => {
   return res();
});

const initialState = {
   productId: null,
   currentProductData: {},
   initialProductData: {},
   isFetching: false
};

const defaultProduct = {
  title: '',
  price: 0,
  description: '',
  image: {name: 'Default image', src: '../assets/dummy.png'}
};

export default function currentProduct(state = initialState, action) {
   const { type, payload } = action;
   switch (type) {

     case START_FETCHING_PRODUCT: {
       return {
         ...state,
         isFetching: true
       }
     }

     case END_FETCHING_PRODUCT: {
       return {
         ...state,
         isFetching: false
       }
     }

      case RESET_PRODUCT_DATA: {
         return {
            ...state,
           currentProductData: state.initialProductData
         }
      }

      case SAVE_NEW_PRODUCT_DATA: {
         let { product, productId = null } = payload;
         return {
            ...state,
           productId: productId,
           currentProductData: product,
           initialProductData: product
         }
      }

      case CLEAR_PRODUCT_DATA: {
         return {
            ...state,
            ...initialState
         }
      }

     case REMOVE_PRODUCT_IMAGE:
     case SAVE_PRODUCT_IMAGE: {
       return {
          ...state,
         currentProductData: payload.newCurrProdData
       }
     }

     case SET_PRODUCT_TO_DEFAULT: {
       return {
          ...initialState,
         currentProductData: defaultProduct,
         initialProductData: defaultProduct
       }
     }

      default:
         return state
   }
}

const startFetching = () => (dispatch) => dispatch({type: START_FETCHING_PRODUCT});

const endFetching = () => (dispatch) => dispatch({type: END_FETCHING_PRODUCT});

export const clearProductData = () => (dispatch) => dispatch({type: CLEAR_PRODUCT_DATA});

export const resetProductData = () => (dispatch) => dispatch({type: RESET_PRODUCT_DATA});

export const loadProductData = (productId) => (dispatch, getState) => {
   if (getState().products.productArr.length === 0) {
      throw new Error("You don't have items to load from");
   }

  dispatch(startFetching());

   let productForLoad;
   if (productId) {
     productForLoad = [...getState().products.productArr].find((item) => item.id === productId);
   } else {
     productForLoad = defaultProduct
   }

   return promise()
      .then(() => dispatch({type: SAVE_NEW_PRODUCT_DATA, payload: {product: productForLoad, productId}}))
      .then(() => dispatch(endFetching()))
      .catch(err => new Error(err));
};

export const removeProductImg = () => (dispatch, getState) => {
  let newCurrProdData = Object.assign({}, getState().current_product.currentProductData);
  newCurrProdData.image = {name: 'Default image', src: '../assets/dummy.png'};

  return promise()
     .then(() => dispatch({type: REMOVE_PRODUCT_IMAGE, payload: {newCurrProdData}}))
     .catch(err => new Error(err));
};
