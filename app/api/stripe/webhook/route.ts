
// import { createClient } from "next-sanity";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { prisma } from "@/lib/prisma";
// import { getProductPage } from "@/sanity/live";
// import { v4 as uuidv4 } from 'uuid';

import { MetaData } from "@/lib/actions/stripe-actions";
import { backendClient } from "@/lib/backendClient";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
        return NextResponse.json(
            { error: 'No signature' },
            { status: 400 }
        )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
    if (!webhookSecret) {
        console.log('stripe webhook secret not set');
        return NextResponse.json(
            { error: 'Stripe webhook secret is not set.' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            body, sig, webhookSecret
        )
    } catch (error) {
        console.error('Webhook signature verification failed', error);
        return NextResponse.json(
            { error: `Webhook Error: ${error}` },
            { status: 400 }
        );
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const invoice = session.invoice ? 
            await stripe.invoices.retrieve(session.invoice as string)
            : null;
        try {
            await createOrderInSanity(session, invoice)
        } catch (error) {
            console.error('Error creating order in sanity');
            return NextResponse.json(
                { error: `Error creating order: ${error}` },
                { status: 400 }
            )
        }
    }
    
    return NextResponse.json({ received: true });
}

async function createOrderInSanity(
    session: Stripe.Checkout.Session,
    invoice: Stripe.Invoice | null
) {
    const { id, amount_total, currency, metadata, 
        payment_intent, total_details } = session;
    const { orderNumber, customerName, 
        customerEmail,clerkUserId } = metadata as unknown as MetaData;
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id, { expand: ['data.price.product'] }
    )

    //Creating sanity product reference
    const sanityProducts = lineItemsWithProduct.data.map((item) =>({
        _key: crypto.randomUUID(),
        product: {
            _type: 'reference',
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item?.quantity || 0,
    }));
    const order = await backendClient.create({
        _type: 'order',
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customerEmail,
        email: customerEmail,
        currency,
        clerkUserId,
        amountDiscount: total_details?.amount_discount ?
            total_details?.amount_discount / 100
            : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: 'paid',
        orderDate: new Date().toISOString(),
        invoice: invoice ? { id: invoice.id,
            number: invoice.number,
            hosted_invoice_url: invoice.hosted_invoice_url
         } : null,
    });

    return order
}

// export async function POST(req: Request) {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//         apiVersion: "2025-05-28.basil"
//     });
    
//     const webhooksecret = process.env.STRIPE_WEBHOOK_SECRET!;
    
//     const client = createClient({
//         projectId: "dqgmntrx",
//         dataset: "production",
//         apiVersion: "2024-01-01",
//         token: process.env.SANITY_API_WRITE_TOKEN,
//     });

//     try {
//         const body = await req.text();
//         const headerList = await headers();
//         const signature = headerList.get("stripe-signature");

//         if (!signature) {
//             return NextResponse.json(
//                 {error: "No signature found"},
//                 {status: 400}
//             );
//         }

//         let event: Stripe.Event;
//         try {
//             event = stripe.webhooks.constructEvent(
//                 body,
//                 signature,
//                 webhooksecret
//             )
//         } catch (error) {
//             return NextResponse.json(
//                 {error: "Invalid signature"},
//                 {status: 400}
//             );
//         }
//         switch (event.type) {
//             case 'checkout.session.completed': {
//                 const session = event.data.object as Stripe.Checkout.Session;
//                 // Retrieve line items
//                 const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
//                 // Map line items to Sanity product references
//                 const orderItems = await Promise.all(
//                     lineItems.data.map(async (item) => {
//                         // Stripe product/price id is in item.price.product
//                         const productId = item.price?.product as string;
//                         // Try to find the Sanity product by Stripe product id (assume mapping by title for now)
//                         // In a real app, store the mapping in metadata or DB
//                         const products = await getProductPage(productId); // This may need to be adjusted
//                         return {
//                             _key: uuidv4(),
//                             _type: 'orderItem',
//                             product: {
//                                 _type: 'reference',
//                                 _ref: productId,
//                             },
//                             quantity: item.quantity,
//                             price: item.price?.unit_amount ? item.price.unit_amount / 100 : undefined,
//                         };
//                     })
//                 );
//                 // Build shipping address if available
//                 let shippingAddress = undefined;
//                 // @ts-ignore: Stripe webhook event object may use snake_case
//                 if (session.shipping_details?.address) {
//                     // @ts-ignore
//                     const addr = session.shipping_details.address;
//                     shippingAddress = {
//                         _type: 'shippingAddress',
//                         // @ts-ignore
//                         name: session.shipping_details.name,
//                         line1: addr.line1,
//                         line2: addr.line2,
//                         city: addr.city,
//                         state: addr.state,
//                         postalCode: addr.postal_code,
//                         country: addr.country,
//                     };
//                 }
//                 // Create order in Sanity
//                 await client.create({
//                     _type: 'order',
//                     orderDate: new Date().toISOString(),
//                     customerEmail: session.customer_email,
//                     stripeCheckoutSessionId: session.id,
//                     stripePaymentIntentId: session.payment_intent as string,
//                     totalPrice: session.amount_total ? session.amount_total / 100 : undefined,
//                     shippingAddress,
//                     orderItems,
//                     status: 'PROCESSING',
//                 });
//                 // Attempt to clear the user's cart if possible
//                 if (session.metadata?.userId) {
//                     // Find the user's cart and clear it
//                     const userId = session.metadata.userId;
//                     const cart = await prisma.cart.findUnique({ where: { userId } });
//                     if (cart) {
//                         await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
//                     }
//                 }
//                 return NextResponse.json({ received: true });
//             }
                
//             default:
//                 break;
//         }
//     } catch (error) {
//         console.error('Webhook error:', error);
//         return NextResponse.json(
//             { error: 'Webhook handler failed' }, 
//             { status: 500 }
//         );
//     }
// }
