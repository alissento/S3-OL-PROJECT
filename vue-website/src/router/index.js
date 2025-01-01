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
import OrderPage from '@/components/OrderPage.vue';
import OrderConfirmation from '@/components/OrderConfirmation.vue';

const routes = [
    { path: '/', component: HomePage, meta: { title: 'Football For You' } },
    { path: '/products/:tag', component: ProductListing, props: true, meta: { title: 'Products' } },
    { path: '/product/:id', name: "productPage", component: ProductPage, props: true, meta: { title: 'Product Details' } },
    { path: '/login', component: LoginPage, meta: { title: 'Login Page' } },
    { path: '/register', component: RegisterPage, meta: { title: 'Registration Page' } },
    { path: '/user', component: UserPage, meta: { title: 'User Dashboard' } },
    { path: '/cart', component: CartPage, meta: { title: 'Cart' } },
    { path: '/change-password', component: ChangePassword, meta: { title: 'Change Password' } },
    { path: '/change-details', component: ChangeDetails, meta: { title: 'Change Details' } },
    { path: '/checkout', component: Checkout, meta: { title: 'Checkout' } },
    { path: '/my-orders', component: MyOrders, meta: { title: 'My Orders' } },
    { path: '/order/:id', name: "orderPage", component: OrderPage, props: true, meta: { title: 'Order Details' } },
    { path: '/order-confirmation', component: OrderConfirmation, meta: { title: 'Thank you!' } },
];
  
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Football For You';
    next();
});

export default router;
