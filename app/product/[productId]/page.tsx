import AddToCartButton from '@/components/cart/AddToCartButton'
import { getProductPage } from '@/sanity/live'
import { urlFor } from '@/sanity/utils'
import Image from 'next/image'
import React from 'react'

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {

  const { productId } = await params
  const product = await getProductPage(productId)
  return (
        <div className='container mx-auto py-8'>
            {/* {Bakck to home page sign with product name} */}

            {/* {other promotionl signs} */}

            <div className=' grid grid-cols-1 md:grid-cols-2 gap-8'>
                {product.image && (
                    <div className='flex justify-center'>
                        <div className="relative shadow-lg " style={{ width: 'fit-content', height: 'fit-content' }}>
                            <Image
                                src={urlFor(product.image).url()}
                                alt={product.title || 'Product image'}
                                width={400}
                                height={400}
                                className="object-contain rounded-lg hover:scale-105 transition-transform duration-300 hover:cursor-pointer"

                            />
                        </div>
                    </div>
                )}
                <div className='flex flex-col gap-3'>
                    <h2 className='text-xl font-semibold'>{product.title}</h2>
                    <p>{product.description}</p>
                    <div className='flex items-center gap-4'>
                        <span className='bg-green-600 text-white text-2xl p-3 rounded-lg'>${product.price}</span>
                        <div className='flex flex-col'>
                            <span>You saved $76</span>
                            <span className=' text-red-600 rounded-lg line-through animate-pulse p-2'>$100</span>
                        </div>
                    </div>
                    <div className='flex gap-4 '>
                        <AddToCartButton product={product}/>
                        <button className='bg-violet-500 hover:bg-violet-700 cursor-pointer py-2 px-3 text-white rouded-md'>Buy now</button>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default page
