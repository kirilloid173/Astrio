<template>
    <div class="hero-section">
        <img src="/images/logo.png" alt="logo" />
        <img
            class="hero-section__cart"
            src="/images/cart_logo.svg"
            alt="cart"
        />
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
}

.hero-section__cart {
    width: 60px;
    height: 60px;
}
</style>
