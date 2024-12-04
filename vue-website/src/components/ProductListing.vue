<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useProductsStore } from '@/stores/productsStore';
    import LoadingSpinner from './LoadingSpinner.vue';
    
    const productsStore = useProductsStore();

    const route = useRoute();
    const products = ref([]);
    const loading = ref(true);

    async function loadProducts(category) {
        loading.value = true;
        await productsStore.fetchProductsByCategory(category);
        products.value = productsStore.getProducts(category);
        loading.value = false;
    }

    onMounted(() => {
        loadProducts(route.params.tag);
    });

    watch(() => route.params.tag, 
        (newTag, oldTag) => {
            if (newTag !== oldTag) {
            loadProducts(newTag);
        }
    });
</script>

<template>
    <LoadingSpinner v-if="loading" />
    <main v-else class='flex justify-center items-start flex-wrap w-full uppercase'>
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