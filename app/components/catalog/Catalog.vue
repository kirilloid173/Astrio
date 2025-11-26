<script setup lang="ts">
interface BrandsType {
    id: number;
    title: string;
    sort: string;
    code: string;
}

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

const cartCountStore = useCartCountStore();

const { data: brandsJson } = await useFetch<BrandsType[]>('/json/brands.json', {
    server: false,
});

const { data: productsJson } = await useFetch<ProductsType[]>(
    '/json/products.json',
    {
        server: false,
    }
);

const dataShow = ref<ProductsType[]>([]);

watchEffect(() => {
    if (productsJson.value) {
        dataShow.value = productsJson.value;
    }
});

function filterProducts(brand: BrandsType) {
    const filteredBrand = productsJson.value!.filter(
        (item) => item.brand === brand.id
    );
    if (filteredBrand || filteredBrand[0]) dataShow.value = filteredBrand;
}

function filterReset() {
    if (productsJson.value) {
        dataShow.value = productsJson.value;
    }
}

function addCart() {
    cartCountStore.count++;
}
</script>

<template>
    <div class="catalog">
        <div class="catalog__filter">
            <p class="catalog__filter-title" v-on:click="filterReset">
                Все бренды
            </p>
            <p
                v-for="brand in brandsJson"
                :key="brand.id"
                v-on:click="filterProducts(brand)"
            >
                {{ brand.title }}
            </p>
        </div>
        <div class="catalog__main">
            <p class="catalog__title">Каталог</p>
            <div class="catalog__items">
                <div
                    class="catalog__item"
                    v-for="product in dataShow"
                    :key="product.id"
                >
                    <img
                        class="catalog__image"
                        :src="product.image"
                        alt="image_product"
                    />
                    <p class="catalog__item-title">{{ product.title }}</p>
                    <p class="catalog__item-brand">
                        Бренд: {{ product.brand }}
                    </p>
                    <p class="catalog__item-price">
                        ${{ product.regular_price.value }}
                    </p>
                    <button v-on:click="addCart" class="catalog__item-button">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css">
.catalog {
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
}

.catalog__filter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    position: relative;
    margin-right: 65px;
}

.catalog__filter p {
    font-size: 16px;
    padding: 12px;
    border-radius: 20px;
}

p.catalog__filter-title {
    white-space: nowrap;
}

.catalog__filter p:hover {
    cursor: pointer;
    background-color: rgb(48, 47, 47);
    color: white;
}

.catalog__main {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
}

.catalog__title {
    font-size: 32px;
}

.catalog__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 55px;
    margin-top: 24px;
}

.catalog__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 10px;
    border: 2px solid transparent;
    border-radius: 20px;
}

.catalog__item p:last-of-type {
    margin-bottom: 12px;
    margin-top: 14px;
}

.catalog__item:hover {
    cursor: pointer;
    border: 2px solid rgb(42, 40, 40);
}

.catalog__item-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
}

.catalog__item-brand {
    font-size: 16px;
}

.catalog__item-price {
    font-size: 24px;
    font-weight: 700;
}

.catalog__item img {
    width: 250px;
    height: auto;
}

.catalog__item-button {
    padding: 12px;
    border: none;
    font-size: 14px;
    border-radius: 20px;
    color: white;
    background-color: rgb(48, 47, 47);
    letter-spacing: 1px;
}

.catalog__item-button:hover {
    cursor: pointer;
    animation: fadeInButton 0.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
}

@keyframes fadeInButton {
    0% {
        background-color: rgb(48, 47, 47);
    }

    100% {
        background-color: rgb(85, 116, 73);
    }
}
</style>
