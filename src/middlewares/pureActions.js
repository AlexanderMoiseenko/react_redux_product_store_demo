/* eslint-disable */

/**
 * Allows to send string with action name, which then converts into object:
 * dispatch("ACTION_TYPE')
 * equals
 * dispatch({type: "ACTION_TYPE"})
 * @param store
 */
const pureActions = store => next => action => {
  if (typeof (action) === 'string') {
    store.dispatch({
      type: action
    })
  } else {
    return next(action);
  }
};

export default pureActions
