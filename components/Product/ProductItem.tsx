import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/utils'
import Image from 'next/image'
import React from 'react'
// import { Button } from '../ui/button'
import Link from 'next/link'
import { Button } from '../ui/button'
import AddToCartButton from '../cart/AddToCartButton'

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
                            sizes='w-full h-48'
                            className='object-contain'
                            loading='lazy'
                        />

                    )
                }
            </div>
            <div className='flex flex-col mb-3'>
                <h2 className='line-clamp-2'>{product?.title}</h2>
                <div className='flex justify-between text-center'>
                    <h2>${product.price}</h2>
                    <Link href={`/product/${product._id}`} className='text-sm underline text-gray-700 hover:text-gray-900'>
                        Show detail
                    </Link>
                    {/* <Link
                        className='rounded-xl py-2 text-sm'
                        href={`/product/${product._id}`}
                    >Grab</Link> */}
                    {/* <span className='line-through text-gray-700'>$67</span> */}
                </div>
            </div>
            <AddToCartButton product={product}/>
        </div>
    )
}

export default ProductItem
