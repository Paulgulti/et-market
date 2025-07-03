'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import HeaderSearchBar from '../HeaderSearchBar'
import clsx from 'clsx'
import { ListOrderedIcon } from 'lucide-react'
import { Button } from '../ui/button'

const Header = ({ categorySelector, totalOrder }: { categorySelector: React.ReactNode, totalOrder: React.ReactNode }) => {
    // const [toogleMenu, setToggleMenu] = useState<boolean>(false)
    const [showLogin, setShowLogin] = useState(false)
    const { items, toggleMenu, openedMenu } = useCartStore()
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)

    // function onToggleMenu() {
    //     setToggleMenu(!toogleMenu)
    // }
    // console.log(openedMenu);

    return (
        <header className='bg-violet-500 h-[60px] flex items-center text-white font-semibold'>
            <div className='container mx-auto '>
                <nav className='flex justify-between items-center mx-4'>
                    {openedMenu ? (
                        <svg
                            onClick={toggleMenu}
                            className='w-5 h-5 md:hidden'
                            viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Close</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Close"> <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"> </line> <line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"> </line> </g> </g> </g>
                        </svg>
                        // <button className='w-5 h-5 md:hidden' onClick={onToggleMenu}>x</button>
                    ) : (
                        <svg
                            onClick={toggleMenu}
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
                            'bg-violet-500 opacity-98 md:opacity-100 absolute md:static left-0 top-0 md:w-auto w-full md:min-h-fit  z-99 flex md:items-center px-5 transform-all duration-300',
                            {
                                'top-[-100%] ': openedMenu === false,
                                'top-[60px] min-h-screen': openedMenu === true,
                            }
                        )
                    }>
                        <ul className='flex flex-col md:flex-row gap-6 md:gap-[4vw] md:items-center py-10 md:py-0'>
                            <li
                                onClick={toggleMenu}
                                className='hover:text-gray-200'>
                                <Link href={"/shop"}>Shop</Link>
                            </li>
                            <li
                                onClick={toggleMenu}
                                className='hover:text-gray-200'>
                                <Link href={"/new"}>New</Link>
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
                        <div className='relative'>
                            <SignedOut>
                                <svg
                                    className='w-4 md:w-5 h-4 md:h-5 hover:cursor-pointer md:hidden'
                                    onClick={() => setShowLogin(!showLogin)}
                                    fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-login">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"><path d="M5 1H17V2H18V20H17V21H5V20H4V14H6V19H16V3H6V8H4V2H5V1M8 6H10V7H11V8H12V9H13V10H14V12H13V13H12V14H11V15H10V16H8V14H9V13H10V12H2V10H10V9H9V8H8V6Z"></path></g>
                                </svg>
                                {/* <p onClick={() => setShowLogin(!showLogin)} className='md:hidden'>us</p> */}
                                {showLogin && (
                                    <div
                                        className="fixed inset-0 z-50"
                                        onClick={() => setShowLogin(false)}
                                        style={{ pointerEvents: 'auto' }}
                                    />
                                )}
                                <div
                                    className={clsx(
                                        'flex gap-1.5 flex-col md:flex-row md:gap-3 text-sm',
                                        { 'hidden md:flex': showLogin === false },
                                        { 'absolute flex right-0 top-5 md:static': showLogin === true }
                                    )}
                                    style={{ zIndex: 100 }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div className='bg-white shadow-xl flex flex-col md:flex-row gap-1.5 p-5 md:p-0 rounded-lg md:bg-transparent'>
                                        <Button asChild className='text-xs cursor-pointer'>
                                            <SignInButton />
                                        </Button>
                                        <Button asChild variant={'outline'} className='text-black text-xs cursor-pointer'>
                                            <SignUpButton />
                                        </Button>
                                    </div>
                                </div>
                            </SignedOut>
                        </div>
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
