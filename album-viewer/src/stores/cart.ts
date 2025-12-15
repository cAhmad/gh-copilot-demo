import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Album } from '../types/album'
import type { CartItem } from '../types/cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.album.price * item.quantity, 0)
  })

  function addToCart(album: Album): void {
    const existingItem = items.value.find(item => item.album.id === album.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ album, quantity: 1 })
    }
  }

  function removeFromCart(albumId: number): void {
    const index = items.value.findIndex(item => item.album.id === albumId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(albumId: number, quantity: number): void {
    const item = items.value.find(item => item.album.id === albumId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(albumId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart(): void {
    items.value = []
  }

  return {
    items,
    itemCount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
