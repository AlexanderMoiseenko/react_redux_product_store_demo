/* eslint-disable */
import React, {Component} from 'react';
import {Card, Image, Button, Label} from 'semantic-ui-react';
import withRouter from 'react-router-dom/withRouter';
import ConfirmModal from './ConfirmModal'

import './styles.css'

class OneProductCardComponent extends Component {

  removeProduct = () => {
    const {productData, removeSomeProduct} = this.props;
    return removeSomeProduct(productData.productId)
       .then(() => setTimeout(() => this.props.history.push('/'), 1100))
       .catch(err => new Error(err))
  };

  goForChanges = () => {
    this.props.history.push(`/product/${this.props.productData.productId}/edit`);
  };

  render() {

    const {description, price, title, image} = this.props.productData.initialProductData;

    return (
       <Card raised centered className={"shadow_border single_card"}>
         <Image
            alt={image ? image.name : "Dummy image"}
            src={image ? image.src : '../assets/dummy.png'}/>
         <Card.Content>
           <Card.Header>
             {title}
           </Card.Header>
           <Card.Description>
             {description}
           </Card.Description>
           <Card.Content extra className={"product_price"}>
             <span>Price: </span>
             <Label as='span' tag color="teal">{price} $</Label>
           </Card.Content>
         </Card.Content>
         <Card.Content extra>
           <Button.Group fluid>
             <ConfirmModal title={title} callback={this.removeProduct}/>
             <Button.Or />
             <Button positive onClick={this.goForChanges}>Edit</Button>
           </Button.Group>
         </Card.Content>
       </Card>
    )
  }
}

export default withRouter(OneProductCardComponent)