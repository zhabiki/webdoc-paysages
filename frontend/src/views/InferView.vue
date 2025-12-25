<script setup lang="ts">
import type { InferenceResults } from '@/types/classifier'
import type { FormMessage } from '@/types/forms'

import axios from 'axios'
import { ref } from 'vue'

import Button from '@/components/Button.vue'
import MsgBox from '@/components/MsgBox.vue'
import ResultsChart from '@/widgets/ResultsChart.vue'

const msg = ref<FormMessage | null>(null)
const img = ref<File | null>(null)
const res = ref<InferenceResults | null>(null)

const IMAGE_SIZE = 88

function updateImage(e: Event | null) {
    const t = e?.target as HTMLInputElement

    if (t && t.files && t.files[0]) {
        img.value = t.files[0]
        msg.value = null
    }
    else {
        msg.value = { variant: 'error', text: 'Картинка не загрузилась!' }
    }
}

async function classifyImage() {
    res.value = null
    msg.value = { variant: 'regular', text: 'Обработка картинки, подождите…' }

    if (img.value) {
        try {
            const fd = new FormData()
            fd.append('file', img.value)

            const data = await axios.post(
                `/infer?width=${IMAGE_SIZE}&height=${IMAGE_SIZE}`,
                fd,
            )

            res.value = data.data
            msg.value = null
        }
        catch (err) {
            const errText = (err as any).response?.data?.detail ?? (err as Error).message
            msg.value = { variant: 'error', text: errText }
        }
    }
}
</script>

<template>
    <div class="infer">
        <h1>Попробовать онлайн</h1>
        <p>
            Ниже вы можете попробовать загрузить картинку
            в модель, чтобы онлайн протестировать, как
            модель её классифицирует. Обратите внимание, что
            всего модель имеет 6 выходных классов, поэтому,
            если картинку нельзя отнести ни к одному из них,
            результаты получатся не очень :)
        </p>

        <section class="controls">
            <input type="file" @change="(e) => updateImage(e)">

            <Button :disabled="!img" @click="classifyImage()">
                Поехали!
            </Button>
        </section>

        <MsgBox :msg="msg" />

        <section v-if="res" class="results">
            <h2>Результаты классификации</h2>

            <p>
                Наведите мышкой на столбец графика, чтобы увидеть точность
            </p>

            <ResultsChart :res="res" />
        </section>
    </div>
</template>

<style lang="css" scoped>
    .infer {
        flex: 1;
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        max-width: 640px;
        margin: auto; padding: 20px;
    }

    .results {
        width: 100%;
        margin-top: 12px; padding: 20px 20px 12px;
        background-color: var(--white-CC);
        border-radius: var(--BR-normal);
        text-align: center;
    }

    .controls {
        display: flex; flex-direction: row;
        align-items: center;
        margin: 8px 0; gap: 8px;
    }
</style>
