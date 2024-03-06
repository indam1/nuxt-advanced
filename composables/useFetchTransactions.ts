import type {Database, Tables} from '~/types/supabase';

export const useFetchTransactions = (period: any) => {
    const supabase = useSupabaseClient<Database>();
    const transactions = ref<Array<Tables<'transactions'>>>([]);
    const pending = ref(false);

    const incomeTransactions = computed<Array<Tables<'transactions'>>>(
        () => transactions.value.filter(transaction => transaction.type === 'Income')
    );
    const expenseTransactions = computed<Array<Tables<'transactions'>>>(
        () => transactions.value.filter(transaction => transaction.type === 'Expense')
    );

    const incomeCount = computed(() => incomeTransactions.value.length);
    const expenseCount = computed(() => expenseTransactions.value.length);

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

    const fetchTransactions = async () => {
        pending.value = true;

        try {
            const periodValue = toValue(period);
            const { data} = await useAsyncData(`transactions-${periodValue.from.toDateString()}-${periodValue.to.toDateString()}`, async () => {
                const { data, error } = await supabase
                    .from('transactions')
                    .select()
                    .gte('created_at', periodValue.from.toISOString())
                    .lte('created_at', periodValue.to.toISOString())
                    .order('created_at', { ascending: false })
                    .returns<Array<Tables<'transactions'>>>();

                if (error) {
                    return [];
                }

                return data;
            });

            return data.value;

        } finally {
            pending.value = false;
        }
    }

    const refresh = async () => transactions.value = (await fetchTransactions() ?? []);

    watch(period, async () => await refresh());

    const transactionsGroupedByDate = computed(() => {
        return transactions.value.reduce<Record<string, Array<Tables<'transactions'>>>>(
            (acc, transaction) => {
                const date = new Date(transaction.created_at)
                    .toISOString()
                    .split('T')[0];
                if (!acc[date]) {
                    acc[date] = [];
                }

                acc[date].push(transaction);
                return acc;
            }, {}
        );
    });

    return {
        transactions: {
            all: transactions,
            grouped: {
                byDate: transactionsGroupedByDate,
            },
            incomeTransactions,
            expenseTransactions,
            incomeCount,
            expenseCount,
            totalIncome,
            totalExpense,
        },
        refresh,
        pending,
    }
}
