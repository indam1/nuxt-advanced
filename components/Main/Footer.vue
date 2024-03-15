<template>
    <footer
        class="bg-neutral-800"
        aria-labelledby="footer-heading"
    >
        <h2
            id="footer-heading"
            class="sr-only"
        >
            Footer
        </h2>
        <div class="mx-auto max-w-7xl px-6 pb-8 pt-8 sm:pt-16 lg:px-8 xl:pt-32">
            <div class="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
                <p class="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
                    &copy; {{ new Date().getFullYear() }} UsanoFake Bank
                    &bull;
                    This website and its content is copyright of UsanoFake (Honestly, no)
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="postcss">

</style>
