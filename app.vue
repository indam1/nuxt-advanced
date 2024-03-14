<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <MainFooter />
    <UNotifications />
</template>

<script setup lang="ts">
useHead({
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
    @apply dark:bg-gray-900 bg-white
}
</style>
