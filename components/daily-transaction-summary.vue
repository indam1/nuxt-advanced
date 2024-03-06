<template>
    <div class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold">
        <div class="flex items-center justify-between">
            {{ date }}
        </div>

        <div class="flex items-center justify-end mr-10">
            {{ currency }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type {Tables} from "~/types/supabase";

const props = defineProps<{
    transactions: Array<Tables<'transactions'>>
    date: string
}>()

const sum = computed(() => props.transactions.reduce<number>(
    (acc, transaction) => acc + (transaction.type === 'Income' ? 1 : -1) * (transaction.amount ?? 0), 0)
);
const { currency } = useCurrency(sum);
</script>

<style scoped lang="postcss">

</style>
