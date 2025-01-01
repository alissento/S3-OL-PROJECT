<script setup>
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import { auth, apiURL } from '../config.js';
    import { useToast } from "vue-toastification";
    import { useOrdersStore } from '@/stores/ordersStore';
    import LoadingSpinner from './LoadingSpinner.vue';

    const ordersStore = useOrdersStore();
    const route = useRoute();
    const toast = useToast();
    const order = ref(null);

    async function getOrder() {
        const id = route.params.id;
        console.log('Order ID:', id);
        await ordersStore.fetchOrderById(id);
        order.value = ordersStore.getSelectedOrder;
        console.log('Order:', order.value);
    }


    onMounted(() => {
        getOrder();
    });

</script>


<template>
    <LoadingSpinner v-if="!order" />
    <main v-else class="flex justify-center items-start flex-wrap w-full p-6">
        <div class="max-w-4xl w-full bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-4xl font-bold">Order #{{ order.order_id }}</h1>
                <RouterLink 
                    to="/my-orders"
                    class="text-blue-500 hover:underline text-2xl"
                >
                    ← Back to My Orders
                </RouterLink>
            </div>
            
            <div class="mb-6 space-y-2 text-2xl">
                <p class="flex items-center space-x-2">
                    <span class="font-semibold">Date:</span>
                    <span>{{ order.order_date }} | {{ order.order_hour }}</span>
                </p>
                <p class="flex items-center space-x-2">
                    <span class="font-semibold">Shipping address:</span>
                    <span>{{ order.street }}, {{ order.post_code }}, {{ order.city }}, {{ order.country }}</span>
                </p>
                <p class="flex items-center space-x-2">
                    <span class="font-semibold">Status:</span>
                    <span>{{ order.order_status }}</span>
                </p>
                <p class="flex items-center space-x-2">
                    <span class="font-semibold">Total Price:</span>
                    <span>{{ order.total_price }}€</span>
                </p>
            </div>

            <h2 class="text-3xl font-semibold mb-4">Items</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div 
                    v-for="item in order.items" 
                    :key="item.product_id" 
                    class="p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white flex flex-col items-center"
                >
                    <RouterLink :to="{ name: 'productPage', params: { id: item.product_id } }" class="text-center">
                        <img 
                            :src="'/images/' + item.product_id + '.png'" 
                            :alt="item.product_name" 
                            class="h-72 w-72 object-cover mb-4"
                        >
                        <p class="font-bold text-xl">{{ item.product_name }}</p>
                        <p class="text-2xl mt-2">
                            <span class="font-semibold">Price:</span> {{ item.price }}€
                            &nbsp;|&nbsp; 
                            <span class="font-semibold">Size:</span> {{ item.size }}
                        </p>
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>

