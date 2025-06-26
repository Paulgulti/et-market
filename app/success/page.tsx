'use client'

import { useCartStore } from "@/lib/store/cart";
import { Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";

const page = () => {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderNumber');
    const sessionId = searchParams.get('session_id');
    const router = useRouter();
    const { clearCart } = useCartStore()

    useEffect(() => {
        if (!orderNumber && !sessionId) {
            router.push('/')
        } else {
            clearCart();
        }
    }, [orderNumber, sessionId, clearCart])

    return (
        <div className="flex flex-col items-center justify-center py-10 p- bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-[300px] md:max-w-xl bg-white flex-col flex justify-center items-center space-y-4 px-6 py-7 md:py-12 ">
                <div className=" rounded-full h-24 w-24 flex items-center justify-center">
                    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 2C15.431 2 2 15.432 2 32c0 16.568 13.432 30 30 30c16.568 0 30-13.432 30-30C62 15.432 48.568 2 32 2zm-6.975 48l-.02-.02l-.017.02L11 35.6l7.029-7.164l6.977 7.184l21-21.619L53 21.199L25.025 50z" fill="#000000"></path></g></svg>
                </div>
                <div className="flex flex-col">
                    <p className="text-center font-semibold text-lg">Order confirmed!</p>
                    <p className="text-gray-700">Thank you for your purchase. We&apos;re processing your order
                        and we will ship it soon. A confirmation email with your
                        order details will be sent to your inbox shortly.
                    </p>
                    <p className="text-gray-700">
                        Order Number: <span className="text-black font-semibold">{orderNumber}</span>
                    </p>
                </div>
                <div className="bg-gray-50 border-gray-200 rounded-lg p-4 w-full">
                    <h2 className="text-gray-900 font-semibold text-center">What&apos;s next?</h2>
                    <ul className="text-gray-700 text-center">
                        <li>Check your email for order confirmation.</li>
                        <li>We&apos;ll notify you when your order ships.</li>
                        <li>Track your order status anytime.</li>
                    </ul>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Link
                        href={'/'}
                        className="flex flex-col justify-center items-center py-3 px-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-md text-xs"
                    >
                        <Home className="w-5 h-5" /> Home
                    </Link>
                    <Link
                        href={'/orders'}
                        className="flex flex-col justify-center items-center py-3 px-4 bg-white hover:bg-gray-200 text-black border border-black font-semibold rounded-lg transition-all duration-300 shadow-md text-xs" >
                        <Package className="w-5 h-5" /> Orders
                    </Link>
                    <Link
                        href={'/'}
                        className="flex flex-col justify-center items-center py-3 px-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-md text-xs" >
                        <ShoppingBag className="w-5 h-5" /> Shop
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
