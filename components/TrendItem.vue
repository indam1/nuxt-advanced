<template>
    <div>
        <div
            class="font-bold"
            :class="[color]"
        >
            {{ title }}
        </div>

        <div class="text-2xl font-extrabold text-gray-800 mb-2">
            <USkeleton
                v-if="loading"
                class="h-8 w-full"
            />
            <div v-else>
                {{ currency }}
            </div>
        </div>

        <div>
            <USkeleton
                v-if="loading"
                class="h-6 w-full"
            />
            <div
                v-else
                class="flex space-x-1 items-center text-sm"
            >
                <UIcon
                    :name="icon"
                    class="w-6 h-6"
                    :class="[trendingUp ? 'green' : 'red']"
                />
                <div class="text-gray-600">
                    {{ percentageTrend }}% vs last period
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    amount: number
    lastAmount: number
    color: string
    loading: boolean
}>();

const trendingUp = computed(() => props.amount >= props.lastAmount);
const icon = computed(() => trendingUp.value ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down');

const { currency } = useCurrency(toRef(() => props.amount));

const percentageTrend = computed(() => {
    if (!props.amount || !props.lastAmount) {
        return '∞';
    }

    const ratio = Math.abs(props.amount - props.lastAmount) / Math.min(props.amount, props.lastAmount);
    return Math.ceil(ratio * 100);
});
</script>

<style scoped lang="postcss">
.green {
    @apply text-green-400;
}

.red {
    @apply text-red-400;
}
</style>
