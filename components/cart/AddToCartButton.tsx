'use client'

import { Product } from "@/sanity.types"


const AddToCartButton = ({ product } : { product: Product }) => {

    function handleAddToCart() {

    }


  return (
    <button
      onClick={handleAddToCart} 
      className='bg-violet-500 hover:bg-violet-700 cursor-pointer py-2 px-3 text-white rouded-md'>Add to cart</button>
  )
}

export default AddToCartButton
