'use client'
import React from 'react'
interface Ierror{
    error:Error;
    rest:()=>void
}
const Error = ({error,rest}:Ierror) => {
  return (
    <>
    <h1 className='text-red-700 text-22'>خطا </h1>
    <p>{error.message}</p>
    <button className='text-white' onClick={()=>rest()}>ری لود </button>
    </>
  )
}

export default Error