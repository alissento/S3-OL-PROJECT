<script setup>
    import { ref } from 'vue';
    import { auth } from '@/config.js';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { useToast } from "vue-toastification";
    import router from '@/router/index.js';
    import { onMounted } from 'vue';
    import loginCheck from '@/logincheck';

    const toast = useToast();
    const email = ref('');
    const password = ref('');

    async function signIn() {

        if (email.value === '' || password.value === '') {
            toast.error('Please fill in all fields');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            toast.error('Please enter a valid email address');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
            const user = userCredential.user;
            console.log('User:', user);
            console.log('User id:', user.uid);

            toast.success('Successfully logged in');
            
            router.push('/user');
        } catch (error) {
            if (error.code === 'auth/invalid-login-credentials' || error.code === 'auth/invalid-credential') {
                toast.error('Invalid login credentials');
            } else {
                console.error('Error:', error);
                toast.error('An error occurred while logging in');
            }
        }
    }

    onMounted(() => {
        loginCheck();
    });
</script>

<template>
    <main class="flex flex-col items-center text-center m-11">
        <h1 class="text-5xl font-bold text-center mb-8">Login Page</h1>
        <form class="flex flex-col items-center text-center m-8">
            <input v-model="email" type="email" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Email">
            <input v-model="password" type="password" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Password">
            <button type="button" @click="signIn" class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3">Login</button>
            <RouterLink to="/register" class="text-4xl mt-16 cursor-pointer">No account? Register here!</RouterLink>
        </form>
    </main>
</template>
