<template>
    <UCard
        class="cursor-pointer transition duration-500 hover:scale-105 rounded-3xl"
        :ui="{ body: { base: 'min-h-64' } }"
        @click="navigateTo(props.to)"
    >
        <template #header>
            <h2 class="text-xl">
                {{ props.title }}
            </h2>
        </template>
        {{ props.description }}
        <template #footer>
            <UButton
                ref="button"
                label="Click me"
            />
        </template>
    </UCard>
</template>

<script setup lang="ts">
const button = ref<InstanceType<typeof UButton>>();
const props = defineProps<{
    title: string
    description: string
    to: string
}>();
</script>
