<script setup>
    import { ref } from 'vue';
    import { api, auth } from '@/config.js';
    import { useToast } from "vue-toastification";
    import router from '@/router/index.js';
    import { useOrdersStore } from '@/stores/ordersStore';
    import { useCartStore } from '@/stores/cartStore';
    import { onMounted } from 'vue';
    import LoadingSpinner from './LoadingSpinner.vue';
    import { useUserStore } from '@/stores/userStore.js';

    const userStore = useUserStore();
    const cartStore = useCartStore();
    const ordersStore = useOrdersStore();
    const loading = ref(true);
    const toast = useToast();
    const street = ref('');
    const postCode = ref('');
    const city = ref('');
    const country = ref('');
    const phoneNumber = ref('');
    const cardNumber = ref('');
    const expiryDate = ref('');
    const cvv = ref('');
    const totalPrice = ref(null);

    async function pay() {
        const user = auth.currentUser;
        if (!user) {
            toast.error('You must be logged in to pay');
            return;
        }
        const userId = user.uid;

        if (!street.value || !postCode.value || !city.value || !country.value || !phoneNumber.value || !cardNumber.value || !expiryDate.value || !cvv.value) {
            toast.error('Please fill in all fields');
            return;
        }

        const requestData = {
            user_id: userId,
            street: street.value,
            post_code: postCode.value,
            city: city.value,
            country: country.value,
            phone_number: phoneNumber.value
        };

        try {
            const response = await api.post('/checkout', requestData);
            console.log('Payment successful');
            toast.success('Payment successful!');
            await ordersStore.fetchOrders(userId, true);
            await cartStore.clearCart();
            router.push('/my-orders');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function calculateTotalPrice() {
        await cartStore.calculateTotalPrice();
        totalPrice.value = cartStore.getTotalPrice;
        console.log('Total price:', totalPrice.value);
    }


    async function populateInputs() {
        const user = auth.currentUser;

        if (!user) {
            console.error('User not logged in');
            return;
        }

        await userStore.fetchUserData(user.uid);
        const data = userStore.getUserData;

        if (data.street) street.value = data.street;
        if (data.post_code) postCode.value = data.post_code;
        if (data.city) city.value = data.city;
        if (data.country) country.value = data.country;
        if (data.phone_number) phoneNumber.value = data.phone_number;
    }

    onMounted(() => {
        calculateTotalPrice();
        populateInputs();
        loading.value = false;
    });
</script>

<template>
    <LoadingSpinner v-if="loading" />
    <div v-else id="main_content" class="flex flex-col items-center text-center m-11">
        <h1 class="text-5xl font-bold text-center mb-8">Checkout</h1>
        <div class="flex justify-between w-full">
            <div class="w-1/2 pr-8">
                <h2 class="text-center text-4xl mb-4">Your details</h2>
                <input v-model="street" type="text" class="w-[75%] h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Street name">
                <input v-model="postCode" type="text" class="w-[75%] h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Post code">
                <input v-model="city" type="text" class="w-[75%] h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="City">
                <input v-model="country" type="text" class="w-[75%] h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Country">
                <input v-model="phoneNumber" type="text" class="w-[75%] h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Phone number">
            </div>
            <div class="w-1/2 pl-8">
                <h2 class="text-center text-4xl mb-4">Payment details</h2>
                <input v-model="cardNumber" type="text" class="w-[75%] h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Card number">
                <input v-model="expiryDate" minlength="5" maxlength="5" type="text" pattern="\d{2}/\d{2}" class="w-[75%] h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="MM/YY">
                <input v-model="cvv" type="text" minlength="3" maxlength="3" pattern="\d*" class="w-[75%] h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="CVV">
            </div>
        </div>
        <h2 class="text-center text-4xl mt-16">Total order price: {{ totalPrice }}€</h2>
        <button class="mt-12 w-96 h-12 text-3xl bg-blue-500 text-white rounded-lg cursor-pointer" @click="pay">Pay</button>
    </div>
</template>