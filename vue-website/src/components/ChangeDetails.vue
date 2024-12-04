<script setup>
    import { ref } from 'vue';
    import { auth } from '@/config';
    import { useToast } from "vue-toastification";
    import router from '@/router/index.js';
    import { apiURL } from '@/config';

    const toast = useToast();
    const firstName = ref('');
    const lastName = ref('');
    const street = ref('');
    const postCode = ref('');
    const city = ref('');
    const country = ref('');
    const phoneNumber = ref('');

    async function updateDetails() {
        const user = auth.currentUser;
        const fullApiUrl = apiURL + '/storeUserData';

        if (firstName.value.length <= 1 || lastName.value.length <= 1 || street.value.length <= 1 || postCode.value.length <= 1 || city.value.length <= 1 || country.value.length <= 1 || phoneNumber.value.length <= 1) {
            toast.error("Please don't leave any fields empty");
            return;
        }

        const requestData = {
            user_id: user.uid,
            first_name: firstName.value,
            last_name: lastName.value,
            street: street.value,
            post_code: postCode.value,
            city: city.value,
            country: country.value,
            phone_number: phoneNumber.value
        };

        try {
            const response = await fetch(`${fullApiUrl}?operation=update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            console.log('Data stored successfully');
            toast.success('Details updated successfully');
            router.push('/user');
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>

<template>
    <main class="flex flex-col items-center text-center m-11">
        <h1 class="text-5xl font-bold text-center mb-8">Change details</h1>
        <input v-model="firstName" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="First name">
        <input v-model="lastName" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Last name">
        <input v-model="street" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Street name">
        <input v-model="postCode" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Post Code">
        <input v-model="city" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="City">
        <input v-model="country" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Country">
        <input v-model="phoneNumber" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Phone number">
        <button type="button" @click="updateDetails" class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3">Change details</button>
    </main>
</template>