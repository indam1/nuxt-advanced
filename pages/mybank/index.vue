<template>
    <section class="flex items-center justify-between mb-10">
        <h1 class="text-4xl font-extrabold">
            Summary
        </h1>
        <div>
            <USelectMenu
                v-model="selectedView"
                :options="getValues(TransactionViewOption)"
            />
        </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
        <TrendItem
            color="green"
            title="Income"
            :amount="totalIncome"
            :last-amount="prevTotalIncome"
            :loading="pending"
        />
        <TrendItem
            color="red"
            title="Expense"
            :amount="totalExpense"
            :last-amount="prevTotalExpense"
            :loading="pending"
        />
        <TrendItem
            color="green"
            title="Investments"
            :amount="totalInvestment"
            :last-amount="prevTotalInvestment"
            :loading="pending"
        />
        <TrendItem
            color="red"
            title="Saving"
            :amount="totalSaving"
            :last-amount="prevTotalSaving"
            :loading="pending"
        />
    </section>

    <USkeleton
        v-if="pending"
        class="h-14 w-full mb-10"
    />
    <section
        v-else
        class="flex justify-between mb-10"
    >
        <div>
            <h2 class="text-2xl font-extrabold">
                Transactions
            </h2>
            <div class="text-gray-500">
                You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this period
            </div>
        </div>
        <div>
            <LazyTransactionModal
                v-model="isOpen"
                @save="refresh"
            />
            <UButton
                icon="i-heroicons-plus-circle"
                label="Add"
                @click="isOpen = true"
            />
        </div>
    </section>

    <section v-if="!currentPending">
        <div
            v-for="(transactionOnDate, date) in byDate"
            :key="date"
            class="mb-10"
        >
            <TransactionDailySummary
                :date="date"
                :transactions="transactionOnDate"
            />
            <TransactionItem
                v-for="transaction in transactionOnDate"
                :key="transaction.id"
                :transaction="transaction"
                @transactiondelete="refresh"
                @transactionedit="refresh"
            />
        </div>
    </section>
    <section v-else>
        <USkeleton
            v-for="n in 4"
            :key="n"
            class="h-8 w-full mb-2"
        />
    </section>
</template>

<script setup lang="ts">
const { transactionView } = useTransactionView();
const selectedView = ref(transactionView);
const isOpen = ref(false);
const { current, previous } = useSelectedTimePeriod(selectedView);
const pending = computed(() => currentPending.value || prevPending.value);

const {
    pending: currentPending,
    refresh,
    transactions: {
        incomeCount,
        expenseCount,
        totalIncome,
        totalExpense,
        totalSaving,
        totalInvestment,
        grouped: { byDate },
    },
} = await useFetchTransactions(current);

const {
    pending: prevPending,
    transactions: {
        totalIncome: prevTotalIncome,
        totalExpense: prevTotalExpense,
        totalSaving: prevTotalSaving,
        totalInvestment: prevTotalInvestment,
    },
} = await useFetchTransactions(previous);
</script>
