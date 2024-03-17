<template>
    <div class="grid grid-cols-3 py-4 border-b border-gray-800 text-gray-800">
        <div class="flex items-center justify-between space-x-4 col-span-2">
            <div class="flex items-center space-x-1">
                <UIcon
                    :name="icon"
                    :class="iconColor"
                />
                <div>{{ transaction.description }}</div>
            </div>

            <div>
                <UBadge
                    v-if="transaction.category"
                    color="white"
                >
                    {{ transaction.category }}
                </UBadge>
            </div>
        </div>

        <div class="flex items-center justify-end space-x-2">
            <div>{{ currency }}</div>
            <div>
                <UDropdown
                    :items="items"
                    :popper="{ placement: 'bottom-start' }"
                >
                    <UButton
                        trailing-icon="i-heroicons-ellipsis-horizontal"
                        :loading="isLoading"
                    />
                    <LazyTransactionModal
                        v-model="isOpen"
                        :transaction="transaction"
                        @save="emit('transactionedit')"
                    />
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    transaction: Tables<'transactions'>
}>();

const emit = defineEmits(['transactiondelete', 'transactionedit']);
const isProfit = computed(() => [TransactionType.Income, TransactionType.Investment, TransactionType.Saving].includes(props.transaction.type));
const icon = computed(() => isProfit.value ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-down-left');
const iconColor = computed(() => isProfit.value ? 'text-green-600' : 'text-red-600');

const { currency } = useCurrency(props.transaction.amount);

const isLoading = ref(false);
const { toastError, toastSuccess } = useAppToast();
const supabase = useSupabaseClient<Database>();

const isOpen = ref(false);

const deleteTransaction = async () => {
    isLoading.value = true;

    try {
        await supabase.from('transactions')
            .delete()
            .eq('id', props.transaction.id);
        toastSuccess({title: 'Transaction deleted',});
        emit('transactiondelete', props.transaction.id);

    } catch (error: any) {
        toastError({ title: 'Transaction was not deleted', description: e.message });

    } finally {
        isLoading.value = false;
    }
};

const items = [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => isOpen.value = true,
        },
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: deleteTransaction,
        },
    ]
];
</script>
