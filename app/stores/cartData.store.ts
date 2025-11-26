import { defineStore } from 'pinia';

interface ProductsType {
    type: string;
    id: number;
    sku: string;
    title: string;
    regular_price: {
        currency: string;
        value: number;
    };
    image: string;
    brand: number;
}

export const useCartDataStore = defineStore('data', {
    state: () => {
        return {
            data: [] as ProductsType[],
        };
    },
    getters: {
        counts: (state) => state.data.length,
    },
    actions: {
        addToCart(newProduct: ProductsType) {
            this.data.push(newProduct);
        },
    },
});
