<script setup lang="ts">
import type { FormMessage } from '@/types/forms'

const { message } = defineProps<{
    message: FormMessage | null
}>()
</script>

<template>
    <div v-show="message !== null" class="msgbox" :class="[message?.variant ?? 'regular']">
        {{ message?.text ?? '' }}
    </div>
</template>

<style lang="postcss" scoped>
    .msgbox {
        padding: 8px;
        border: 1px solid transparent; border-radius: var(--BR-small);
    }
    .error {
        background-color: color-mix(in srgb, var(--danger), transparent 80%);
        color: color-mix(in srgb, var(--danger), var(--white) 80%);
    }
    .warning {
        background-color: color-mix(in srgb, var(--warning), transparent 80%);
        color: color-mix(in srgb, var(--warning), var(--white) 80%);
    }
    .success {
        background-color: color-mix(in srgb, var(--accent-light), transparent 80%);
        color: color-mix(in srgb, var(--accent-light), var(--white) 80%);
    }
    .regular {
        border-color: color-mix(in srgb, var(--white-pale), var(--bg) 60%);
        color: var(--white-pale);
    }
</style>
