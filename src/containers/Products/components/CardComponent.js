/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button, Label } from 'semantic-ui-react';
import ConfirmModal from './ConfirmModal';
import withRouter from 'react-router-dom/withRouter'

import './styles.css';

class ProductCardComponent extends Component {
  removeProduct = () => {
    const { id, remove } = this.props;
    return remove(id);
  };

  redirToProductPage = (e) => {
    if (e.target.nodeName === 'BUTTON') return;
    this.props.history.push(`/product/${this.props.id}`)
  };

  redirToEditProductPage = (e) => {
    e.stopPropagation();
    this.props.history.push(`/product/${this.props.id}/edit`);
  };

  render() {

    const {
      title = 'Some title',
      description = 'Default Description',
      price,
      image
    } = this.props;

    return (
       <Card raised className='shadow_border main_card' onClick={this.redirToProductPage}>
         <Image alt={image.name || "Dummy image"} src={image.src || '../assets/dummy.png'}/>
         <Card.Content>
           <Card.Header>
             {title}
           </Card.Header>
           <Card.Description>
             {description}
           </Card.Description>
           <Card.Content extra className={'product_price'}>
             <span>Price: </span>
             <Label as='span' tag color="teal">{price} $</Label>
           </Card.Content>
         </Card.Content>
         <Card.Content extra>
           <Button.Group fluid>
             <ConfirmModal title={title} callback={this.removeProduct}/>
             <Button.Or />
             <Button positive onClick={this.redirToEditProductPage}>Edit</Button>
           </Button.Group>
         </Card.Content>
       </Card>
    )
  }
}

export default withRouter(ProductCardComponent);

ProductCardComponent.propTypes = {
  description: PropTypes.string,
  body: PropTypes.string,
  userId: PropTypes.number,
  id: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.object,
  remove: PropTypes.func
};
