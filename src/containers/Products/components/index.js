/* eslint-disable */
import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ProductCardComponent from './CardComponent';

export default class ProductBoardComponent extends Component {
   // static propTypes = {
   //    posts: PropTypes.object,
   //    postsLoaded: PropTypes.bool,
   //    postsLoading: PropTypes.bool,
   //    count: PropTypes.number
   // }

   shouldComponentUpdate (nextProps) {
      const {products} = this.props;
      const nextProducts = nextProps.products;
      return !_.isEqual(products, nextProducts)
   }

   render () {
      console.log("this.props ProductBoardComponent: ", this.props);
      const {products, postsLoaded = true, removeSomeProduct} = this.props;

      return (
         <Grid columns={1}>
            <Grid.Row centered>
               <Grid.Column width={16}>
                  {postsLoaded &&
                  <Card.Group itemsPerRow={3} doubling stackable>
                     {_.map(products, (product, i) =>
                        <ProductCardComponent {...product} remove={removeSomeProduct} key={i} />
                     )}
                  </Card.Group>}
               </Grid.Column>
            </Grid.Row>
         </Grid>
      )
   }
}
