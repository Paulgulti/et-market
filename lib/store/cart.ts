import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/sanity.types'
import { syncCart, getCart } from '@/lib/actions/cart'

export interface CartItem {
  id?: string // Optional because guest cart items won't have an ID
  product: Product
  quantity: number,
  cartId?: string
}

interface CartStore {
  items: CartItem[]
  isLoading: boolean
  addItem: (product: Product, quantity?: number, isSignedIn?: boolean) => Promise<void>
  removeItem: (productId: string, isSignedIn?: boolean) => Promise<void>
  updateQuantity: (productId: string, quantity: number, isSignedIn?: boolean) => Promise<void>
  clearCart: (isSignedIn?: boolean) => Promise<void>
  loadCart: () => Promise<void>
  syncWithDatabase: () => Promise<void>
  mergeLocalCartWithDatabase: () => Promise<void>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      loadCart: async () => {
        set({ isLoading: true })
        try {
          const { items } = await getCart()
          set({ items })
        } catch (error) {
          console.error('Error loading cart:', error)
        } finally {
          set({ isLoading: false })
        }
      },

      mergeLocalCartWithDatabase: async () => {
        const localItems = get().items
        if (localItems.length === 0) {
          await get().loadCart()
          return
        }

        set({ isLoading: true })
        try {
          // Get database cart
          const { items: dbItems } = await getCart()
          
          // Merge local and database items
          const mergedItems = [...localItems]
          
          // Add database items that don't exist in local cart
          dbItems.forEach(dbItem => {
            const existingItem = mergedItems.find(
              item => item.product._id === dbItem.product._id
            )
            if (!existingItem) {
              mergedItems.push(dbItem)
            }
          })

          // Update the store with merged items
          set({ items: mergedItems })
          
          // Sync merged cart to database
          await get().syncWithDatabase()
        } catch (error) {
          console.error('Error merging carts:', error)
        } finally {
          set({ isLoading: false })
        }
      },
      
      addItem: async (product: Product, quantity = 1, isSignedIn = false) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            items: [...state.items, { product, quantity }],
          }
        })

        // Only sync with database if user is authenticated
        if (isSignedIn) {
          await get().syncWithDatabase()
        }
      },

      removeItem: async (productId: string, isSignedIn = false) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }))

        // Only sync with database if user is authenticated
        if (isSignedIn) {
          await get().syncWithDatabase()
        }
      },

      updateQuantity: async (productId: string, quantity: number, isSignedIn = false) => {
        if (quantity <= 0) {
          await get().removeItem(productId, isSignedIn)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        }))

        // Only sync with database if user is authenticated
        if (isSignedIn) {
          await get().syncWithDatabase()
        }
      },

      clearCart: async (isSignedIn = false) => {
        set({ items: [] })
        // Only sync with database if user is authenticated
        if (isSignedIn) {
          await get().syncWithDatabase()
        }
      },

      syncWithDatabase: async () => {
        const { items } = get()
        
        try {
          const result = await syncCart(
            items.map(item => ({
              productId: item.product._id,
              quantity: item.quantity
            }))
          )

          if (!result.success) {
            throw new Error(result.error || 'Failed to sync cart')
          }
        } catch (error) {
          console.error('Error syncing cart:', error)
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
) 