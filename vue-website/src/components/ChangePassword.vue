<script setup>
    import { ref } from 'vue';
    import { auth } from '@/config';
    import { useToast } from "vue-toastification";
    import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
    import router from '@/router/index.js';

    const toast = useToast();
    const currentPassword = ref('');
    const newPassword = ref('');
    const newPasswordRepeat = ref('');

    async function changePassword() {
        const user = auth.currentUser;
        if (!user) {
            toast.error("No user is currently signed in.");
            return;
        }

        // Validate if passwords match
        if (newPassword.value !== newPasswordRepeat.value) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            // Reauthenticate user with their current password
            const credential = EmailAuthProvider.credential(user.email, currentPassword.value);
            await reauthenticateWithCredential(user, credential);

            // Update the user's password
            await updatePassword(user, newPassword.value);

            toast.success('Password updated successfully.');
            router.push('/user');
        } catch (error) {
            // Handle errors
            if (error.code === 'auth/wrong-password') {
                toast.error('The current password is incorrect.');
            } else if (error.code === 'auth/weak-password') {
                toast.error('The new password is too weak.');
            } else {
                toast.error('An error occurred while updating the password.');
            }
            console.error('Error:', error);
        }
    }
</script>

<template>
    <main class="flex flex-col items-center text-center m-11">
        <h1 class="text-5xl font-bold text-center mb-8">Change password</h1>
        <input v-model="currentPassword" type="password" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Current password">
        <input v-model="newPassword" type="password" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="New password">
        <input v-model="newPasswordRepeat" type="password" class="w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center" placeholder="Repeat new password">
        <button type="button" @click="changePassword" class="w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3">Change password</button>
    </main>
</template>