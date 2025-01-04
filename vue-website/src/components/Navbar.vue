<script setup>
    import { useToast } from "vue-toastification";

    const toast = useToast();

    async function wishlist() {
        toast.info('Wishlist function is currently unavailable');
    }
</script>

<template>
<div class="text-white bg-blue-700 w-full h-auto text-center font-normal font-bricolage text-sm">Free worldwide delivery when purchasing 2+ products</div>
<header class="bg-black text-white font-bricolage font-bold grid grid-cols-3 items-center">
    <div id="logo" class="flex justify-start">
        <RouterLink to="/"><img id="logo_ffu" src="/images/logo.jpeg" class="w-8 sm:w-12 md:w-16 h-auto mt-2.5 mb-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer ml-8" alt="logo_ffu"></RouterLink> 
    </div>
  <nav class="flex justify-center text-2xl">
    <RouterLink to="/products/kits" class="text-white no-underline hover:brightness-50 transition-all duration-200 uppercase text-center">Kits</RouterLink>
    <RouterLink to="/products/accessories" class="text-white no-underline hover:brightness-50 transition-all duration-200 uppercase text-center mr-36 ml-36">Accessories</RouterLink>
    <RouterLink to="/products/boots" class="text-white no-underline hover:brightness-50 transition-all duration-200 uppercase text-center">Boots</RouterLink>
  </nav>
  <div class="flex justify-end">
    <RouterLink to="/login"><img id="user_icon" src="/images/user_icon.png" class="w-8 sm:w-12 md:w-16 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="User"></RouterLink>
    <img id="heart_icon" src="/images/heart_icon.png" class="w-8 sm:w-12 md:w-16 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="Wishlist" @click="wishlist()">
    <RouterLink to="/cart"><img id="cart_icon" src="/images/shopping_cart_icon.png" class="w-8 sm:w-12 md:w-16 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer mr-8" alt="Cart"></RouterLink>
</div>
</header>
</template>