/*eslint-disable */
import { success} from 'react-notification-system-redux'

const notificationOpts = ({message, title, delay = 2}) => {
  return {
    title: title || 'Some manipulation with some product',
    message: message || 'Product has changed!',
    position: 'br',
    autoDismiss: delay
  }
};

export const successNotify = (params) => (dispatch) => {
  return dispatch(success(notificationOpts(params)))
};

