'use client'

import { Product } from "@/sanity.types"
import { useCartStore } from "@/lib/store/cart"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import BuyNowButton from "./BuyNowButton"

const AddToCartButton = ({ product }: { product: Product }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [buyNowLoading, setBuyNowLoading] = useState<boolean>(false)
    const { addItem } = useCartStore()
    const { isSignedIn } = useAuth()
    const router = useRouter()

    async function handleAddToCart() {
        setIsLoading(true);
        await addItem(product, 1, isSignedIn)
        toast("Item added to cart");
        setIsLoading(false)
    }
    async function handleBuyNow() {
        setBuyNowLoading(true);
        await addItem(product, 1, isSignedIn)
        router.push('/cart');
        toast("Redirecting to cart");
        setBuyNowLoading(false);
    }

    return (
        <>
            <Button
                onClick={handleAddToCart}
                className='bg-violet-500 hover:bg-violet-700 cursor-pointer py-2 px-3 text-white rounded-md'
                disabled={isLoading}
            >
                {isLoading && <Loader2 className="animate-spin" />}
                Add to cart
            </Button>
            {/* <Button
                onClick={handleBuyNow}
                className='bg-violet-500 hover:bg-violet-700 cursor-pointer py-2 px-3 text-white rounded-md'
                disabled={isLoading}
            >
                {buyNowLoading && <Loader2 className="animate-spin" />}
                Buy now
            </Button> */}
        </>
    )
}

export default AddToCartButton
