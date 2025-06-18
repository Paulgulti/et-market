import ProductGrid from '@/components/Product/ProductGrid'
import { searchProduct } from '@/sanity/live'
import React from 'react'

const page = async ({ searchParams }: { searchParams: Promise<{ query: string }> }) => {

    const { query } = await searchParams
    const products = await searchProduct(query)

    return (
        <div className='container mx-auto'>
            <div className='container mx-auto bg-primary py-4'>
                <p className='text-center text-2xl md:text-3xl font-bold'>
                    Search Results for &quot;{query}&quot; - UP TO 90% OFF! <span className='animate-pulse'>🔥</span>
                </p>
                <p className='text-center text-sidebar-primary-foreground animate-pulse'>
                    Flash Sale Ending Soon ⏰ Limited Time Offer
                </p>
            </div>
            <p className='text-center text-gray-500 text-sm mt-2'>🛍 {products.length} Amazing Deals Available Now!</p>
            <ProductGrid products={products} />
        </div>
    )
}

export default page
