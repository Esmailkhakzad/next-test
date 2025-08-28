import Link from 'next/link'
import React, { FC, ReactNode } from 'react'
interface Ichildren {
  children: ReactNode
  news: ReactNode
  corsrs: ReactNode
}

const Dashboardlayout: FC<Ichildren> = ({ children, news, corsrs }) => {
  return (
    <>
      <div className='flex p-8'>
        <aside className='w-52  '>
          <ul className='underline '>
            <li>
              <Link href={'/dashboard'}>dashboar</Link>
            </li>
            <li>
              <Link href={'/dashboard/profail'}>profail</Link>
            </li>
            <li>
              <Link href={'/dashboard/setting'}>setting</Link>
            </li>
          </ul>
        </aside>
        <main className='grow p-18 bg-red-700'>{children}</main>
      </div>
      <div className='flex justify-center gap-10'>
        <div>
          <h1 className='items-center justify-items-center  p-8 '>{news}</h1>
        </div>
        <div>
          <h1 className='items-center justify-items-center  p-8 '>{corsrs}</h1>
        </div>
      </div>
    </>
  )
}

export default Dashboardlayout
