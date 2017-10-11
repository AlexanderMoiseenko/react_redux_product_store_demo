/* eslint-disable */
import React from 'react'
import { Image, Card, Button } from 'semantic-ui-react'

const ImageCard = ({image, removeImage}) => (
   <Card fluid>
     <Card.Content>
       <Image src={ image.src } fluid />
     </Card.Content>
     <Card.Content extra>
       <Button basic color="red" onClick={removeImage}>
         Remove Image
       </Button>
     </Card.Content>
   </Card>
);

export default ImageCard;