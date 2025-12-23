<template>
    <div class="page">
        <slot />
    </div>
</template>

<style lang="css" scoped>
    .page {
        flex: 1;
        background-color: var(--white-99); color: var(--black);
        margin: 20px 20px 20px 0; padding: 4px 24px;
        /* border: 1px solid var(--bg); */
        border-radius: var(--BR-normal);
    }
</style>
