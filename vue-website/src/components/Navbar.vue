<script setup>
    import { useToast } from "vue-toastification";

    const toast = useToast();

    async function wishlist() {
        toast.info('Wishlist function is currently unavailable');
    }
</script>

<template>
<header class="bg-black text-white flex justify-between items-center font-karantina">
    <div id="logo" class="flex items-center">
        <img id="football_image" src="/images/football_image.png" class="w-8 sm:w-12 md:w-16 h-auto m-2.5" alt="football image">
        <div class="text-xl md:text-2xl font-bold text-left tracking-wider leading-[1]">
            <RouterLink to="/" class="text-white no-underline hover:brightness-50 transition-all duration-200">FOOTBALL<br>FOR YOU</RouterLink>
        </div>
    </div>
  <nav>
    <ul class="flex list-none justify-center">
        <li class="mx-3 sm:mx-5 md:mx-8 text-2xl sm:text-3xl md:text-4xl tracking-wider">
            <RouterLink to="/products/kits" class="text-white no-underline hover:brightness-50 transition-all duration-200 mx-10 tracking-wider uppercase">Kits</RouterLink>
        </li>
        <li class="mx-3 sm:mx-5 md:mx-8 text-2xl sm:text-3xl md:text-4xl tracking-wider">
            <RouterLink to="/products/accessories" class="text-white no-underline hover:brightness-50 transition-all duration-200 mx-10 tracking-wider uppercase">Accessories</RouterLink>
        </li>
        <li class="mx-3 sm:mx-5 md:mx-8 text-2xl sm:text-3xl md:text-4xl tracking-wider">
            <RouterLink to="/products/boots" class="text-white no-underline hover:brightness-50 transition-all duration-200 mx-10 tracking-wider uppercase">Boots</RouterLink>
        </li>
    </ul>
  </nav>
  <div class="flex items-center">
    <RouterLink to="/login"><img id="user_icon" src="/images/user_icon.png" class="w-8 sm:w-12 md:w-16 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="User"></RouterLink>
    <img id="heart_icon" src="/images/heart_icon.png" class="w-8 sm:w-12 md:w-16 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="Wishlist" @click="wishlist()">
    <RouterLink to="/cart"><img id="cart_icon" src="/images/shopping_cart_icon.png" class="w-8 sm:w-12 md:w-16 h-auto m-2.5 hover:brightness-50 transition-all duration-200 cursor-pointer" alt="Cart"></RouterLink>
</div>
</header>
</template>