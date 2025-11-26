<script setup lang="ts">
const cartDataStore = useCartDataStore();
</script>

<template>
    <div class="hero-section-cards">
        <img src="/images/logo.png" alt="logo" />
        <div class="hero-section-cards__right-block">
            <NuxtLink to="/cart">
                <img
                    class="hero-section-cards__cart"
                    src="/images/cart_logo.svg"
                    alt="cart"
                />
                <p class="hero-section-cards__count-cart">
                    {{ cartDataStore.counts }}
                </p>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped lang="css">
.hero-section-cards {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid rgb(42, 40, 40);
    padding-bottom: 10px;
    margin-bottom: 25px;
}

.hero-section-cards__right-block {
    position: relative;
    padding: 8px;
}

.hero-section-cards__count-cart {
    position: absolute;
    background-color: rgb(62, 60, 60);
    color: white;
    padding: 8px;
    border-radius: 50%;
    right: 0;
    top: 6px;
}

.hero-section-cards__cart {
    width: 60px;
    height: 60px;
}
</style>
