<script setup lang="ts">
import type { ImageData } from '@/types/classifier'

import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
    imageData: ImageData,
}>()

const imageUrl = ref<string>('')

async function getImage(hash) {
    const data = await axios.get(
        `/image/${hash}`,
        { responseType: 'blob' },
    )

    const blob: Blob = data.data
    const addr = URL.createObjectURL(blob)
    imageUrl.value = addr
}

const labelData = computed(() => Object.entries(props.imageData.classes[0])[0] ?? ['Загрузка…', '0'])

onMounted(() => {
    imageUrl.value = ''
    getImage(props.imageData.image)
})
watch(props, () => {
    getImage(props.imageData.image)
})
</script>

<template>
    <div class="card">
        <img :src="imageUrl">

        <h3>
            {{ `${labelData[0][0]?.toUpperCase() + labelData[0].slice(1)}` }}
            {{ `— ${(labelData[1] * 100).toFixed(2)} %` }}
        </h3>
    </div>
</template>

<style lang="css" scoped>
    .card {
        width: 240px;
        padding: 20px 12px;
        background-color: var(--white); color: var(--accent-dark);
        text-align: center;
        box-shadow: 0 4px 12px color-mix(var(--accent-dark), transparent 80%);
        cursor: pointer;
        transition: var(--TR-normal);

        &:hover {
            transform: rotate(2deg) scale(1.06);
        }
    }

    img {
        width: 100%; height: 180px;
        object-fit: cover;
        margin-bottom: 12px;
        background-color: color-mix(var(--accent-dark), transparent 80%);
        box-shadow: inset 0 0 2px 0 solid var(--black);
    }
</style>
