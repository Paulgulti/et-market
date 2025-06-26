'use server';
import { getCart } from "./cart";
import { CartItem } from "../store/cart";
import { userAuth } from "../userAuth";
import { urlFor } from "@/sanity/utils";
import { stripe } from "../stripe";
import Stripe from "stripe";

export interface MetaData {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

interface CartItems {
    products: CartItem['product'],
    quantity: number
}

export const createCheckoutSession = async (items: CartItem[], metadata: MetaData) => {
    try {
        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        })
        const customerId = customers.data.length > 0 ? customers.data[0].id : "";
        const sessionPayload: Stripe.Checkout.SessionCreateParams = {
            metadata: {
                orderNumber: metadata.orderNumber,
                customerName: metadata.customerName,
                customerEmail: metadata.customerEmail,
                clerkUserId: metadata.clerkUserId,
            },
            mode: 'payment',
            allow_promotion_codes: true,
            payment_method_types: ['card'],
            invoice_creation: {
                enabled: true,
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
            line_items: items.map(item => ({
                price_data: {
                    currency: 'USD',
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.title || 'Unnamed product',
                        description: item.product.description,
                        metadata: { id: item.product._id },
                        images: item.product.image && [urlFor(item.product.image).url()]
                    },
                },
                quantity: item.quantity
            }))
        };

        if (customerId) {
            sessionPayload.customer = customerId;
        } else {
            sessionPayload.customer_email = metadata.customerEmail;
        }
        const session = await stripe.checkout.sessions.create(sessionPayload);
        return session.url
    } catch (error) {
        console.error('Error creating checkout session:', error)
        throw error;
    }
}


// export const createCheckoutSession = async (items: CartItem[]) => {
//     const user = await userAuth()
//     const cart = await getCart()

//     const totalPrice = items.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);

//     const session = await stripe.checkout.sessions.create({
//         mode: "payment",
//         line_items: items.map(item => ({
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: item.product.title || 'Product',
//                     images: item.product.image ? [urlFor(item.product.image).url()] : [],
//                 },
//                 unit_amount: item.product.price ? item.product.price * 100 : 0,
//             },
//             quantity: item.quantity,
//         })),
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL!}`,
//         // customer_email: user?.email,
//         ...(user?.email ? { customer_email: user.email } : {}),
//         metadata: {
//             userId: user?.id?.toString() || "-",
//         },
//         shipping_address_collection: {
//             allowed_countries: ['US']
//         },
//         shipping_options: [
//             {
//                 shipping_rate_data: {
//                     type: "fixed_amount",
//                     fixed_amount: {
//                         currency: "usd",
//                         amount: totalPrice >= 15 ? 0 : 5 * 100,
//                     },
//                     display_name: totalPrice >= 15 ? "Free shipping!" : "Standard shipping",
//                     delivery_estimate: {
//                         minimum: {
//                             unit: "business_day",
//                             value: 3,
//                         },
//                         maximum: {
//                             unit: "business_day",
//                             value: 5,
//                         }
//                     },
//                 }
//             }
//         ]
//     })

//     // Return the session URL so the frontend can redirect the user
//     if(!session.url) {
//         throw new Error("Failed to create checkout session")
//     }
//     return session.url;
// }