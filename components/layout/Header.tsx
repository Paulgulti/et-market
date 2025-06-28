'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import HeaderSearchBar from '../HeaderSearchBar'
import clsx from 'clsx'
import { ListOrderedIcon } from 'lucide-react'

const Header = ({ categorySelector, totalOrder }: { categorySelector: React.ReactNode, totalOrder: React.ReactNode }) => {
    const [toogleMenu, setToggleMenu] = useState<boolean>(false)
    const items = useCartStore((state) => state.items)
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)

    function onToggleMenu() {
        setToggleMenu(!toogleMenu)
    }
    return (
        <header className='bg-violet-500 h-[40px] text-white font-semibold'>
            <div className='container mx-auto '>
                <nav className='flex justify-between items-center mx-4'>
                    {toogleMenu ? (
                        <svg
                            onClick={onToggleMenu}
                            className='w-5 h-5 md:hidden'
                            viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Close</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Close"> <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"> </line> <line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"> </line> </g> </g> </g>
                        </svg>
                        // <button className='w-5 h-5 md:hidden' onClick={onToggleMenu}>x</button>
                    ) : (
                        <svg
                            onClick={onToggleMenu}
                            viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"
                            className='w-5 h-5 md:hidden'
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> <path d="M5 7H19" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 12L19 12" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 17L19 17" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                        </svg>

                    )}
                    <div className={
                        clsx(
                            'bg-violet-500 opacity-98 md:opacity-100 absolute md:static left-0 md:w-auto w-full md:min-h-fit min-h-[30vh] z-99 flex md:items-center px-5 transform-all duration-300',
                            {
                                'top-[-100%] ': toogleMenu === false,
                                'top-[40px] ': toogleMenu === true,
                            }
                        )
                    }>
                        <ul className='flex flex-col md:flex-row gap-6 md:gap-[4vw] md:items-center py-10 md:py-0'>
                            <li className='hover:text-gray-200'>
                                <Link href={"/"}>Shop</Link>
                            </li>
                            <li className='hover:text-gray-200'>
                                <Link href={"/"}>New</Link>
                            </li>
                            <li>{categorySelector}</li>
                        </ul>
                    </div>
                    <div className=''>
                        <HeaderSearchBar />
                    </div>
                    <div className='flex items-center gap-2 md:gap-4'>
                        <div className='flex items-center gap-3 md:gap-4'>
                            <Link className='mt-3' href="/cart">
                                <button className='hover:cursor-pointer relative'>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        className='w-4 md:w-5 h-4 md:h-5'
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
                            <div>{totalOrder}</div>

                        </div>
                        <SignedOut>
                            <div className='flex flex-col md:flex-row md:gap-3 text-sm'>
                                <SignInButton />
                                <SignUpButton />
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </nav>

            </div>
        </header>
        // <header className='bg-gray-100 '>
        //     <div className=' flex justify-between items-center container mx-auto py-2 px-4'>
        //         <button className='peer group md:hidden hover:cursor-pointer peer' >
        //             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        //                 className='w-5 h-5 '
        //             >
        //                 <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        //                 <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        //                 <g id="SVGRepo_iconCarrier"> <path d="M5 7H19" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 12L19 12" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5 17L19 17" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> </g>
        //             </svg>
        //         </button>
        //         <nav className='hidden md:flex gap-4 lg:gap-6 text-sm font-medium'>
        //             <Link href="/">Shop</Link>
        //             <Link href="/new-arrival">New Arrival</Link>
        //             {categorySelector}
        //         </nav>
        //         {/* <Link href="#" >link</Link> */}
        //         <HeaderSearchBar />
        //         <div className='flex items-center gap-2 sm:gap-4'>
        //             {/* <button >
        //                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        //                     className='w-5 h-5 hover:cursor-pointer'
        //                 >
        //                     <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        //                     <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        //                     <g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
        //                 </svg>
        //             </button> */}
        //             <SignedOut>
        //                 <SignInButton/>
        //                 <SignUpButton />
        //             </SignedOut>
        //             <SignedIn>
        //                 <UserButton />
        //             </SignedIn>
        //             <Link href="/cart">
        //                 <button className='hover:cursor-pointer relative'>
        //                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        //                         className='w-5 h-5'
        //                     >
        //                         <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        //                         <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        //                         <g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
        //                     </svg>
        //                     <span className='absolute -right-2 -top-2 bg-black text-white rounded-full text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center'>
        //                         {totalItems}
        //                     </span>
        //                 </button>
        //             </Link>
        //         </div>
        //     </div>
        // </header>
    )
}

export default Header
