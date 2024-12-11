<script setup>
    import { ref } from 'vue';
    import { auth, apiURL } from '@/config.js';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { useToast } from "vue-toastification";
    import router from '@/router/index.js';
    import { onMounted } from 'vue';
    import loginCheck from '@/logincheck';
    import { useUserStore } from '@/stores/userStore.js';

    const userStore = useUserStore();
    const toast = useToast();
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const repeatPassword = ref('');

    async function registerIn() {

        if (!firstName || !lastName || !email || !password || !repeatPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (password.value !== repeatPassword.value) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
            const user = userCredential.user;
            console.log('User:', user);
            console.log('User id:', user.uid);

            toast.success('Successfully registered');
            
            storeUserData();
            userStore.fetchUserData(user.uid);
            router.push('/login');
            
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email already in use');
            } else {
                console.error('Error:', error);
                toast.error('An error occurred while registering');
            }
        }
    }

    async function storeUserData() {
        const user = auth.currentUser;
        const fullApiUrl = apiURL + '/storeUserData';
        const requestData = {
            user_id: user.uid,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value
        };

        try {
            const response = await fetch(`${fullApiUrl}?operation=register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            console.log('Data stored successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    onMounted(() => {
        loginCheck();
    });
        
</script>

<template>
    <main class="flex flex-col items-center text-center m-11">
        <h1 class="text-5xl font-bold text-center mb-8">Register Page</h1>
        <form class="flex flex-col items-center text-center m-8">
            <input v-model="firstName" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="First name">
            <input v-model="lastName" type="text" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Last name">
            <input v-model="email" type="email" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Email">
            <input v-model="password" type="password" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Password">
            <input v-model="repeatPassword" type="password" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Repeat password">
            <button type="button" @click="registerIn" class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3">Register</button>
            <RouterLink to="/login" class="text-4xl mt-16 cursor-pointer">Already have an account? Login here!</RouterLink>
        </form>
    </main>
</template>