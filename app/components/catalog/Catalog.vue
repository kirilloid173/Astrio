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

const brandsJson = await $fetch<BrandsType[]>('/json/brands.json');
const productsJson = await $fetch<ProductsType[]>('/json/products.json');
</script>

<template>
    <div class="catalog">
        <div class="catalog__filter">
            <p>Все бренды</p>
            <p v-for="brand in brandsJson" :key="brand.id">
                {{ brand.title }}
            </p>
        </div>
        <div class="catalog__main">
            <p class="catalog__title">Каталог</p>
            <div class="catalog__items">
                <div
                    class="catalog__item"
                    v-for="product in productsJson"
                    :key="product.id"
                >
                    <img
                        class="catalog__image"
                        :src="product.image"
                        alt="image_product"
                    />
                    <p class="catalog__item-title">{{ product.title }}</p>
                    <p>{{ product.brand }}</p>
                    <p>{{ product.regular_price.value }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css">
.catalog {
    display: flex;
    flex-direction: row;
}

.catalog__filter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    position: relative;
    margin-right: 65px;
}

.catalog__filter::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -30%;
    width: 2px;
    height: 80%;
    background-color: black;
}

.catalog__main {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
}

.catalog__title {
    font-size: 32px;
    transform: translateY(-10%);
}

.catalog__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 100px;
}

.catalog__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
}

.catalog__item img {
    width: 250px;
    height: auto;
}
</style>
