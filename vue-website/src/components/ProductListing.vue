<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { apiURL } from '../config.js';

    const fullApiUrl = apiURL+'/loadProducts';

    const route = useRoute();
    const products = ref([]);

    async function fetchProducts(tag) {
        try {
            const response = await fetch(`${fullApiUrl}?product_tag=${tag}`, {
                method: 'GET',
                headers: 
                {
                    'Accept': 'application/json'
                }
            });

            products.value = await response.json();

        } catch (error) {
            console.error('Error:', error);
        }
    }

    onMounted(() => {
        fetchProducts(route.params.tag);
    })

    watch(() => route.params.tag, 
        (newTag, oldTag) => {
            if (newTag !== oldTag) {
            fetchProducts(newTag);
        }
    })
</script>

<template>
    <main class='flex justify-center items-start flex-wrap w-full uppercase'>
        <div 
            v-for='product in products' 
            :key='product.product_id' 
            class='flex flex-col items-center text-center m-5'
        >
            <RouterLink :to="{ name: 'productPage', params: { id: product.product_id } }">
            <img 
                :src="'/images/'+product.photoID" 
                :alt='product.productLabel' 
                class='h-64 w-56 mb-2.5 rounded-[10%] border-2 border-black cursor-pointer'
            >
            </RouterLink>
            <p class='text-[22px] font-bold text-center'>{{ product.productLabel }}</p>
            <p class='text-3xl font-bold text-center'>{{ product.price }}€</p>
        </div>
    </main>
</template>