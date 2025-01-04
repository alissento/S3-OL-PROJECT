<script setup>
    import { defineProps } from 'vue';

    const props = defineProps(['product']);

    const product = props.product;
    const label = product.productLabel;
    const price = product.price;
</script>

<template>
    <div class="relative w-96 h-88">
        <img 
            :src="'/images/'+product.product_id+'/cover.png'" 
            :alt=label 
            class="w-full h-full object-cover"
        />
        <div class="absolute top-0 left-0 w-full h-8 bg-blue-700 text-white flex items-center justify-between px-4">
            <span>€ {{ price }}</span>
            <span>{{ label }}</span>
        </div>
    </div>
</template>