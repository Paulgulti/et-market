import { getMyOrders } from '@/sanity/live'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import React from 'react'

const GetTotalOrderForHeader = async () => {
    const { userId } = await auth()
    if (!userId) {
        return null
    }
    const orders = await getMyOrders(userId)
    return (
        <div className='flex'>
            <Link className='mt-3' href="/orders">
                <button className='hover:cursor-pointer relative'>
                    <svg
                        className='w-4 md:w-5 h-4 md:h-5'
                        fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.08 512.08" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="82.944,79.656 34.192,134.84 16,116.328 4.592,127.544 34.816,158.312 94.944,90.248 "></polygon> </g> </g> <g> <g> <rect x="159.44" y="88.936" width="188.032" height="16"></rect> </g> </g> <g> <g> <rect x="159.44" y="136.824" width="352.64" height="16"></rect> </g> </g> <g> <g> <rect x="159.44" y="222.744" width="188.032" height="16"></rect> </g> </g> <g> <g> <rect x="159.44" y="270.632" width="352.64" height="16"></rect> </g> </g> <g> <g> <rect x="159.44" y="356.568" width="188.032" height="16"></rect> </g> </g> <g> <g> <rect x="159.44" y="404.456" width="352.64" height="16"></rect> </g> </g> <g> <g> <path d="M43.248,210.76C19.408,210.76,0,230.472,0,254.68c0,24.208,19.408,43.92,43.248,43.92 c23.856,0,43.264-19.696,43.264-43.92C86.512,230.456,67.104,210.76,43.248,210.76z M43.248,282.6 C28.208,282.6,16,270.072,16,254.68c0-15.392,12.224-27.92,27.248-27.92c15.024,0,27.264,12.528,27.264,27.92 C70.512,270.072,58.288,282.6,43.248,282.6z"></path> </g> </g> <g> <g> <path d="M43.248,344.584C19.408,344.584,0,364.28,0,388.504s19.408,43.92,43.248,43.92c23.856,0,43.264-19.696,43.264-43.92 S67.104,344.584,43.248,344.584z M43.248,416.424c-15.024,0-27.248-12.528-27.248-27.92c0-15.392,12.224-27.92,27.248-27.92 c15.024,0,27.264,12.528,27.264,27.92C70.512,403.896,58.272,416.424,43.248,416.424z"></path> </g> </g> </g>
                    </svg>
                    <span className='absolute -right-2 -top-2 bg-black text-white rounded-full text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center'>
                        {orders ? orders.length : 0}
                        {/* 0 */}
                    </span>
                </button>
            </Link>
        </div>
    )
}

export default GetTotalOrderForHeader
