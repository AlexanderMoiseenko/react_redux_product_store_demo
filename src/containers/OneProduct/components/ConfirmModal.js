/* eslint-disable */
import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ConfirmModal extends Component {
  state = { open: false };

  show = size => () => this.setState({ size, open: true });
  close = () => this.setState({ open: false });

  remove = () => {
    return this.props.callback()
       .then(() => this.close())
       .catch(error => new Error(error))
  };

  render() {
    const { open, size } = this.state,
          { title } = this.props;

    return (
       <div>
         <Button color='google plus' onClick={() => this.show('mini')}>
           Delete
         </Button>

         <Modal size={size} open={open} onClose={this.close}>
           <Modal.Header>
             Delete Product
           </Modal.Header>
           <Modal.Content>
             <p>{`Are you sure you want to delete ${title}?`}</p>
           </Modal.Content>
           <Modal.Actions>
             <Button negative onClick={this.close}>
               No
             </Button>
             <Button
                onClick={this.remove}
                positive
                icon='checkmark'
                labelPosition='right'
                content='Yes' />
           </Modal.Actions>
         </Modal>
       </div>
    )
  }
}

export default ConfirmModal