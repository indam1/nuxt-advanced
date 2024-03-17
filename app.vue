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
    link: [
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
            crossorigin: ''
        }
    ]
});
</script>

<style lang="postcss">
body {
    font-family: 'Inter';
}

body {
    @apply bg-neutral-200 text-neutral-800
}

.personal-account {
    font-family: "Segoe UI", sans-serif;
}
</style>
