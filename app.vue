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
</style>
