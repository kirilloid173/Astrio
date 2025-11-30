<script setup lang="ts">
const cartDataStore = useCartDataStore();

interface cartData {
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
    quantity: number;
    activeColor?: string;
    activeSize?: string;
}

function totalPriceItem(cartItem: cartData) {
    return Number(cartItem.regular_price.value * cartItem.quantity).toFixed(2);
}
</script>

<template>
    <h1 class="cart-title">Ваша корзина</h1>
    <div class="cart-subtitle">
        <div class="subtitle__left-block">
            <p>Товар</p>
        </div>
        <div class="subtitle__right-block">
            <p>Цена</p>
            <p>Кол-во</p>
            <p>Общее</p>
        </div>
    </div>
    <div class="cart">
        <div
            v-for="cartData in cartDataStore.data"
            :key="cartData.id"
            class="cart__item"
        >
            <div class="item-block-left">
                <img
                    class="item-block-left__image"
                    :src="cartData.imageSrc || cartData.image"
                    alt="product-logo"
                />
                <div class="item-block-left__config-item">
                    <p class="item-block-left__title">
                        <span class="mobile-view">Товар: </span
                        >{{ cartData.title }}
                    </p>
                    <div
                        v-if="cartData.type === 'configurable'"
                        class="config-item__options"
                    >
                        <p v-if="cartData.activeColor">
                            Color: {{ cartData.activeColor }}
                        </p>
                        <p v-if="cartData.activeSize">
                            Size: {{ cartData.activeSize }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="item-block-right">
                <p class="item-block-right__price">
                    <span class="mobile-view">Цена: </span>${{
                        cartData.regular_price.value
                    }}
                </p>
                <span class="mobile-view">Количество: </span>
                <input
                    class="item-block-right__quantity"
                    type="number"
                    min="1"
                    step="1"
                    max="99"
                    :value="cartData.quantity"
                    v-on:input="
                        cartDataStore.changeQuantityItemCart(
                            cartData.id,
                            $event
                        )
                    "
                />
                <p class="item-block-right__total-price">
                    <span class="mobile-view">Общая стоимость: </span>${{
                        totalPriceItem(cartData)
                    }}
                </p>
                <button
                    class="item-block-right__button-delete"
                    v-on:click="cartDataStore.deleteItemCart(cartData.id)"
                >
                    Удалить
                </button>
            </div>
        </div>
    </div>
    <div class="subtotal">
        <p class="subtotal__price">
            Итоговая цена: <span>${{ cartDataStore.totalPrice }}</span>
        </p>
        <button
            v-if="
                cartDataStore.totalPrice !== 0 && cartDataStore.totalPrice > 0
            "
            class="subtotal__button-checkout"
        >
            Оформить
        </button>
    </div>
</template>
<style scoped lang="css">
.cart-title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 60px;
}

.cart-subtitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 600;
}

.subtitle__right-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 70px;
    margin-right: 240px;
}

.subtitle__left-block {
    margin-left: 195px;
}

.cart {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cart__item {
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 2px solid rgb(42, 40, 40);
    width: 100%;
    justify-content: space-between;
}

.item-block-left {
    display: flex;
    align-items: center;
}

.item-block-left__config-item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
}

.item-block-left__title {
    font-size: 24px;
    font-weight: 400;
    margin-left: 30px;
}

.item-block-right {
    display: flex;
    align-items: center;
}

.item-block-right__price {
    font-size: 20px;
    font-weight: 500;
}

.item-block-right__quantity {
    width: 40px;
    font-size: 20px;
    padding: 10px;
    border: 1px solid rgb(42, 40, 40);
}

.item-block-right__total-price {
    font-size: 26px;
    font-weight: 600;
    width: 120px;
}

.item-block-right__button-delete {
    padding: 12px;
    border-radius: 20px;
    border: none;
    background-color: rgb(160, 79, 79);
    color: white;
    font-size: 24px;
}

.item-block-right__button-delete:hover {
    cursor: pointer;
    text-decoration: underline;
}

.item-block-left__image {
    width: 150px;
    height: auto;
}

.subtotal {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    margin-top: 36px;
}

.subtotal__price {
    font-size: 32px;
    margin-bottom: 12px;
}

.subtotal__price span {
    font-weight: 600;
}

.subtotal__button-checkout {
    background-color: rgb(51, 107, 51);
    border-radius: 20px;
    border: none;
    color: rgb(249, 239, 239);
    padding: 14px;
    font-size: 24px;
    letter-spacing: 1px;
    margin-bottom: 50px;
}

.subtotal__button-checkout:hover {
    cursor: pointer;
    text-decoration: underline;
}

.mobile-view {
    font-size: 20px;
}

@media (min-width: 1130px) {
    .cart__item {
        flex-direction: row;
    }

    .mobile-view {
        display: none;
    }

    .subtotal {
        width: 100%;
    }
}

@media (max-width: 1130px) {
    .mobile-view {
        display: block;
    }

    .cart-subtitle {
        display: none;
    }

    .cart__item {
        flex-direction: column;
    }

    .subtotal {
        width: 98%;
    }
}

@media (min-width: 870px) {
    .item-block-right {
        flex-direction: row;
        gap: 80px;
    }
}

@media (max-width: 870px) {
    .item-block-right {
        flex-direction: column;
        gap: 20px;
    }
}

@media (min-width: 320px) {
    .item-block-left {
        flex-direction: row;
    }
}

@media (max-width: 320px) {
    .item-block-left {
        flex-direction: column;
    }

    .item-block-left {
        margin-bottom: 14px;
    }
}
</style>
