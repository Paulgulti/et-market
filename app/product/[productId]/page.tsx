import AddToCartButton from '@/components/cart/AddToCartButton'
import BuyNowButton from '@/components/cart/BuyNowButton'
import { getProductPage } from '@/sanity/live'
import { urlFor } from '@/sanity/utils'
import { ArrowBigRightIcon, ArrowRight, HomeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {

    const { productId } = await params
    const product = await getProductPage(productId)
    return (
        <div className='container mx-auto my-4 px-3'>
            {/* {Bakck to home page sign with product name} */}
            <div className='flex items-center'>
                <HomeIcon className='w-4 h-4 text-gray-600' />
                <svg
                    className='w-5 h-5 '
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#4b5563"></path> </g>
                </svg>
                <p className='text-sm'>Product</p>
                <svg
                    className='w-5 h-5 '
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#4b5563"></path> </g>
                </svg>
                <p className='text-sm truncate'>{product.title}</p>
            </div>
            {/* {other promotionl signs} */}

            <div className=' grid grid-cols-1 md:grid-cols-2 gap-8 mt-3'>
                {product.image && (
                    <div className='flex justify-center'>
                        <div className="relative shadow-lg " style={{ width: 'fit-content', height: 'fit-content' }}>
                            <Image
                                src={urlFor(product.image).url()}
                                alt={product.title || 'Product image'}
                                width={250}
                                height={250}
                                className="object-contain rounded-lg hover:scale-105 transition-transform duration-300 hover:cursor-pointer"

                            />
                        </div>
                    </div>
                )}
                <div className='flex flex-col gap-3 '>
                    <h2 className='text-md md:text-xl font-semibold'>{product.title}</h2>
                    <p className='text-sm text-gray-700 md:text-lg'>{product.description}</p>
                    <div className='flex items-center gap-4'>
                        <span className='border  font-semibold text-lg py-1 px-2 rounded-lg shadow-2xl'>${product.price}</span>
                        <p className='text-gray-600 text-sm md:text-lg '>Hot offer ends soon <span className='animate-pulse'>🔥</span></p>
                        {/* <div className='flex flex-col'>
                            <span>You saved $76</span>
                            <span className=' text-red-600 rounded-lg line-through animate-pulse p-2'>$100</span>
                        </div> */}
                    </div>
                    <div className='flex gap-4 '>
                        <AddToCartButton product={product} />
                        {/* <BuyNowButton product={product} /> */}
                        <BuyNowButton product={product} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page
