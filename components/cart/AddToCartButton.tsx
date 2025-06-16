'use client'

import { Product } from "@/sanity.types"
import { useCartStore } from "@/lib/store/cart"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const AddToCartButton = ({ product } : { product: Product }) => {
    const { addItem } = useCartStore()
    const { isSignedIn } = useAuth()
    const router = useRouter()

    async function handleAddToCart() {
        await addItem(product, 1, isSignedIn)
        router.push('/cart')
    }

    return (
        <button
            onClick={handleAddToCart} 
            className='bg-violet-500 hover:bg-violet-700 cursor-pointer py-2 px-3 text-white rounded-md'
        >
            Add to cart
        </button>
    )
}

export default AddToCartButton
