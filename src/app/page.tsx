'use client'
import { useTasks } from '@/core/services/api/Home/home.api'
import { useState } from 'react'

export default function Home () {
  const { data: tasks } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const filteredTasks = tasks?.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTasks = filteredTasks?.sort((a, b) => {
    const dateA = new Date(a.time).getTime()
    const dateB = new Date(b.time).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  return (
    <div className='font-sans bg-white flex flex-col items-center min-h-screen'>
      <div className='w-full max-w-4xl p-8 text-[#008B8B]'>
        <div className='mb-6'>
          <input
            type='text'
            placeholder='جستجو بر اساس عنوان تسک...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 text-xl border-2 border-[#008B8B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008B8B] text-center'
          />
        </div>
        <div className='flex justify-center gap-4 mb-8'>
          <button
            onClick={() => setSortOrder('newest')}
            className={`px-44 py-2 rounded-md transition-colors ${
              sortOrder === 'newest'
                ? 'bg-[#008B8B] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            جدیدترین
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`px-44 py-2 rounded-md transition-colors ${
              sortOrder === 'oldest'
                ? 'bg-[#008B8B] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            قدیمی‌ترین
          </button>
        </div>

        <div className='w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sortedTasks?.map(task => (
              <div
                key={task.id}
                className='border-3 text-[#008B8B] bg-[#008B8B] p-6 rounded-lg shadow-md'
              >
                <div className='flex justify-between items-start mb-4'>
                  <h2 className='text-[20px] font-semibold text-white'>
                    {task.title}
                  </h2>
                </div>

                <p className='text-gray-200 mb-4 text-sm'>
                  تاریخ: {new Date(task.time).toLocaleDateString('fa-IR')}
                </p>

                <div className='border-t border-white/20 pt-4'>
                  <h3 className='font-medium text-white mb-2'>توضیحات:</h3>
                  <ul className='list-disc list-inside space-y-1'>
                    {task.description.map(item => (
                      <li key={item.id} className='text-gray-200 text-sm'>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {sortedTasks?.length === 0 && (
            <div className='text-center text-red-400 mt-8 text-xl'>
              {searchTerm
                ? 'هیچ تسکی با این عنوان یافت نشد'
                : 'هیچ تسکی یافت نشد'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
