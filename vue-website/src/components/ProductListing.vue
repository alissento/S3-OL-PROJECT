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
            class="p-4 m-6 border rounded-lg shadow-md hover:shadow-lg transition cursor-pointer bg-white flex flex-col items-center"
        >
            <RouterLink :to="{ name: 'productPage', params: { id: product.product_id } }">
            <img 
                :src="'/images/'+product.photoID" 
                :alt='product.productLabel' 
                class='h-64 w-56 object-cover mb-4 cursor-pointer'
            >
            </RouterLink>
            <p class='text-[22px] font-semibold text-center'>{{ product.productLabel }}</p>
            <p class='text-3xl font-semibold text-center'>{{ product.price }}€</p>
        </div>
    </main>
</template>