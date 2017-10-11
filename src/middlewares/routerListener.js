/*eslint-disable*/
import {SET_PRODUCT_TO_DEFAULT} from '../modules/current_product'

const routerListener = store => next => action => {
  if (action.type === "@@router/LOCATION_CHANGE" && action.payload.pathname === "/product/create") {
    store.dispatch(SET_PRODUCT_TO_DEFAULT);
    return next(action);
  } else {
    return next(action);
  }
};

export default routerListener;