import { defineStore } from 'pinia';
import { api } from '@/config';

export const useAdsStore = defineStore('ads', {
    state: () => ({
        ads: [],
    }),
    actions: {
        async fetchAds() {
            if (this.ads.length) {
                return;
            }

            try {
                const response = await api.get('/');
                this.ads = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        getAds: (state) => state.ads,
    },
});