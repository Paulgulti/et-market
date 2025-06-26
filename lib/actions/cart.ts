'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { userAuth } from '@/lib/userAuth'
import { getProductPage } from '@/sanity/live'
import { Product } from '@/sanity.types'

export async function syncCart(items: { productId: string; quantity: number }[]) {
  try {
    const user = await userAuth()
    if (!user) {
      throw new Error('Unauthorized')
    }

    // Get or create cart
    const cart = await prisma.cart.upsert({
      where: { userId: user.id },
      create: { userId: user.id },
      update: {},
    })

    // Delete existing cart items
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    // Create new cart items
    await prisma.cartItem.createMany({
      data: items.map((item) => ({
        cartId: cart.id,
        productId: item.productId,
        quantity: item.quantity,
      })),
    })

    return { success: true }
  } catch (error) {
    console.error('Error syncing cart:', error)
    return { success: false, error: 'Failed to sync cart' }
  }
}

export async function getCart() {
  try {
    const user = await userAuth()
    if (!user) {
      return { items: [] }
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: true
      }
    })

    if (!cart) {
      return { items: [] }
    }

    // Fetch product details from Sanity for each cart item
    const items = await Promise.all(
      cart.items.map(async (item) => {
        const product = await getProductPage(item.productId)
        return {
          id: item.id,
          product,
          quantity: item.quantity,
          cartId: item.cartId,
        }
      })
    )

    return { items }
  } catch (error) {
    console.error('Error fetching cart:', error)
    return { items: [] }
  }
} 