import * as React from 'react'

import './Image.css';

const Image = ({image}) => {


  return (
    <img className="image__img" src={image}/>
  )
}

export default Image;


