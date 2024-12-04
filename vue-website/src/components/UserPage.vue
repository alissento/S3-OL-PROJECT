<script setup>
    import { onMounted } from 'vue';
    import { apiURL, auth } from '@/config';
    import { signOut } from 'firebase/auth';
    import { ref } from 'vue';
    import { useToast } from "vue-toastification";
    import router from '@/router/index.js';
    import LoadingSpinner from './LoadingSpinner.vue';
    
    const toast = useToast();
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const street = ref('');
    const postCode = ref('');
    const city = ref('');
    const country = ref('');
    const phoneNumber = ref('');
    const loading = ref(true);

    async function getUserData() {
        const user = auth.currentUser;
        if (!user) {
            console.error('User not logged in');
            return;
        }

        const userId = user.uid;
        const fullApiUrl = apiURL + '/getUserData';

        try {
            const response = await fetch(`${fullApiUrl}?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            const data = await response.json();
            console.log('Data:', data);

            if (data.first_name) firstName.value = data.first_name;
            if (data.last_name) lastName.value = data.last_name;
            if (data.email) email.value = data.email;
            if (data.street) street.value = data.street;
            if (data.post_code) postCode.value = data.post_code;
            if (data.city) city.value = data.city;
            if (data.country) country.value = data.country;
            if (data.phone_number) phoneNumber.value = data.phone_number;

        } catch (error) {
            console.error('Error:', error);
        } finally {
            loading.value = false;
        }
    }

    async function logOut() {
        try {
            await signOut(auth);
            toast.success('Successfully signed out');
            router.push('/login');
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while signing out');
        }
    }

    onMounted(() => {
        getUserData();
    });
</script>

<template>
    <LoadingSpinner v-if="loading" />
    <main v-else class="flex flex-col items-center text-center m-11">
        <h1 class="text-5xl font-bold text-center mb-8">{{ firstName }} {{ lastName }}</h1>
        <p class="text-3xl text-center">{{ email }}</p>
        <p v-if="street.length >= 1 && postCode.length >= 1 && city.length >= 1 && country.length >= 1" class="text-3xl text-center">{{ street }}, {{  postCode }}, {{ city }}, {{ country }}</p>
        <p v-if="phoneNumber.length >= 1" class="text-3xl text-center">{{ phoneNumber }}</p>
        <RouterLink to="/my-orders" class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3 flex items-center justify-center">My orders</RouterLink>
        <RouterLink to="/change-details" class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3 flex items-center justify-center">Change details</RouterLink>
        <RouterLink to="/change-password" class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3 flex items-center justify-center">Change password</RouterLink>
        <button class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3" @click="logOut">Sign Out</button>
    </main>
</template>
