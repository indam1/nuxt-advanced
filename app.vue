<template>
    <div class="flex flex-col min-h-screen">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <MainFooter class="mt-auto" />
        <LazyUNotifications />
    </div>
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
    @apply bg-neutral-200 text-neutral-800 text-opacity-80
}

.personal-account {
    font-family: "Segoe UI", sans-serif;
}
</style>
