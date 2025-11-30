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
    imageSrc?: string;
    brand: number;
    quantity: number;
    activeColor?: string;
    activeSize?: string;
}

export const useCartDataStore = defineStore('data', {
    state: () => {
        return {
            data: [] as ProductsType[],
        };
    },

    getters: {
        counts: (state) => state.data.length,
        totalPrice: (state) => {
            const totalPrice = state.data.reduce((sum, item) => {
                const quantity = item.quantity ?? 1;
                return sum + item.regular_price.value * quantity;
            }, 0);

            return Number(totalPrice.toFixed(2));
        },
    },

    actions: {
        addToCart(newProduct: ProductsType) {
            const checkProductInCart = this.data.find(
                (item) => item.id === newProduct.id
            );
            if (checkProductInCart && checkProductInCart.quantity) {
                checkProductInCart.quantity += 1;
            } else {
                this.data.push(newProduct);
            }
        },

        changeQuantityItemCart(idItem: number, eventTarget: InputEvent) {
            const numberQuantity = Number(
                (eventTarget.target as HTMLInputElement).value
            );

            const foundItem = this.data.find((item) => item.id === idItem);

            if (foundItem) {
                foundItem.quantity = numberQuantity;
            }
        },

        deleteItemCart(idItem: number) {
            const foundItem = this.data.find((item) => item.id === idItem);

            if (foundItem) {
                this.data = this.data.filter((item) => item.id !== idItem);
            }
        },
    },
});
