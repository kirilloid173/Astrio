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
        <div class="cart__item">
            <div class="item-block-left">
                <img
                    class="item-block-left__image"
                    src="/images/1.png"
                    alt="product-logo"
                />
                <p class="item-block-left__title">Brand Thirty-five</p>
            </div>
            <div class="item-block-right">
                <p class="item-block-right__price">$88.9</p>
                <input
                    class="item-block-right__quantity"
                    type="number"
                    min="1"
                    step="1"
                    value="1"
                />
                <p class="item-block-right__total-price">$88.9</p>
            </div>
        </div>
    </div>
    <div class="subtotal">
        <p class="subtotal__price">Итоговая цена: <span>$355.56</span></p>
        <button class="subtotal__button-checkout">Оформить</button>
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
    gap: 92px;
}

.subtitle__left-block {
    margin-left: 220px;
}

.cart {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cart__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 0;
    border-bottom: 2px solid rgb(42, 40, 40);
    width: 100%;
    justify-content: space-between;
}

.item-block-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.item-block-left__title {
    font-size: 24px;
    font-weight: 400;
    margin-left: 30px;
}

.item-block-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 120px;
}

.item-block-right__price {
    font-size: 20px;
    font-weight: 500;
}

.item-block-right__quantity {
    width: 40px;
    font-size: 20px;
}

.item-block-right__total-price {
    font-size: 26px;
    font-weight: 600;
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
    font-weight: 500;
}

.subtotal__button-checkout {
    background-color: rgb(51, 107, 51);
    border-radius: 20px;
    border: none;
    color: rgb(249, 239, 239);
    padding: 14px;
    font-size: 24px;
    letter-spacing: 1px;
}

.subtotal__button-checkout:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
