<template>
    <div>
        <MainHeader class="sticky top-0 left-0 z-10" />
        <main class="container mx-auto">
            <slot />
        </main>
        <MainFooter class="mt-auto" />
        <LazyUNotifications />
    </div>
</template>

<script setup lang="ts">
</script>
