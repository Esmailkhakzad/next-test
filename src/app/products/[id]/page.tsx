import React, { FC } from 'react'
interface Ipramas {
    params :{
        id:string;
    };
}

const productspage:FC<Ipramas> = ({params}) => {
  return (
    <div>productspage:{params.id}</div>
  )
}

export default productspage