import Link from 'next/link'

export default function Home () {
  return (
    <div className='font-sans  items-center justify-items-center  p-8   '>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <Link href={'/about'}> go about</Link>
          <Link href={'/dashboard'}>go dashboard</Link>
        </div>
      </main>
    </div>
  )
}
