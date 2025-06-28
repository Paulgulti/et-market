"use client";
import { useCartStore } from "@/lib/store/cart"
import { Product } from "@/sanity.types"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

const BuyNowButton = ({ product }: { product: Product }) => {
  const [buyNowLoading, setBuyNowLoading] = useState<boolean>(false)
  const { addItem } = useCartStore()
  const { isSignedIn } = useAuth()
  const router = useRouter()

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
        onClick={handleBuyNow}
        className='bg-violet-500 hover:bg-violet-700 cursor-pointer py-2 px-3 text-white rounded-md'
        disabled={buyNowLoading}
      >
        {buyNowLoading && <Loader2 className="animate-spin" />}
        Buy now
      </Button>
    </>
  )
}

export default BuyNowButton
