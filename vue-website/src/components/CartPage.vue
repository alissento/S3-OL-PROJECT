<script setup>
    import { ref, onMounted } from 'vue';
    import { apiURL, auth } from '@/config';
    import { useToast } from "vue-toastification";
    import router from '@/router/index.js';
    import LoadingSpinner from './LoadingSpinner.vue';
    import { useCartStore } from '@/stores/cartStore';
    
    const cartStore = useCartStore();
    const toast = useToast();
    const cartItems = ref([]);
    const totalPrice = ref(0);
    const loading = ref(true);

    async function getUserCart() {
        const user = auth.currentUser;

        if (!user) {
            console.error('User not logged in');
            toast.error('You must be logged in to view your cart');
            router.back();
            return;
        }

        const userId = user.uid;

        try {
            await cartStore.fetchCart(userId, false);
            const data = cartStore.getCart;

            console.log('Data:', data);

            cartItems.value = data;

            if(cartItems.value.length === 0) {
                toast.info('Your cart is empty');
                router.back();
            }

            await cartStore.calculateTotalPrice();
            totalPrice.value = cartStore.getTotalPrice;

        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while loading your cart');
            router.back();
        } finally {
            loading.value = false;
        }
        
    }


    async function clearCart() {
        const user = auth.currentUser;
        const userId = user.uid;
        const fullApiUrl = apiURL+'/clearCart';

        const requestData = {
            user_id: userId
        };

        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }

            toast.success('Cart cleared successfully');
            await cartStore.fetchCart(userId, true);
            router.push('/');

        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while clearing your cart');
        }
    }
    onMounted(() => {
        getUserCart();
    });
</script>

<template>
    <LoadingSpinner v-if="loading" />
    <div v-else id="main_content" class="flex flex-col items-center text-center m-11">
        <h1 class="text-5xl font-bold text-center mb-8">Cart</h1>
        <div class="flex flex-col items-center text-center w-96">
            <div v-for="cartItem in cartItems" :key="cartItem.product_id" class="flex flex-row items-center justify-between w-full border-b-2 border-gray-300">
                <p class="text-2xl">{{ cartItem.productLabel }}</p>
                <p class="text-2xl">{{ cartItem.size }}</p>
                <p class="text-2xl">{{ cartItem.price }}€</p>
            </div>
        </div>
        <p class="text-4xl mt-8">Total Price: {{ totalPrice }}€</p>
        <RouterLink to='/checkout' class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3 flex items-center justify-center">Checkout</RouterLink>
        <button class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3" @click="clearCart">Clear Cart</button>
    </div>
</template>
