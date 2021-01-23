import * as React from 'react'

import './Image.css';

interface ImageProps {
  image: string
}

const Image : React.FC<ImageProps> = ({image}) => {


  return (
    <img className="image__img" src={image}/>
  )
}

export default Image;


