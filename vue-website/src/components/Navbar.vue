<script setup>
    import { useToast } from "vue-toastification";

    const toast = useToast();

    async function wishlist() {
        toast.info('Wishlist function is currently unavailable');
    }
</script>

<template>
<div class="flex items-center justify-center w-full p-1 font-normal font-archivo text-md">
  Free worldwide delivery when purchasing 2+ products
</div>
<header class="bg-[#111111] text-white font-archivo font-bold grid grid-cols-3 items-center">
  <div id="logo" class="flex justify-start">
    <RouterLink to="/"><img id="logo_ffu" src="/images/logo.png" class="w-8 sm:w-12 md:w-28 h-auto mt-2.5 mb-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer ml-8" alt="logo_ffu"></RouterLink> 
  </div>
  <nav class="flex justify-evenly text-2xl font-normal">
    <RouterLink to="/products/kits" class="text-white no-underline hover:brightness-50 transition-all duration-200 text-center">Jerseys</RouterLink>
    <RouterLink to="/products/accessories" class="text-white no-underline hover:brightness-50 transition-all duration-200 text-center">Accessories</RouterLink>
    <RouterLink to="/products/boots" class="text-white no-underline hover:brightness-50 transition-all duration-200 text-center">Boots</RouterLink>
  </nav>
  <div class="flex justify-end">
    <RouterLink to="/login"><img id="user_icon" src="/images/user_icon.png" class="w-8 sm:w-12 md:w-12 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="User"></RouterLink>
    <img id="heart_icon" src="/images/heart_icon.png" class="w-8 sm:w-12 md:w-12 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="Wishlist" @click="wishlist()">
    <RouterLink to="/cart"><img id="cart_icon" src="/images/shopping_cart_icon.png" class="w-8 sm:w-12 md:w-12 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer mr-8" alt="Cart"></RouterLink>
</div>
</header>
</template>