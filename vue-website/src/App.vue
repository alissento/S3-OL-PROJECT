<script setup>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div class="flex-grow flex">
      <RouterView class="w-full"/>
    </div>
    <Footer />
  </div>
</template>
