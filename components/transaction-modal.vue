<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                Add Transaction
            </template>

            <UForm
                ref="form"
                :state="state"
                :schema="schema"
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
                        placeholder="Select the transaction type"
                        :options="getValues(TransactionType)"
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
                    v-if="state.type === TransactionType.Expense"
                    label="Category"
                    hint="Optional"
                    name="category"
                    class="mb-4"
                >
                    <USelect
                        v-model="state.category"
                        placeholder="Select"
                        :options="getValues(TransactionCategory)"
                    />
                </UFormGroup>

                <UButton
                    type="submit"
                    color="black"
                    variant="solid"
                    label="Save"
                    :loading="isLoading"
                />
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { TransactionCategory, TransactionType } from "~/constants";
import type {Database, TablesInsert} from "~/types/supabase";
import { z } from 'zod';
import {getValues, hasErrorMessage} from "~/lib/enum";

const props = defineProps<{
    modelValue: boolean
}>();
const emit = defineEmits(['update:modelValue', 'save']);

const defaultSchema = z.object({
    created_at: z.string(),
    description: z.string().optional(),
    amount: z.number().positive('Amount needs to be more than 0'),
});

const incomeSchema = z.object({ type: z.literal('Income') });
const expenseSchema = z.object({
    type: z.literal('Expense'),
    category: z.enum(getValues(TransactionCategory)),
});
const investmentSchema = z.object({ type: z.literal('Investment') });
const savingSchema = z.object({ type: z.literal('Saving') });

const schema = z.intersection(
    z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
    defaultSchema
);

const form = ref();
const isLoading = ref(false);
const supabase = useSupabaseClient<Database>();
const { toastError, toastSuccess } = useAppToast();

const notifyError = (e: any) => {
    if (hasErrorMessage(e)) {
        toastError({
            title: 'Transaction not saved',
            description: e.message,
        });
    }
};

const saveForm = async () => {
    if (form.value.errors.length) {
        return;
    }

    isLoading.value = true;
    try {
        const { error } = await supabase.from('transactions').upsert({ ...state.value });
        if (error) {
            notifyError(error);
            return;
        }

        toastSuccess({title: 'Transaction saved',});
        isOpen.value = false;
        emit('save');

    } catch (e) {
        notifyError(e);

    } finally {
        isLoading.value = false;
    }
};

const initialState = {
    type: undefined,
    amount: 0,
    created_at: undefined,
    description: undefined,
    category: undefined,
};

const state = ref<TablesInsert<'transactions'>>({ ...initialState });

const resetForm = () => {
    state.value = { ...initialState };
    form.value.clear();
};

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => {
        if (!value) {
            resetForm();
        }

        emit('update:modelValue', value);
    },
});
</script>

<style scoped lang="postcss">

</style>
