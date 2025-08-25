import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div >  
    <h2 className='text-red-700 text-22'>چیزی نیست </h2>
    <Link href={'/'}>
    <button>برگشت به صفحه هوم </button>
    </Link>
    </div>
  )
}

export default NotFound