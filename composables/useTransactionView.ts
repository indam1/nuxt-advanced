export function useTransactionView() {
    const user = useSupabaseUser();

    const getTransactionView = () => user.value?.user_metadata?.transaction_view ?? TransactionViewOptions.Monthly;
    const transactionView = ref<TransactionViewOption>(getTransactionView());

    watch(user, () => transactionView.value = getTransactionView(), { immediate: true });

    return { transactionView };
}
