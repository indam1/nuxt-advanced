<template>
    <div
        class="mx-auto md:max-w-5xl lg:max-w-7xl flex flex-col items-center justify-center"
        :class="innerClass"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    innerClass?: string
}>();
</script>
