<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { apiURL } from '../config.js';

const fullApiUrl = apiURL + '/loadProducts';

const route = useRoute();
const id = route.params.id;
const product = ref({});
const sizes = ref([]);
const selectedSize = ref(null);

const selectSize = (size) => {
    selectedSize.value = size; // Correctly set the selected size
    console.log(`Selected size: ${selectedSize.value}`);
};

async function fetchProducts() {
    try {
        const response = await fetch(`${fullApiUrl}?product_id=${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        const data = await response.json();
        product.value = data[0]; // Assume response is an array

        sizeGenerator(product.value.productTag);
    } catch (error) {
        console.error('Error:', error);
    }
}

function sizeGenerator(tag) {
    console.log(`size tag: ${tag}`);
    if (tag === 'kits') {
        sizes.value = ['S', 'M', 'L', 'XL', 'XXL'];
    } else if (tag === 'boots') {
        sizes.value = [];
        for (let size = 36; size <= 46; size += 0.5) {
            sizes.value.push(size.toString());
        }
    }
}

onMounted(() => {
    fetchProducts();
});
</script>

<template>
    <main class="flex flex-grow">
        <div class="flex flex-col w-[50%] items-left text-left m-11 ml-[12%]">
            <img 
                :src="'/images/' + product.photoID" 
                :alt="product.productLabel" 
                class="h-[95%] w-[85%] rounded-[10%] border-[3px] border-black" 
            />
        </div>
        <div class="flex flex-col w-[50%] items-center text-center m-11 mr-[12%]">
            <p class="text-6xl font-bold text-center uppercase">{{ product.productLabel }}</p>
            <p class="text-5xl font-bold text-center mt-3">{{ product.price }}€</p>
            <p class="text-3xl mt-10 font-thin">{{ product.productDescription }}</p>
            <div class="flex flex-wrap justify-center mt-12">
                <button
                    v-for="size in sizes"
                    :key="size"
                    class="w-16 h-12 text-2xl border-2 rounded-lg cursor-pointer mt-2 ml-1 mr-1"
                    @click="selectSize(size)"
                    :class="{
                        'border-black': selectedSize === size,
                        'border-gray-300': selectedSize !== size
                    }"
                >
                    {{ size }}
                </button>
            </div>
            <button class="mt-8 px-40 py-5 text-5xl bg-blue-700 text-white rounded-lg">
                ADD TO CART
            </button>
        </div>
    </main>
</template>
