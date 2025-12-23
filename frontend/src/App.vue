<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style>
    html {
        display: flex;
        width: 100%; height: 100%;
        font-size: 14px;
    }
    body, #app {
        flex: 1;
        display: flex; flex-direction: column;
        min-width: 100%; min-height: 100%;
        margin: 0;
        font-family: var(--fonts);
        background: var(--bg-fancy), var(--bg); color: var(--black);
    }
</style>
