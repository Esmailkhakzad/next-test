'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useCreateTask } from '@/core/services/api/Home/home.api'
import { useRouter } from 'next/navigation'

interface DescriptionItem {
  id: number
  text: string
}
const AddPage = () => {
  const [title, setTitle] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [descriptions, setDescriptions] = useState<DescriptionItem[]>([])
  const [isActive, setIsActive] = useState(true)
  const createTaskMutation = useCreateTask()
  const router = useRouter()

  const handleAddDescription = () => {
    if (descriptionInput.trim()) {
      const newDescription: DescriptionItem = {
        id: Date.now(),
        text: descriptionInput.trim()
      }
      setDescriptions(prev => [...prev, newDescription])
      setDescriptionInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddDescription()
    }
  }

  const handleRemoveDescription = (id: number) => {
    setDescriptions(prev => prev.filter(item => item.id !== id))
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('لطفا عنوان را وارد کنید')
      return
    }

    if (descriptions.length === 0) {
      toast.error('لطفا حداقل یک توضیح اضافه کنید')
      return
    }

    const taskData = {
      title: title.trim(),
      description: descriptions,
      status: isActive,
      time: new Date().toISOString()
    }

    try {
      await createTaskMutation.mutateAsync(taskData)
      toast.success('تسک با موفقیت ایجاد شد')
      setTitle('')
      setDescriptions([])
      setDescriptionInput('')
      setIsActive(true)
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (error) {
      toast.error('خطا در ارسال داده‌ها')
      console.error('Error:', error)
    }
  }

  return (
    <div className='flex justify-center p-20 bg-gray-50 min-h-screen'>
      <div className='w-[500px] bg-white rounded-lg shadow-xl p-6'>
        <h1 className='text-2xl font-bold text-center mb-6 text-[#008B8B]'>
          ایجاد تسک جدید
        </h1>
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            عنوان تسک
          </label>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008B8B]'
            placeholder='عنوان تسک را وارد کنید...'
            disabled={createTaskMutation.isPending}
          />
        </div>
        <div className='mb-6'>
          <label className='block text-sm  font-medium text-gray-700 mb-2'>
            توضیحات (با Enter اضافه کنید)
          </label>
          <input
            type='text'
            value={descriptionInput}
            onChange={e => setDescriptionInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className='w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008B8B] mb-2'
            placeholder='توضیح را وارد و Enter بزنید...'
            disabled={createTaskMutation.isPending}
          />
          <div className='space-y-2'>
            {descriptions.map(item => (
              <div
                key={item.id}
                className='flex items-center justify-between bg-gray-100 px-3 py-2 rounded'
              >
                <span className='text-gray-700'>{item.text}</span>
                <button
                  onClick={() => handleRemoveDescription(item.id)}
                  className='text-red-500 hover:text-red-700 disabled:opacity-50'
                  disabled={createTaskMutation.isPending}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-6'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={isActive}
              onChange={e => setIsActive(e.target.checked)}
              className='w-4 h-4 text-[#008B8B] focus:ring-[#008B8B] border-gray-300 rounded'
              disabled={createTaskMutation.isPending}
            />
            <span className='mr-2 text-sm font-medium text-gray-700'>
              وضعیت فعال
            </span>
          </label>
        </div>
        <button
          onClick={handleSubmit}
          disabled={createTaskMutation.isPending}
          className='w-full bg-[#008B8B] text-white py-2 px-4 rounded-md hover:bg-[#006666] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#008B8B]'
        >
          {createTaskMutation.isPending ? 'در حال ایجاد...' : 'ایجاد تسک'}
        </button>
        <button
          onClick={() => router.push('/')}
          className='w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500'
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  )
}

export default AddPage
