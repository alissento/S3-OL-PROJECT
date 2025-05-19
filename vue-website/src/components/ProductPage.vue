<script setup>
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import { auth, apiURL } from '../config.js';
    import { useToast } from "vue-toastification";
    import { useProductsStore } from '@/stores/productsStore';
    import LoadingSpinner from './LoadingSpinner.vue';
    import { useCartStore } from '@/stores/cartStore.js';

    const cartStore = useCartStore();
    const productsStore = useProductsStore();
    const route = useRoute();
    const product = ref(null);
    const loading = ref(true);

    const sizes = ref([]);
    const selectedSize = ref(null);
    const toast = useToast();
    
    const addingToCart = ref(false);


    const selectSize = (size) => {
        selectedSize.value = size;
        console.log(`Selected size: ${selectedSize.value}`);
    };

    async function getProduct() {
        loading.value = true;
        const id = route.params.id;
        await productsStore.fetchProductById(id);
        product.value = productsStore.getSelectedProduct;
        console.log('Product:', product.value);

        if (Array.isArray(product.value)) {
            product.value = product.value[0];
        }

        sizeGenerator(product.value.productTag);
        loading.value = false;
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
        } else if (tag === 'accessories') {
            console.log(product.value.productType);
            if (product.value.productType === 'beanie' || product.value.productType === 'cap') {
                sizes.value = ['XXS/XS', 'XS/S', 'M/L', 'L/XL'];
            } else if (product.value.productType === 'ball') {
                sizes.value = ['3', '4', '5'];
            } else {
                sizes.value = ['One Size'];
                selectedSize.value = 'One Size';
            }
        } else {
            sizes.value = [];
        }
    }

    async function addToCart() {
        loading.value = true;
        if ((product.value.productTag === 'accessories') && (product.value.productType !== 'beanie' && product.value.productType !== 'cap' && product.value.productType !== 'ball')) {
            selectedSize.value = 'One Size';
        }

        if (!selectedSize.value) {
            toast.error("Please select a size");
            loading.value = false;
            return;
        }

        addingToCart.value = true;
        const user = auth.currentUser;


        if (!user) {
            toast.error("You must be logged in to add items to cart");
            loading.value = false;
            return;
        }

        const apiUrlCart = apiURL+'/addToCart';

        console.log(user.uid, product.value.product_id, selectedSize.value);
        const requestData = {
            user_id: user.uid,
            product_id: product.value.product_id,
            price: product.value.price,
            size: selectedSize.value
        };

        try {
            const response = await fetch(apiUrlCart, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            console.log('Response:', response);

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            toast.success("Product added to cart!");

        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error("Failed to add item to cart");
        } finally {
            addingToCart.value = false;
            loading.value = false;
            await cartStore.fetchCart(user.uid, true);
        }
    }

    onMounted(() => {
        getProduct();
    });
</script>

<template>
    <LoadingSpinner v-if="loading" />
    <main v-else class="flex flex-grow">
        <div class="flex flex-col w-[50%] items-left text-left m-11 ml-[12%]">
            <img 
                :src="'/images/' + product.product_id + '/' + product.photoID" 
                :alt="product.productLabel" 
                class="h-[95%] w-[85%] rounded-xl border-[1px] border-black" 
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
            <button @click="addToCart()" class="mt-8 px-40 py-5 text-5xl bg-blue-700 text-white rounded-lg">
                ADD TO CART
            </button>
        </div>
    </main>
</template>
