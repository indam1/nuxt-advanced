<template>
    <div class="grid grid-cols-2 py-4 border-b border-gray-800 text-gray-400 font-bold">
        <div class="flex items-center justify-between">
            {{ date }}
        </div>

        <div class="flex items-center justify-end mr-10">
            {{ currency }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type {Tables} from "~/utils/supabase";

const props = defineProps<{
    transactions: Array<Tables<'transactions'>>
    date: string
}>();

const profitTransactionTypes: Array<string> = [TransactionTypes.Income, TransactionTypes.Investment, TransactionTypes.Saving];
const sum = computed(() => props.transactions.reduce<number>(
    (acc, transaction) => acc + (profitTransactionTypes.includes(transaction.type) ? 1 : -1) * (transaction.amount ?? 0), 0)
);
const { currency } = useCurrency(sum);
</script>
