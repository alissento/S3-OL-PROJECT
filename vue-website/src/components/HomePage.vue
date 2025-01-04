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
        kits1.value = kits.value.sort(() => 0.5 - Math.random()).slice(0, 4);
        kits2.value = kits.value.sort(() => 0.5 - Math.random()).slice(0, 4);
        console.log('Ads:', ads.value);
        loading.value = false;
    }

    onMounted(() => {
        loadAds();
    });
</script>


<template>
    <LoadingSpinner v-if="loading" />
    <main v-else class="bg-black font-bricolage">
        <div id="banner" class="w-full h-auto overflow-hidden">
            <img src="/images/banner.png" alt="banner" class="w-full h-auto object-cover"/>
        </div>
        <div id="quotes" class="text-center text-2xl text-white mt-12 mb-12">
            <p class="font-normal"> It's not just a sport - it's a lifestyle. </p>
            <p class="font-bold uppercase">Own it.</p>
        </div>
        <div id="mostPopular" class="ml-8 mr-8 font-bold">
            <p class="uppercase text-white text-3xl font-bricolage ml mb-4">Most Popular</p>
            <div class="grid grid-cols-4">
                <div 
                    v-for="kit in kits1" 
                    :key="kit.product_id" 
                    class="col-span-1"
                    >
                    <ProductCard :product="kit" />
                </div>           
            </div>
        </div>
        <div id="lastViewed" class="ml-8 mr-8 mt-16 mb-12 font-bold">
            <p class="uppercase text-white text-3xl mb-4">Last Viewed</p>
            <div class="grid grid-cols-4">
                <div 
                    v-for="kit in kits2" 
                    :key="kit.product_id" 
                    class="col-span-1"
                    >
                    <ProductCard :product="kit" />
                </div>             
            </div>
        </div>
    </main>
</template>