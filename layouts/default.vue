<template>
    <MainHeader class="sticky top-0 left-0 z-10" />
    <main class="container mx-auto max-w-6xl">
        <slot />
    </main>
    <MainFooter class="mt-auto" />
    <LazyUNotifications />
</template>
