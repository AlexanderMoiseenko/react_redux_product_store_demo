/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Button, Icon } from 'semantic-ui-react';
import NavLink from 'react-router-dom/NavLink';

export default class MenuHeader extends Component {
  findOutUrl = () => {
    let routePath = this.context.store.getState().routing.location.pathname;
    return routePath === '/product/create'
  };

  goToProductCreation = () => {
    this.props.goToRoute('/product/create')
  };

  render() {

    return (
       <Menu secondary fluid borderless inverted size={'small'}>
         <Menu.Item header>Store Icon</Menu.Item>
         <Menu.Item active as={NavLink} to="/" onClick={this.handleItemClick}>
           Main Page
         </Menu.Item>
         <Menu.Menu position='right'>
           <Menu.Item>
             <Button
                disabled={this.findOutUrl()}
                animated
                compact
                floated={'right'}
                onClick={this.goToProductCreation}
             >
               <Button.Content visible>Create Product</Button.Content>
               <Button.Content hidden>
                 <Icon name='right arrow' />
               </Button.Content>
             </Button>
           </Menu.Item>
         </Menu.Menu>
       </Menu>
    );
  }
}

MenuHeader.contextTypes = {
  store: PropTypes.object
};