import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ProductListing from '../components/ProductListing.vue';
import ProductPage from '../components/ProductPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/products/:tag', component: ProductListing, props: true},
    { path: '/product/:id', name: "productPage", component: ProductPage, props: true }
];
  
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;