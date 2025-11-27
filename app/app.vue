<script setup lang="ts">
const cartDataStore = useCartDataStore();

onMounted(() => {
    const localStorageCart = localStorage.getItem('cartData');

    // check exist localStorage or not
    if (localStorageCart !== null) {
        cartDataStore.data = JSON.parse(localStorageCart);
    } else {
        localStorage.setItem('cartData', JSON.stringify([]));
    }
});

watch(
    () => cartDataStore.data,
    (newValue) => {
        if (import.meta.client) {
            localStorage.setItem('cartData', JSON.stringify(newValue));
        }
    },
    { deep: true }
);
</script>

<template>
    <div class="container">
        <NuxtPage />
    </div>
</template>

<style lang="css">
@font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter.ttf');
}

* {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    color: rgb(42, 40, 40);
}
.container {
    margin: 0 auto;
}

@media (min-width: 1460px) {
    .container {
        width: 1440px;
    }
}

@media (min-width: 900px) and (max-width: 1460px) {
    .container {
        width: 96vw;
        padding: 0 20px;
    }
}

@media (min-width: 400px) and (max-width: 900px) {
    .container {
        width: 94vw;
        padding: 0 40px;
    }
}

@media (max-width: 400px) {
    .container {
        width: 94vw;
    }
}
</style>
