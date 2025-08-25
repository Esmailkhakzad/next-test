import Link from 'next/link'
import React, { FC, ReactNode } from 'react'
interface Ichildren {
  children: ReactNode;
}

const Dashboardlayout: FC<Ichildren> = ({ children }) => {
  return (
      <div className='flex'>
        <aside className='w-52 bg-white '>
          <h1 className='text-black'>mune Dashboard</h1>
          <ul className='underline' >
            <li>
              <Link href={'/dashboard'} >
                dashboar
              </Link>
            </li>
            <li>
              <Link href={'/dashboard/profail'} >
                profail
              </Link>
            </li>
            <li>
              <Link href={'/dashboard/setting'} >
                setting
              </Link>
            </li>
          </ul>
        </aside>
        <main className='grow'>{children}</main>
      </div>
  )
}

export default Dashboardlayout
