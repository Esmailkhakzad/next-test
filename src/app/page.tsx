'use client'
import { useTasks } from '@/core/services/api/Home/home.api'
import { FiCheck, FiX } from 'react-icons/fi'

export default function Home () {
  const { data: tasks } = useTasks()

  return (
    <div className='font-sans bg-white'>
      <div className='w-full p-8'>
        <div className='grid gap-6'>
          {tasks?.map(task => (
            <div
              key={task.id}
              className='border-3 text-[#008B8B] bg-[#008B8B] p-6 rounded-lg shadow-md'
            >
              <div className='flex justify-between items-start mb-4'>
                <h2 className='text-[50px] font-semibold text-white'>
                  {task.title}
                </h2>
                <span
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                    task.status ? 'bg-white ' : 'bg-black '
                  }`}
                >
                  {task.status ? (
                    <>
                      <FiCheck size={20} />
                      فعال
                    </>
                  ) : (
                    <>
                      <FiX size={20} />
                      غیر فعال
                    </>
                  )}
                </span>
              </div>

              <p className='text-gray-400 mb-4'>
                تاریخ: {new Date(task.time).toLocaleDateString('fa-IR')}
              </p>

              <div className='border-t  pt-4'>
                <h3 className='font-medium text-white mb-2'> توضیحات :</h3>
                <ul className='list-disc list-inside space-y-1'>
                  {task.description.map(item => (
                    <li key={item.id} className='text-gray-400'>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {tasks?.length === 0 && (
          <div className='text-center text-gray-400 mt-8'>
            هیچ تسکی یافت نشد
          </div>
        )}
      </div>
    </div>
  )
}
