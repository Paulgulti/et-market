'use client'

import { useCartStore } from "@/lib/store/cart"
import { SignInButton, SignUpButton, useAuth, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/utils"
import { createCheckoutSession, MetaData } from "@/lib/actions/stripe-actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const CartPage = () => {
    const [loadingProceed, setLoadingProceed] = useState<boolean>(false)
    const { items, updateQuantity, removeItem, mergeLocalCartWithDatabase, isLoading } = useCartStore()
    const { isSignedIn } = useAuth()
    const { user } = useUser()

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

    async function handleProceedToCheckout() {
        if (loadingProceed) return;
        setLoadingProceed(true);
        try {
            const metadata: MetaData = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            };
            const checkoutUrl = await createCheckoutSession(items, metadata);
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error('error creating checkout:', error)
        } finally {
            setLoadingProceed(false);
        }

    }

    // console.log(items);


    return (
        <div>
            {isSignedIn ? (
                <>
                    {user?.fullName ? (
                        <h2 className="my-2 px-3 text-sm md:text-lg">Welcome <span className="text-gray-700">{user.fullName.split(" ")[0]}</span></h2>
                    ) : (
                        <h2>Welcome User</h2>
                    )}
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                            <svg
                                className="w-16 h-16 text-gray-300 mb-4 animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v7"
                                />
                            </svg>
                            <div className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</div>
                            <div className="text-gray-400 text-sm animate-pulse">Looks like you haven&apos;t added anything yet.</div>
                        </div>
                    ) : (
                        <div className=" max-w-2xl mx-auto my-2 px-3">
                            <h1 className="text-md md:text-xl font-bold mb-4">Your Cart</h1>
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id || item.product._id} className="border p-4 rounded-lg">
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
                                                <div className="flex flex-col gap-2">
                                                    <h3 className="font-semibold">{item.product.title}</h3>
                                                    <div className="flex justify-between ">
                                                        <p className="text-gray-600">${item.product.price}</p>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <div className="flex items-center gap-1">
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
                                                        {/* <div className="">


                                                        </div> */}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex flex-col items-center gap-2">
                                    <p className="text-sm md:text-xl font-semibold">
                                        Total: ${items.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0).toFixed(2)}
                                    </p>
                                    <Button
                                        onClick={handleProceedToCheckout}
                                        className=""
                                        disabled={loadingProceed}
                                    >
                                        {loadingProceed ?
                                            (<div className="flex items-center gap-2">
                                                Proceeding to checkout...
                                                {/* a loading animation here */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-icon lucide-loader"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg>

                                            </div>) :
                                            "Proceed to checkout"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <h3 className="text-center">Et-Market</h3>
                            <CardTitle className="text-center">Welcome Back!</CardTitle>
                            <CardDescription>
                                Login to view your cart items and checkout. Don't miss out on your favourite products.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SignInButton mode="modal">
                                <Button className="w-full hover:cursor-pointer">Sign in</Button>
                            </SignInButton>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <div>Don&apos;t have an account?</div>
                            <SignUpButton>
                                <Button variant={'outline'} className="w-full hover:cursor-pointer">Create an account</Button>
                            </SignUpButton>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );

    // if (items.length === 0) {
    //     return <div className="container mx-auto py-8">Your cart is empty</div>
    // }


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
            <button
                onClick={handleProceedToCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={loadingProceed}
            >
                {loadingProceed ?
                    (<div className="flex items-center gap-2">
                        Proceeding to checkout...
                        {/* a loading animation here */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-icon lucide-loader"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg>

                    </div>) :
                    "Proceed to checkout"}
            </button>
        </div>
    )
}

export default CartPage
