import { defineStore } from 'pinia';
import { api } from '@/config';

export const useProductsStore = defineStore('products', {
    state: () => ({
        productsByCategory: {},
        selectedProduct: null,
    }),
    actions: {
        async fetchProductsByCategory(category) {
            if (!this.productsByCategory[category]) {
                try {
                    const response = await api.get('/loadProducts', {
                        params: {
                            product_tag: category
                        }
                    });
                    this.productsByCategory[category] = response.data;
                } catch (error) {
                    console.error(error);
                }
            }
        },
        async fetchProductById(productId) {
            for (const category in this.productsByCategory) {
                const product = this.productsByCategory[category].find(
                    (p) => p.product_id === productId
                );
                if (product) {
                    this.selectedProduct = product;
                    return;
                }
            }
            try {
                const response = await api.get('/loadProducts', {
                    params: {
                        product_id: productId
                    }
                });
    
                this.selectedProduct = response.data;
                console.log(this.selectedProduct);

            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        getProducts: (state) => (category) => state.productsByCategory[category] || [],
        getSelectedProduct: (state) => state.selectedProduct,
    },
});