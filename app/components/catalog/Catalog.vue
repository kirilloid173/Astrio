<script setup lang="ts">
interface BrandsType {
    id: number;
    title: string;
    sort: string;
    code: string;
}

interface ValuesOptions {
    label: string;
    value_index: number;
    value: string;
}

interface ConfigurableOptions {
    attribute_id: number;
    attribute_code: string;
    position?: number;
    id?: number;
    label: string;
    values: ValuesOptions[];
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
    quantity?: number;
    configurable_options?: ConfigurableOptions[];
}

const { data: brandsJson } = await useFetch<BrandsType[]>('/json/brands.json', {
    server: false,
    default: () => [],
});

const { data: productsJson } = await useFetch<ProductsType[]>(
    '/json/products.json',
    {
        server: false,
        default: () => [],
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
                    <CatalogItem
                        :product="product"
                        :productsJson="productsJson"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="css">
.catalog__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    border: 2px solid transparent;
    border-radius: 20px;
    height: max-content;
}

.catalog__item:hover {
    cursor: pointer;
    border: 2px solid rgb(42, 40, 40);
    box-shadow: 0 8px 10px rgb(42, 40, 40);
}

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
    margin-top: 24px;
}

@keyframes fadeInButton {
    0% {
        background-color: rgb(48, 47, 47);
    }

    100% {
        background-color: rgb(85, 116, 73);
    }
}
@media (min-width: 1440px) {
    .catalog__items {
        gap: 55px;
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (min-width: 1380px) and (max-width: 1440px) {
    .catalog__items {
        gap: 20px;
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (min-width: 1200px) and (max-width: 1380px) {
    .catalog__items {
        gap: 80px;
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1030px) and (max-width: 1200px) {
    .catalog__items {
        gap: 250px;
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 850px) and (max-width: 1030px) {
    .catalog__items {
        gap: 60px;
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 530px) and (max-width: 850px) {
    .catalog__main {
        margin: 0 auto;
    }
}

@media (min-width: 330px) and (max-width: 530px) {
    .catalog__item img {
        width: 100%;
    }
}

@media (max-width: 360px) {
    .catalog__item img {
        width: 100%;
    }
    .catalog__filter {
        margin-right: 15px;
    }
}
</style>
