<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                {{ isEditing ? 'Edit' : 'Add' }} Transaction
            </template>

            <UForm
                ref="form"
                :state="state"
                :schema="transactionModalSchema"
                @submit="saveForm"
            >
                <UFormGroup
                    label="Transaction Type"
                    :required="true"
                    name="type"
                    class="mb-4"
                >
                    <USelect
                        v-model="state.type"
                        :disable="isEditing"
                        placeholder="Select the transaction type"
                        :options="getValues(TransactionTypes)"
                    />
                </UFormGroup>

                <UFormGroup
                    label="Amount"
                    :required="true"
                    name="amount"
                    class="mb-4"
                >
                    <UInput
                        v-model.number="state.amount"
                        type="number"
                        placeholder="Amount"
                    />
                </UFormGroup>

                <UFormGroup
                    label="Transaction date"
                    :required="true"
                    name="created_at"
                    class="mb-4"
                >
                    <UInput
                        v-model="state.created_at"
                        type="date"
                        icon="i-heroicons-calendar-days-20-solid"
                    />
                </UFormGroup>

                <UFormGroup
                    label="Description"
                    hint="Optional"
                    name="description"
                    class="mb-4"
                >
                    <UInput
                        v-model="state.description"
                        placeholder="Description"
                    />
                </UFormGroup>

                <UFormGroup
                    v-if="state.type === TransactionTypes.Expense"
                    label="Category"
                    hint="Optional"
                    name="category"
                    class="mb-4"
                >
                    <USelect
                        v-model="state.category"
                        placeholder="Select"
                        :options="getValues(TransactionCategories)"
                    />
                </UFormGroup>

                <UButton
                    type="submit"
                    label="Save"
                    :loading="isLoading"
                />
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import type {Database, Tables} from "~/utils/supabase";

const props = defineProps<{
    transaction?: Tables<'transactions'>
}>();
const emit = defineEmits(['save']);
const isOpen = defineModel<boolean>();

const form = ref();
const isLoading = ref(false);

const isEditing = computed(() => !!props.transaction);

const supabase = useSupabaseClient<Database>();
const { toastError, toastSuccess } = useAppToast();

const saveForm = async () => {
    if (form.value.errors.length) {
        return;
    }

    isLoading.value = true;
    try {
        const values = { ...state.value, id: props.transaction?.id };
        const { error } = await supabase.from('transactions').upsert(values);
        if (error) {
            if (hasErrorMessage(error)) {
                toastError({
                    title: 'Transaction not saved',
                    description: error.message,
                });
            }
            return;
        }

        toastSuccess({ title: 'Transaction saved' });
        isOpen.value = false;
        emit('save');

    } catch (e) {
        if (hasErrorMessage(e)) {
            toastError({
                title: 'Transaction not saved',
                description: e.message,
            });
        }

    } finally {
        isLoading.value = false;
    }
};

const initialState = isEditing.value ? {
    type: props.transaction?.type ?? '',
    amount: props.transaction?.amount ?? 0,
    created_at: props.transaction?.created_at.split('T')[0] ?? '',
    description: props.transaction?.description ?? '',
    category: props.transaction?.category ?? '',
} : {
    type: '',
    amount: 0,
    created_at: '',
    description: '',
    category: '',
};

const state = ref({ ...initialState });

const resetForm = () => {
    state.value = { ...initialState };
    form.value.clear();
};

watch(isOpen, (value) => {
    if (!value) {
        resetForm();
    }
});
</script>
