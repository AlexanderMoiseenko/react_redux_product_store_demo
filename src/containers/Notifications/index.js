/*eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Notifications from 'react-notification-system-redux';

class NotificationContainer extends Component {

  render() {
    const {notifications} = this.props;

    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px'
        },
        success: {
          color: 'lightgray'
        }
      }
    };

    return (
       <Notifications
          notifications={notifications}
          style={style}
       />
    );
  }
}

NotificationContainer.contextTypes = {
  store: PropTypes.object
};

NotificationContainer.propTypes = {
  notifications: PropTypes.array
};

export default connect(
   state => ({ notifications: state.notifications })
)(NotificationContainer);