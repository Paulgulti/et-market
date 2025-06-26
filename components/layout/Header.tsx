'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { useCartStore } from '@/lib/store/cart'
import HeaderSearchBar from '../HeaderSearchBar'

const Header = ({ categorySelector }: { categorySelector: React.ReactNode }) => {
    const items = useCartStore((state) => state.items)
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)

    return (
        <header className='bg-gray-100 '>
            <div className='flex justify-between items-center container mx-auto py-2 px-4'>
                <button className='md:hidden hover:cursor-pointer' >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className='w-5 h-5 '
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <path d="M5 7H19" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 12L19 12" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 17L19 17" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                    </svg>
                </button>
                <nav className='hidden md:flex gap-4 lg:gap-6 text-sm font-medium'>
                    <Link href="/">Shop</Link>
                    <Link href="/new-arrival">New Arrival</Link>
                    {categorySelector}
                </nav>
                {/* <Link href="#" >link</Link> */}
                <HeaderSearchBar />
                <div className='flex items-center gap-2 sm:gap-4'>
                    {/* <button >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className='w-5 h-5 hover:cursor-pointer'
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                        </svg>
                    </button> */}
                    <SignedOut>
                        <SignInButton/>
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <Link href="/cart">
                        <button className='hover:cursor-pointer relative'>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className='w-5 h-5'
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
                            </svg>
                            <span className='absolute -right-2 -top-2 bg-black text-white rounded-full text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center'>
                                {totalItems}
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
