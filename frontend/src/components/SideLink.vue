<script setup lang="ts">
import { RouterLink } from 'vue-router'

const { link } = defineProps<{
    link: string,
}>()
</script>

<template>
    <RouterLink v-if="link.startsWith('/')" :to="link" class="sidelink">
        <slot />
    </RouterLink>
    <a v-else :href="link" target="_blank" class="sidelink">
        <slot />
    </a>
</template>

<style lang="css" scoped>
    .sidelink {
        display: flex; flex-direction: row;
        align-items: center; gap: 6px;
        padding: 8px 12px;
        background-color: transparent; color: var(--accent-dark);
        border-radius: var(--BR-round);
        font-weight: 600;
        text-decoration: none;

        &.router-link-exact-active {
            color: var(--white);
            background-color: var(--accent);
        }

        &:hover {
            background-color: var(--white-33);
        }
    }
</style>
