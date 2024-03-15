export const useFetchTransactions = async (period: any) => {
    const supabase = useSupabaseClient<Database>();
    const visibility = useDocumentVisibility();

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
        () => transactions.value.filter(transaction => transaction.type === TransactionType.Income)
    );
    const expenseTransactions = computed(
        () => transactions.value.filter(transaction => transaction.type === TransactionType.Expense)
    );
    const savingTransactions = computed(
        () => transactions.value.filter(transaction => transaction.type === TransactionType.Saving)
    );
    const investmentTransactions = computed(
        () => transactions.value.filter(transaction => transaction.type === TransactionType.Investment)
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
};
