import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import ProductListing from '@/components/ProductListing.vue';
import ProductPage from '@/components/ProductPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import UserPage from '@/components/UserPage.vue';
import CartPage from '@/components/CartPage.vue';
import ChangePassword from '@/components/ChangePassword.vue';
import ChangeDetails from '@/components/ChangeDetails.vue';
import Checkout from '@/components/Checkout.vue';
import MyOrders from '@/components/MyOrders.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/products/:tag', component: ProductListing, props: true},
    { path: '/product/:id', name: "productPage", component: ProductPage, props: true },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/user', component: UserPage },
    { path: '/cart', component: CartPage },
    { path: '/change-password', component: ChangePassword },
    { path: '/change-details', component: ChangeDetails },
    { path: '/checkout', component: Checkout },
    { path: '/my-orders', component: MyOrders }
];
  
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;