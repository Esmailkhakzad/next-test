import React, { FC } from 'react'
interface Iprops{
    params:{
        slug:string;
    };
}
const docspage:FC<Iprops> = ({params}) => {
  return (
    <div>docspage:{params.slug}</div>
  )
}

export default docspage