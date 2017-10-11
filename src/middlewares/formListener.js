/*eslint-disable*/
import {SAVE_PRODUCT_IMAGE, RESET_PRODUCT_DATA} from '../modules/current_product'

const formListener = store => next => action => {
  if (action.type === "rrf/change" && action.model && action.model === 'myForms.product.image') {
    let newCurrProdData = Object.assign({}, store.getState().current_product.currentProductData);
    newCurrProdData.image = action.value;

    store.dispatch({type: SAVE_PRODUCT_IMAGE, payload: {newCurrProdData}});
    return next(action);
  } else if (action.type === 'rrf/reset' && action.model === 'myForms.product') {
    store.dispatch(RESET_PRODUCT_DATA);
    return next(action);
  } else {
    return next(action);
  }
};

export default formListener;