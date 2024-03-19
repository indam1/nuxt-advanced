<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'IndamFake',
    titleTemplate: '%s - Cool Bank',
});
</script>

<style lang="postcss">
body {
    font-family: "Segoe UI", sans-serif;
}

body {
    @apply bg-neutral-200 text-neutral-800
}

.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
