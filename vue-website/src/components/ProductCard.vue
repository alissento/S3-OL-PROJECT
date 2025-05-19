<script setup>
    import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

    const props = defineProps(['product']);

    const product = props.product;
    const label = product.productLabel;
    const price = product.price;
</script>

<template>
    <div class="relative bg-gray-100">
        <RouterLink :to="{ name: 'productPage', params: { id: product.product_id } }">
        <img 
            :src="'/images/'+product.product_id+'/'+product.product_id+'.png'" 
            :alt="label" 
            class="w-[20rem] h-[22rem]"
        />
        <div class="absolute bottom-0 left-0 m-4 px-10 py-1 bg-white font-semibold">
            € {{ price }}
        </div>
        </RouterLink>
    </div>
</template>