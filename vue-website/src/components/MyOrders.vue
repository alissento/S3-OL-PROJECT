<script setup>
    import { onMounted, ref } from 'vue';
    import { api, auth } from '@/config';
    import { useToast } from "vue-toastification";
    import router from '@/router';
    
    const toast = useToast();
    const orders = ref([]);
    const loading = ref(true);

    async function getOrders() {
        const user = auth.currentUser;
        if (!user) {
            console.error('User not logged in');
            return;
        }

        const userId = user.uid;
        try {
            const response = await api.get(`/getOrders?user_id=${userId}`);

            const data = await response.data;
            console.log('Data:', data);

            if (data.length === 0) {
                toast.info('You have no orders');
                router.back();
                return;
            }

            orders.value = data;

        } catch (error) {
            console.error('Error:', error);
        } finally {
            loading.value = false;
        }
    }

    onMounted(() => {
        getOrders();
    });
</script>

<template>
    <main class="flex flex-col items-center text-center m-11">
        <h1 class="text-5xl font-bold text-center mb-8">My Orders</h1>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
            <div 
                v-for="order in orders" 
                :key="order.order_id" 
                class="p-4 text-2xl border rounded shadow hover:shadow-lg transition"
            >
                <h2 class="font-bold">Order #{{ order.order_id }}</h2>
                <p><strong>Date:</strong> {{ order.order_date }}</p>
                <p><strong>Status:</strong> {{ order.order_status }}</p>
                <button 
                    class="mt-3 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                >
                    View Details
                </button>
            </div>
        </div>
    </main>
</template>
