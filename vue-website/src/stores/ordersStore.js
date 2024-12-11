import { defineStore } from 'pinia';
import { api } from '@/config';

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [],
        selectedOrder: null,
    }),
    actions: {
        async fetchOrders(userId, refresh) {

            if (this.orders.length > 0 && !refresh) {
                return;
            }

            try {
                const response = await api.get(`/getOrders?user_id=${userId}`);
                this.orders = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchOrderById(orderId) {
            try {
                const order = this.orders.find((order) => order.order_id === orderId)
                if (order) {
                    this.selectedOrder = order;
                    return;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async clearOrders() {
            this.orders = [];
            this.selectedOrder = null;
        }
    },
    getters: {
        getOrders: (state) => state.orders,
        getSelectedOrder: (state) => state.selectedOrder,
    },
});