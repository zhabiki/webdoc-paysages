<script setup>
import { useVueFuse } from 'vue-fuse'
import { RouterLink } from 'vue-router'

const zagolovki = [
    {
        text: 'Описание проекта',
        page: '/',
    },
    {
        text: 'Датасет на Kaggle',
        page: '/',
    },

    {
        text: 'Технические детали',
        page: '/details',
    },
    {
        text: 'Установка',
        page: '/details',
    },
    {
        text: 'Conda',
        page: '/details',
    },
    {
        text: 'Аргументы запуска',
        page: '/details',
    },
    {
        text: 'Режимы работы',
        page: '/details',
    },
    {
        text: 'Как запустить',
        page: '/details',
    },
    {
        text: 'Пример запуска',
        page: '/details',
    },

    {
        text: 'Демонстрация',
        page: '/try',
    },
    {
        text: 'Попробовать онлайн',
        page: '/try',
    },

    {
        text: 'История загрузок',
        page: '/try',
    },
    {
        text: 'Галерея загрузок',
        page: '/try',
    },

    {
        text: 'API эндпоинты',
        page: '/api',
    },
    {
        text: 'Swagger',
        page: '/api',
    },
]

const { search, results } = useVueFuse(
    zagolovki,
    {
        keys: ['text'],
        threshold: 0.4,
    },
)
</script>

<template>
    <div class="search">
        <input
            v-model="search"
            type="search"
            placeholder="Поиск по заголовкам"
            class="search-input"
        >

        <div v-if="results.length">
            <p v-for="item in results" :key="item.text" class="search-res">
                <RouterLink :to="item.page" @click="search = ''">
                    {{ item.text }}
                </RouterLink>
            </p>
        </div>

        <p v-else-if="search" class="search-nores">
            Ничего не найдено
        </p>
    </div>
</template>

<style scoped>
.search {
    margin-bottom: 8px;
}
.search-input {
    appearance: none;
    width: 100%;
    padding: 12px;
    border: none; border-radius: var(--BR-round);
    background-color: var(--white-CC);
    transition: var(--TR-normal);

    &:hover, &:focus-visible {
        background-color: var(--white);
    }
}

.search-res a {
    display: block;
    color: var(--accent);
    margin: 0 12px;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        color: var(--accent-dark)
    }
}

.search-nores {
    margin: 8px 12px;
}
</style>
