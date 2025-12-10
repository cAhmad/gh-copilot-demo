<template>
  <div>
    <div v-if="isOpen" class="cart-overlay" @click="$emit('close')"></div>
    <div class="cart-drawer" :class="{ 'cart-drawer--open': isOpen }">
      <div class="cart-header">
        <h2>🛒 Shopping Cart</h2>
        <button class="close-btn" @click="$emit('close')" aria-label="Close cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="cart-content">
        <div v-if="cart.length === 0" class="empty-cart">
          <p>Your cart is empty</p>
          <p class="empty-cart-subtitle">Add some albums to get started!</p>
        </div>

        <div v-else class="cart-items">
          <div v-for="(item, index) in cart" :key="`${item.id}-${index}`" class="cart-item">
            <img :src="item.image_url" :alt="item.title" class="cart-item-image" />
            <div class="cart-item-details">
              <h3 class="cart-item-title">{{ item.title }}</h3>
              <p class="cart-item-artist">{{ item.artist }}</p>
              <p class="cart-item-price">${{ item.price.toFixed(2) }}</p>
            </div>
            <button 
              class="remove-btn" 
              @click="$emit('remove-item', item.id)"
              aria-label="Remove item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="cart.length > 0" class="cart-footer">
        <div class="cart-total">
          <span class="total-label">Total:</span>
          <span class="total-amount">${{ totalPrice.toFixed(2) }}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Album } from '../types/album'

interface Props {
  isOpen: boolean
  cart: Album[]
}

const props = defineProps<Props>()

defineEmits<{
  (e: 'close'): void
  (e: 'remove-item', albumId: number): void
}>()

const totalPrice = computed(() => {
  return props.cart.reduce((sum, item) => sum + item.price, 0)
})
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(4px);
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 450px;
  max-width: 90vw;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cart-drawer--open {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  background: #667eea;
  color: white;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
}

.empty-cart p {
  margin: 0;
  font-size: 1.2rem;
}

.empty-cart-subtitle {
  font-size: 1rem;
  margin-top: 0.5rem !important;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.cart-item:hover {
  background: #f0f1f3;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cart-item-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.cart-item-artist {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
}

.cart-item-price {
  margin: 0;
  font-size: 1.125rem;
  font-weight: bold;
  color: #667eea;
  margin-top: auto;
}

.remove-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #999;
  transition: all 0.2s ease;
  align-self: flex-start;
}

.remove-btn:hover {
  color: #ff4757;
  transform: scale(1.1);
}

.cart-footer {
  border-top: 1px solid #e0e0e0;
  padding: 1.5rem;
  background: #f8f9fa;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.total-label {
  font-weight: 600;
  color: #333;
}

.total-amount {
  font-weight: bold;
  color: #667eea;
  font-size: 1.5rem;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .cart-drawer {
    width: 100%;
    max-width: 100vw;
  }

  .cart-item-image {
    width: 60px;
    height: 60px;
  }

  .cart-item-title {
    font-size: 0.9rem;
  }

  .cart-item-artist {
    font-size: 0.8rem;
  }
}
</style>
