'use client'

import { useCartStore } from "@/lib/store/cart"
import { useAuth } from "@clerk/nextjs"
import { useEffect } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/utils"

const CartPage = () => {
    const { items, updateQuantity, removeItem, mergeLocalCartWithDatabase, isLoading } = useCartStore()
    const { isSignedIn } = useAuth()

    useEffect(() => {
        if (isSignedIn) {
            mergeLocalCartWithDatabase()
        }
    }, [isSignedIn])

    // if (!isSignedIn) {
    //     return <div className="container mx-auto py-8">Please sign in to view your cart</div>
    // }

    if (isLoading) {
        return <div className="container mx-auto py-8">Loading cart...</div>
    }

    if (items.length === 0) {
        return <div className="container mx-auto py-8">Your cart is empty</div>
    }

    return (
        <div className="container max-w-[600px] mx-auto py-8 px-3">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            <div className="">
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id || item.product._id} className="flex items-center justify-between gap-4 border p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                {item.product.image && (
                                    <div className="relative w-24 h-24">
                                        <Image
                                            src={urlFor(item.product.image).url()}
                                            alt={item.product.title || 'Product image'}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.product.title}</h3>
                                    <p className="text-gray-600">${item.product.price}</p>
                                </div>

                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1, isSignedIn)}
                                        className="px-2 py-1 border rounded cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product._id, item.quantity + 1, isSignedIn)}
                                        className="px-2 py-1 border rounded cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.product._id, isSignedIn)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-right">
                    <p className="text-xl font-semibold">
                        Total: ${items.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartPage
