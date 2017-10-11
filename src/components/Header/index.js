/* eslint-disable */
import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter'
import { Container } from 'semantic-ui-react';
import isEqual from 'lodash/isEqual';
import {
  StyledHeader,
  HeaderInner,
} from './style';

import HeaderMenu from './HeaderMenu'

class HeaderComponent extends Component {
  goToRoute = (route) => {
    return this.props.history.push(route);
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props)
  }

  render() {

    return (
       <StyledHeader>
         <Container>
           <HeaderInner>
             <HeaderMenu goToRoute={this.goToRoute}/>
           </HeaderInner>
         </Container>
       </StyledHeader>
    )
  }
}

export default withRouter(HeaderComponent)
