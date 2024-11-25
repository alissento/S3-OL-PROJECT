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
    const loading = ref(true);

    async function getUserData() {
        const user = auth.currentUser;
        const userId = user.uid;
        const fullApiUrl = apiURL + '/getUserData';

        if (!user) {
            console.error('User not logged in');
            return;
        }

        try {
            const response = await fetch(`${fullApiUrl}?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            const data = await response.json();
            console.log('Data:', data);

            firstName.value = data.first_name;
            lastName.value = data.last_name;
            email.value = data.email;

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

    async function myOrders() {
        toast.info('My orders page is under construction');
    }

    async function changeDetails() {
        toast.info('Change details page is under construction');
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
        <button class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3" @click="myOrders">My orders</button>
        <button class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3" @click="changeDetails">Change details</button>
        <button class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3" @click="logOut">Sign Out</button>
    </main>
</template>
