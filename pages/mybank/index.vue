<template>
    <AppSection class="py-12">
        <section class="flex items-center justify-between mb-10">
            <h1 class="text-4xl font-extrabold">
                Summary
            </h1>
            <div>
                <USelectMenu
                    v-model="selectedView"
                    :options="getValues(TransactionViewOptions)"
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
    </AppSection>
</template>

<script setup lang="ts">
import {endOfDay, endOfMonth, endOfYear, startOfDay, startOfMonth, startOfYear, sub} from "date-fns";
import type {Database, Tables} from "~/utils/supabase";
import type {TransactionViewOption} from "~/utils/const";

definePageMeta({
    documentDriven: false
});

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

async function useFetchTransactions (period: Ref<{ from: Date; to: Date }>) {
    const supabase = useSupabaseClient<Database>();
    const visibility = useDocumentVisibility();
    const incomeTransactions = computed(
        () => transactions.value.filter(transaction => transaction.type === TransactionTypes.Income)
    );
    const expenseTransactions = computed(
        () => transactions.value.filter(transaction => transaction.type === TransactionTypes.Expense)
    );
    const savingTransactions = computed(
        () => transactions.value.filter(transaction => transaction.type === TransactionTypes.Saving)
    );
    const investmentTransactions = computed(
        () => transactions.value.filter(transaction => transaction.type === TransactionTypes.Investment)
    );

    const incomeCount = computed(() => incomeTransactions.value.length);
    const expenseCount = computed(() => expenseTransactions.value.length);
    const savingCount = computed(() => savingTransactions.value.length);
    const investmentCount = computed(() => investmentTransactions.value.length);

    const totalIncome = computed(
        () => incomeTransactions.value.reduce<number>(
            (acc, transaction) => acc + transaction.amount, 0
        )
    );
    const totalExpense = computed(
        () => expenseTransactions.value.reduce<number>(
            (acc, transaction) => acc + transaction.amount, 0
        )
    );
    const totalSaving = computed(
        () => savingTransactions.value.reduce<number>(
            (acc, transaction) => acc + transaction.amount, 0
        )
    );
    const totalInvestment = computed(
        () => investmentTransactions.value.reduce<number>(
            (acc, transaction) => acc + transaction.amount, 0
        )
    );

    const transactionsGroupedByDate = computed(() => {
        return transactions.value.reduce<Record<string, Array<Tables<'transactions'>>>>(
            (acc, transaction) => {
                const date = transaction.created_at.split('T')[0];
                if (!acc[date]) {
                    acc[date] = [];
                }

                acc[date].push(transaction);
                return acc;
            }, {}
        );
    });

    const { data: transactions, pending, refresh } = await useAsyncData(
        `transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`,
        async () => {
            const { data } = await supabase
                .from('transactions')
                .select()
                .gte('created_at', period.value.from.toISOString())
                .lte('created_at', period.value.to.toISOString())
                .order('created_at', { ascending: false })
                .returns<Array<Tables<'transactions'>>>();
            return data ?? [];
        },
        {
            default: () => [],
            watch: [period],
        }
    );

    watch(visibility, async () => {
        if (visibility.value === 'visible') {
            await refresh();
        }
    });

    return {
        transactions: {
            all: transactions,
            grouped: {
                byDate: transactionsGroupedByDate,
            },
            incomeTransactions,
            expenseTransactions,
            savingTransactions,
            investmentTransactions,
            incomeCount,
            expenseCount,
            savingCount,
            investmentCount,
            totalIncome,
            totalExpense,
            totalSaving,
            totalInvestment,
        },
        refresh,
        pending,
    };
}

function useSelectedTimePeriod(period: Ref<TransactionViewOption>) {
    const data = computed(() => ({
        date: new Date(),
        period: period.value,
    }));

    const current = computed(() => {
        switch (data.value.period) {
            case TransactionViewOptions.Yearly:
                return {
                    from: startOfYear(data.value.date),
                    to: endOfYear(data.value.date),
                };
            case TransactionViewOptions.Monthly:
                return {
                    from: startOfMonth(data.value.date),
                    to: endOfMonth(data.value.date),
                };
            case TransactionViewOptions.Daily:
                return {
                    from: startOfDay(data.value.date),
                    to: endOfDay(data.value.date),
                };
            default:
                return {
                    from: startOfYear(data.value.date),
                    to: endOfYear(data.value.date),
                };
        }
    });

    const previous = computed(() => {
        switch (data.value.period) {
            case TransactionViewOptions.Yearly:
                return {
                    from: startOfYear(sub(data.value.date, {years: 1})),
                    to: endOfYear(sub(data.value.date, {years: 1})),
                };
            case TransactionViewOptions.Monthly:
                return {
                    from: startOfMonth(sub(data.value.date, {months: 1})),
                    to: endOfMonth(sub(data.value.date, {months: 1})),
                };
            case TransactionViewOptions.Daily:
                return {
                    from: startOfDay(sub(data.value.date, {days: 1})),
                    to: endOfDay(sub(data.value.date, {days: 1})),
                };
            default:
                return {
                    from: startOfYear(sub(data.value.date, {years: 1})),
                    to: endOfYear(sub(data.value.date, {years: 1})),
                };
        }
    });

    return { current, previous };
}
</script>
