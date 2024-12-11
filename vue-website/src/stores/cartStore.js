import { defineStore } from 'pinia';
import { api } from '@/config';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
        totalPrice: 0,
    }),
    actions: {
        async fetchCart(userId, refresh) {
            if (this.cart.length > 0 && !refresh) {
                return;
            }

            try {
                const response = await api.get(`/loadCart?user_id=${userId}`);
                this.cart = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async calculateTotalPrice() {
            let cartItems = this.cart;

            this.totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
        },
        async clearCart() {
            this.cart = [];
            this.totalPrice = 0
        }
    },
    getters: {
        getCart: (state) => state.cart,
        getTotalPrice: (state) => state.totalPrice,
    },
});