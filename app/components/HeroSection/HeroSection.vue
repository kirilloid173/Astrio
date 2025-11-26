<script setup lang="ts">
const cartCountStore = useCartCountStore();
</script>

<template>
    <div class="hero-section">
        <img src="/images/logo.png" alt="logo" />
        <div class="hero-section__right-block">
            <img
                class="hero-section__cart"
                src="/images/cart_logo.svg"
                alt="cart"
            />
            <p class="hero-section__count-cart">{{ cartCountStore.count }}</p>
        </div>
    </div>
</template>

<style>
.hero-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid rgb(42, 40, 40);
    padding-bottom: 10px;
    margin-bottom: 25px;
}

.hero-section__right-block {
    position: relative;
    padding: 8px;
}

.hero-section__count-cart {
    position: absolute;
    background-color: rgb(62, 60, 60);
    color: white;
    padding: 8px;
    border-radius: 50%;
    right: 0;
    top: 6px;
}

.hero-section__cart {
    width: 60px;
    height: 60px;
}
</style>
