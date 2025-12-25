<script setup lang="ts">
import { ref } from 'vue'

const swaggerUrl = ref<string>(
    `${import.meta.env.VITE_API_ROOT}/docs`,
)
</script>

<template>
    <iframe :src="swaggerUrl" />
</template>

<style lang="css" scoped>
    iframe {
        height: 100%;
        background-color: var(--white-55);
        border: 0;
    }
</style>
