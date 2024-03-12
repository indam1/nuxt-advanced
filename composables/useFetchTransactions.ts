import type {Database, Tables} from '~/types/supabase';

export const useFetchTransactions = async (period: any) => {
    const supabase = useSupabaseClient<Database>();

    const { data: transactions , pending, refresh } = await useAsyncData(
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

    const incomeTransactions = computed(
        () => transactions.value.filter(transaction => transaction.type === 'Income')
    );
    const expenseTransactions = computed(
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

    const transactionsGroupedByDate = computed(() => {
        return transactions.value.reduce<Record<string, Array<Tables<'transactions'>>>>(
            (acc, transaction) => {
                const date = new Date(transaction.created_at).toISOString().split('T')[0];
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
    };
};
