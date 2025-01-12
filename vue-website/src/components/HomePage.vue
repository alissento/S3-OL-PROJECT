<script setup>
    import { ref, onMounted } from 'vue';
    import { useAdsStore } from '@/stores/adsStore';
    import { useProductsStore } from '@/stores/productsStore';
    import LoadingSpinner from './LoadingSpinner.vue';
    import ProductCard from './ProductCard.vue';
    
    const adsStore = useAdsStore();
    const productsStore = useProductsStore();
    const ads = ref([]);
    const kits = ref([]);
    const kits1 = ref([]);
    const kits2 = ref([]);
    const loading = ref(true);

    async function loadAds() {
        loading.value = true;
        await adsStore.fetchAds();
        await productsStore.fetchProductsByCategory('kits');
        ads.value = adsStore.getAds;
        kits.value = productsStore.getProducts('kits');
        kits1.value = kits.value.sort(() => 0.5 - Math.random()).slice(0, 5);
        kits2.value = kits.value.sort(() => 0.5 - Math.random()).slice(0, 5);
        console.log('Ads:', ads.value);
        loading.value = false;
    }

    onMounted(() => {
        loadAds();
    });
</script>

<template>
    <LoadingSpinner v-if="loading" />
    <main v-else class="font-archivo text-black">
        <div id="banner" class="w-[90%] h-auto mx-auto mt-16">
            <img src="/images/banner.png" alt="banner" class="w-full h-auto" />
        </div>
        <div id="mostPopular" class="w-[90%] mx-auto font-normal mt-16">
            <p class="text-black text-2xl mb-6">Most Popular</p>
            <div class="flex justify-center items-center space-x-8">
                <div
                    v-for="kit in kits1"
                    :key="kit.product_id"
                >
                    <ProductCard :product="kit" />
                </div>
            </div>
        </div>
        <div id="lastSeen" class="w-[90%] mx-auto font-normal mt-16">
            <p class="text-black text-2xl mb-6">Last Seen</p>
            <div class="flex justify-center items-center space-x-8">
                <div
                    v-for="kit in kits2"
                    :key="kit.product_id"
                >
                    <ProductCard :product="kit" />
                </div>
            </div>
        </div>
        <div id="ads" class="w-full mx-auto font-normal mt-16 bg-[#111111]">
            <p class="text-white text-2xl">On Fire</p>
        </div>
        <div id="discount" class="w-full p-1 bg-white text-md text-black flex items-center justify-center">
            <span class="font-normal mr-8">Become a club member and get the 5% discount</span>
            <RouterLink to="/register" class="font-bold"><button class="px-10 py-1 bg-[#111111] text-white rounded-sm">Register for free</button></RouterLink>
        </div>
    </main>
</template>