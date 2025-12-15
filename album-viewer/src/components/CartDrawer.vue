<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="cart-overlay" @click="$emit('close')"></div>
    </Transition>
    <Transition name="slide">
      <div v-if="isOpen" class="cart-drawer">
        <div class="cart-header">
          <h2>🛒 Your Cart</h2>
          <button class="close-btn" @click="$emit('close')" aria-label="Close cart">
            ✕
          </button>
        </div>

        <div class="cart-content">
          <div v-if="items.length === 0" class="empty-cart">
            <p>Your cart is empty</p>
            <p class="empty-hint">Add some amazing albums!</p>
          </div>

          <div v-else class="cart-items">
            <div v-for="item in items" :key="item.album.id" class="cart-item">
              <img 
                :src="item.album.image_url" 
                :alt="item.album.title"
                class="item-image"
              />
              <div class="item-details">
                <h4 class="item-title">{{ item.album.title }}</h4>
                <p class="item-artist">{{ item.album.artist }}</p>
                <p class="item-price">${{ item.album.price.toFixed(2) }}</p>
              </div>
              <div class="item-quantity">
                <button 
                  class="qty-btn" 
                  @click="updateQuantity(item.album.id, item.quantity - 1)"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button 
                  class="qty-btn" 
                  @click="updateQuantity(item.album.id, item.quantity + 1)"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button 
                class="remove-btn" 
                @click="removeFromCart(item.album.id)"
                aria-label="Remove item"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        <div v-if="items.length > 0" class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span class="total-amount">${{ total.toFixed(2) }}</span>
          </div>
          <button class="checkout-btn">Proceed to Checkout</button>
          <button class="clear-btn" @click="clearCart">Clear Cart</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

defineEmits<{
  close: []
}>()

const cartStore = useCartStore()
const { items, total } = storeToRefs(cartStore)
const { removeFromCart, updateQuantity, clearCart } = cartStore
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 100%;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.empty-hint {
  font-size: 0.9rem;
  color: #999;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 10px;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-artist {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: #666;
}

.item-price {
  margin: 0;
  font-weight: 600;
  color: #667eea;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.qty-value {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.remove-btn:hover {
  opacity: 1;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: #f9f9f9;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.total-amount {
  font-weight: bold;
  color: #667eea;
  font-size: 1.5rem;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.clear-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.75rem;
  background: transparent;
  color: #ff4757;
  border: 1px solid #ff4757;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #ff4757;
  color: white;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
