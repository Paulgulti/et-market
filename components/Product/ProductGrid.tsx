import React from 'react'
import ProductItem from './ProductItem'
import { Product } from '@/sanity.types'

type ProductsGridProps = {
    products: Product[]
}

const ProductGrid = ({products}: ProductsGridProps) => {
  return (
    <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {
        products.map(product => 
            <ProductItem 
                key={product._id}
                product={product}
            />
        )
      }
    </div>
  )
}

export default ProductGrid
