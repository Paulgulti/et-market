'use client'

import { useCartStore } from "@/lib/store/cart"
import { ProductCategory } from "@/sanity.types"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

const Categories = ({ categories }: { categories: ProductCategory[] }) => {
    const [showCategory, setShowCategory] = useState(false);
    const { toggleMenu } = useCartStore()

    return (
        <div onClick={() => setShowCategory(!showCategory)} className='relative inline-block'>
            <div className='peer group flex items-center gap-2 font-medium text-gray-700 hover:text-gray-900 hover:cursor-pointer'>
                <span className='text-white hover:text-gray-200'>Category</span>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    className='group-hover:rotate-180'
                >
                    <path
                        d="M0.97168 0.757324L5.00001 4.78566L9.02834 0.757324"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className={clsx(
                'absolute top-full left-0 opacity-0 invisible peer-hover:visible peer-hover:opacity-100 hover:visible hover:opacity-100 transition-all duration-100 z-10 ',
                { 'visible opacity-100': showCategory === true },
                { 'invisible opacity-0': showCategory === false },
            )}>
                <div className='w-64 bg-white shadow-xl border border-gray-100 overflow-hidden'>
                    <div className='py-2'>
                        {categories.map(category =>
                            <Link
                                onClick={toggleMenu}
                                key={category._id}
                                href={`/category/${category.slug?.current}`}
                                className='block text-sm px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors duration-100'
                            >
                                {category.title}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
