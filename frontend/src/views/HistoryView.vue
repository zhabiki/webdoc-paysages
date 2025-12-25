<script setup lang="ts">
import type { ResultsPage } from '@/types/classifier'
import type { FormMessage } from '@/types/forms'

import axios from 'axios'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'

import Button from '@/components/Button.vue'
import MsgBox from '@/components/MsgBox.vue'
import HistoryImgCard from '@/widgets/HistoryImgCard.vue'

const msg = ref<FormMessage | null>(null)
const pageNo = ref<number>(1)
const pageData = ref<ResultsPage>()

async function getPageContent() {
    try {
        const data = await axios.get(
            `/history?pid=${pageNo.value ?? 1}`,
        )

        pageData.value = data.data
        msg.value = null
    }
    catch (err) {
        const errText = (err as any).response?.data?.detail ?? (err as Error).message
        msg.value = { variant: 'error', text: errText }
    }
}

onMounted(() => {
    getPageContent()
})
watch(pageNo, () => {
    getPageContent()
})
</script>

<template>
    <section class="history-images">
        <MsgBox :msg="msg" />

        <HistoryImgCard v-for="p of pageData?.data" :key="p.id" :image-data="p" />
    </section>
    <section class="history-nav">
        <Button :disabled="pageNo === 1" @click="pageNo -= 1">
            <ArrowLeft />
        </Button>

        <h3>Страница {{ pageNo }} из {{ pageData?.total_pages || 1 }}</h3>

        <Button :disabled="pageNo === (pageData?.total_pages || 1)" @click="pageNo += 1">
            <ArrowRight />
        </Button>
    </section>
</template>

<style lang="css" scoped>
    .history-images {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(252px, 264px));
        justify-content: center; justify-items: center; align-items: center; align-content: center;
        padding: 20px; gap: 20px;
        overflow: auto;
    }

    .history-nav {
        display: flex; flex-direction: row;
        justify-content: center; align-items: center;
        max-width: 100%; height: 56px;
        box-sizing: border-box; margin: 0 20px 20px; gap: 12px;
        background-color: color-mix(var(--accent-light), var(--white-CC) 20%); color: var(--white);
        border-radius: var(--BR-round);

        & button {
            border-radius: var(--BR-round);
        }
        & h3 {
            margin-bottom: 4px;
        }
    }
</style>
