import React from 'react'
import Form from 'next/form'

const HeaderSearchBar = () => {
  return (
    <Form action='/search'>
            <div className='relative '>
                <div className='absolute pl-2 inset-y-0 flex items-center'>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className='h-4 w-4 '
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
                    </svg>
                </div>
                <input
                    name='query'
                    type='text'
                    className='border max-w-[200px] border-gray-200 rounded-md pl-8 pr-2 py-1 focus:ring-black focus:ring-1 focus:border-transparent transition-colors'
                />
            </div>
    </Form>
  )
}

export default HeaderSearchBar
