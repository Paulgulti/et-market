import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/utils'
import Image from 'next/image'
import React from 'react'
// import { Button } from '../ui/button'
import Link from 'next/link'

type ProductItemProps = {
    product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {   
    
    return (
        <div className='flex flex-col border shadow-xl rounded-lg p-4'>
            <div className='relative w-full h-48'>
                {
                    product.image && (
                        <Image
                            src={urlFor(product.image).url()}
                            alt='product image'
                            fill
                            className='object-contain'
                            loading='lazy'
                        />

                    )
                }
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='line-clamp-2'>{product?.title}</h2>
                <div className='flex gap-2'>
                    <h2>${product.price}</h2>
                    <span className='line-through text-gray-700'>$67</span>
                </div>
            </div>
            <Link 
                className='mt-2 bg-violet-500 hover:cursor-pointer hover:bg-violet-600  text-white rounded-xl py-2 text-center' 
                href={`/product/${product._id}`}
            >Grab</Link>
        </div>
    )
}

export default ProductItem
