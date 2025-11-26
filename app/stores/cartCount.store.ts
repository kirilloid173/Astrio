import { defineStore } from 'pinia';

export const useCartCountStore = defineStore('counts', {
    state: () => {
        return {
            count: 0 as number,
        };
    },
});
