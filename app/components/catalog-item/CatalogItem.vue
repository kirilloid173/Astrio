<script setup lang="ts">
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
    activeColor?: string;
    activeSize?: string;
    resultVariant?: string;
    imageSrc?: string;
    variants?: Array<Object>;
}

const cartDataStore = useCartDataStore();

const optionsColor = [
    { key: 'Red', class: 'item-config__red' },
    { key: 'Blue', class: 'item-config__blue' },
    { key: 'Black', class: 'item-config__black' },
];

const optionsSize = [
    { key: 'M', class: 'item-config__size-m', label: 'M' },
    { key: 'L', class: 'item-config__size-l', label: 'L' },
];

const activeOptionColor = ref<string>('Red');

const activeOptionSize = ref<string>('M');

const { product, productsJson } = defineProps<{
    product: ProductsType;
    productsJson: ProductsType[];
}>();

const checkExistConfig = product.type === 'configurable';

const configListItem = [];
if (
    checkExistConfig &&
    product.configurable_options !== null &&
    product.configurable_options
) {
    for (let i = 0; i < product.configurable_options.length; i++) {
        if (
            product.configurable_options[i]?.label &&
            product.configurable_options[i]?.values !== null
        ) {
            for (
                let t = 0;
                t < product.configurable_options[i]?.values.length;
                t++
            ) {
                configListItem.push({
                    label: product.configurable_options[i]?.label,
                    config: product.configurable_options[i]?.values[t]?.label,
                });
            }
        }
    }
    console.log(configListItem);
}

function addNewItemToCart(productId: number) {
    if (productsJson) {
        const foundProduct = productsJson.find(
            (item: ProductsType) => item.id === productId
        );
        if (foundProduct) {
            console.log(foundProduct);
            if (!foundProduct.quantity) {
                foundProduct.quantity = 1;
                foundProduct.activeColor = activeOptionColor.value;
                foundProduct.activeSize = activeOptionSize.value;
                foundProduct.resultVariant = `${activeOptionColor.value.toLowerCase()}-${activeOptionSize.value.toLowerCase()}`;
                const imageURL = foundProduct.variants?.find(
                    (item) =>
                        item.product.sku.slice(3) === foundProduct.resultVariant
                );
                if (imageURL && imageURL !== null) {
                    foundProduct.imageSrc = imageURL.product.image;
                }
            }
            cartDataStore.addToCart(foundProduct);
        }
    }
}

function checkAvailableConfig(
    newOptKey: string,
    enabledConfig: boolean,
    type: string
) {
    if (enabledConfig) {
        if (type === 'color') {
            activeOptionColor.value = newOptKey;
        } else if (type === 'size') {
            activeOptionSize.value = newOptKey;
        }
    }
}
</script>

<template>
    <img class="catalog__image" :src="product.image" alt="image_product" />
    <p class="catalog__item-title">{{ product.title }}</p>
    <p class="catalog__item-brand">Бренд: {{ product.brand }}</p>
    <p class="catalog__item-price">${{ product.regular_price.value }}</p>
    <div v-if="product.type === 'configurable'" class="catalog__item-config">
        <div
            v-for="(optColor, index) in optionsColor"
            :key="optColor.key"
            :class="[
                optColor.class,
                { active: activeOptionColor === optColor.key },
                {
                    disabled:
                        configListItem[index]?.label === 'Color' &&
                        configListItem[index]?.config !== optColor.key,
                },
            ]"
            v-on:click="
                checkAvailableConfig(
                    optColor.key,
                    configListItem[index]?.config === optColor.key,
                    'color'
                )
            "
        ></div>
        <div
            v-for="(optSize, index) in optionsSize"
            :key="optSize.key"
            :class="[
                optSize.class,
                { active: activeOptionSize === optSize.key },
                {
                    disabled:
                        configListItem[index + 3]?.label === 'Size' &&
                        configListItem[index + 3]?.config !== optSize.key,
                },
            ]"
            v-on:click="
                checkAvailableConfig(
                    optSize.key,
                    configListItem[index + 3]?.config === optSize.key,
                    'size'
                )
            "
        >
            {{ optSize.label || '' }}
        </div>
    </div>
    <button
        v-on:click="addNewItemToCart(product.id)"
        class="catalog__item-button"
    >
        Добавить в корзину
    </button>
</template>

<style scoped lang="css">
.catalog__item-config {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 16px;
}

.catalog__item-config .disabled:not(.active):hover {
    cursor: not-allowed;
    border: 3px solid rgb(48, 47, 47);
    color: rgb(48, 47, 47);
}

.catalog__item-config .active {
    border: 3px solid rgb(227, 165, 20);
}

.catalog__item-config div:hover {
    cursor: pointer;
    border: 3px solid rgb(227, 165, 20);
}

.catalog__item p:last-of-type {
    margin-bottom: 12px;
    margin-top: 14px;
}

.item-config__red {
    width: 50px;
    height: 30px;
    border: 3px solid rgb(48, 47, 47);
    background-color: #ff0000;
}

.item-config__blue {
    width: 50px;
    height: 30px;
    border: 3px solid rgb(48, 47, 47);
    background-color: #0000ff;
}

.item-config__black {
    width: 50px;
    height: 30px;
    border: 3px solid rgb(48, 47, 47);
    background-color: #000;
}

.item-config__size-m {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
    border: 3px solid rgb(48, 47, 47);
    font-weight: 600;
    font-size: 20px;
}

.item-config__size-m:hover {
    color: rgb(227, 165, 20);
}

.item-config__size-l {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
    border: 3px solid rgb(48, 47, 47);
    font-weight: 600;
    font-size: 20px;
}

.item-config__size-l:hover {
    color: rgb(227, 165, 20);
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
