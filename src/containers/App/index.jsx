/* eslint-disable */
import React, {Component} from 'react';

import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
// Import main views
import Header from '../../components/Header';
// Import containers
import { Products, Product, NotFound, CreateEditProduct, NotificationContainer } from '../../containers';
// Import actions
import { getProductsFromLS } from '../../modules/products'

// Import styled components
import {
  PageLayout,
  MainLayout,
  MainContent,
  MainContainer,
  StyledDimmer
} from './style';


class App extends Component {

  componentDidMount() {
    setTimeout(this.props.getProducts, 1000);
  }

  render() {

    const dimmerProps = {
      active: false,
      page: true,
    };

    return (
       <PageLayout>
         <NotificationContainer/>
         <StyledDimmer {...dimmerProps}/>
         <Header/>
         <MainLayout>
           <MainContent>
             <MainContainer id="main-container">
               <Switch>
                 <Route exact path="/" component={Products}/>
                 <Route exact path="/product/create" component={CreateEditProduct}/>
                 <Route exact path="/product/:productId" component={Product}/>
                 <Route exact path="/product/:productId/edit" component={CreateEditProduct}/>
                 <Route path='/*' component={NotFound}/>
               </Switch>
             </MainContainer>
           </MainContent>
         </MainLayout>
       </PageLayout>
    )
  }
}

const mapState = (state) => ({
  products: state.products.productArr
});

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProductsFromLS())
  }
};

export default withRouter(connect(mapState, mapDispatch)(App))
