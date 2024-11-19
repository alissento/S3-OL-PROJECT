<script setup>
    import { ref, onMounted } from 'vue';
    import { apiURL } from '../config.js';
    
    const fullApiUrl = apiURL+'/';
    const ads = ref([]);

    async function fetchAds() {
        try {
            const response = await fetch(fullApiUrl, {
                method: 'GET',
                headers: 
                {
                    'Accept': 'application/json'
                }
            });

            ads.value = await response.json();

        } catch (error) {
            console.error('Error:', error);
        }
    }

    onMounted(() => {
        fetchAds();
    });
</script>


<template>
    <main class="flex flex-grow items-center justify-center w-full font-karantina">
        <div class="flex flex-wrap justify-center items-start">
        <div 
            v-for='ad in ads' 
            :key='ad.id' 
            class="flex flex-col items-center text-center mx-12 my-10"
        >
            <img 
                :src="'images/'+ad.ad_photo" 
                :alt='ad.ad_label' 
                class='w-full max-w-md mb-2.5 rounded-[10%] border-[2.5px] border-black cursor-pointer'
            >
            <p class='text-xl lg:text-2xl xl:text-3xl font-medium text-center'>{{ ad.ad_label }}</p>
        </div>
    </div>
    </main>
</template>