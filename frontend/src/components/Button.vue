<template>
    <button v-bind="$attrs">
        <span v-if="$slots.default">
            <slot />
        </span>
    </button>
</template>

<style lang="css" scoped>
    button {
        appearance: none;
        padding: 8px 12px;
        background-color: var(--accent); color: var(--white);
        border: none; border-radius: var(--BR-normal);
        font-family: var(--fonts); font-weight: 600;
        cursor: pointer;
        transition: var(--TR-normal);

        &:disabled {
            opacity: .4;
            cursor: not-allowed;
        }

        &:not(:disabled):hover {
            background-color: var(--accent-light);

            &:active {
                background-color: var(--accent-dark); color: var(--white-CC);
            }
        }
    }
</style>
