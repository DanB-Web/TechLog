import * as React from 'react'

import './Image.css';

interface ImageProps {
  image: string
}

const Image : React.FC<ImageProps> = ({image}) =>
    <img className="image__img" src={image} alt={image}/>


export default Image;


