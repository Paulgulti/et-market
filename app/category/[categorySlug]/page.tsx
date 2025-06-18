import ProductGrid from '@/components/Product/ProductGrid';
import { getCategorySlug, getProductsByCategorySlug } from '@/sanity/live';
import React from 'react'

const page = async ({params} : { params: Promise<{ categorySlug: string }> }) => {

    const {categorySlug} = await params;
    const [products, category] = await Promise.all([
      getProductsByCategorySlug(categorySlug),
      getCategorySlug(categorySlug)
    ])
  return (
        <div className='container mx-auto'>
            <div className='container mx-auto bg-primary py-4'>
                <p className='text-center text-2xl md:text-3xl font-bold'>
                    {category.title} - UP TO 90% OFF! <span className='animate-pulse'>🔥</span>
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
