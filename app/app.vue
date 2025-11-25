<script setup lang="ts">
import HeroSection from './components/herosection/HeroSection.vue';
import Catalog from './components/catalog/Catalog.vue';
</script>

<template>
    <div class="container">
        <HeroSection />
        <Catalog />
    </div>
</template>

<style lang="css">
* {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
}
.container {
    width: 1440px;
    margin: 0 auto;
}
</style>
