<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header>
                Add Transaction
            </template>

            <UForm :state="state" :schema="schema" ref="form" @submit="saveForm">
                <UFormGroup label="Transaction Type" :required="true"  name="type" class="mb-4">
                    <USelect placeholder="Select the transaction type" :options="getValues(TransactionType)" v-model="state.type" />
                </UFormGroup>

                <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
                    <UInput type="number" placeholder="Amount" v-model.number="state.amount" />
                </UFormGroup>

                <UFormGroup label="Transaction date" :required="true" name="created_at" class="mb-4">
                    <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at" />
                </UFormGroup>

                <UFormGroup label="Description" hint="Optional" name="description" class="mb-4">
                    <UInput placeholder="Description" v-model="state.description" />
                </UFormGroup>

                <UFormGroup label="Category" hint="Optional" name="category" class="mb-4" v-if="state.type === TransactionType.Expense">
                    <USelect placeholder="Select" :options="getValues(TransactionCategory)" v-model="state.category" />
                </UFormGroup>

                <UButton type="submit" color="black" variant="solid" label="Save" :loading="isLoading" />
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
}>()
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
)

const form = ref();
const isLoading = ref(false);
const supabase = useSupabaseClient<Database>();
const toast = useToast();

const notifyError = (e: any) => {
    if (hasErrorMessage(e)) {
        toast.add({
            title: 'Transaction not saved',
            description: e.message,
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
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

        toast.add({
            title: 'Transaction saved',
            icon: 'i-heroicons-check-circle',
        });
        isOpen.value = false;
        emit('save');

    } catch (e) {
        notifyError(e);

    } finally {
        isLoading.value = false;
    }
}

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
}

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => {
        if (!value) {
            resetForm();
        }

        emit('update:modelValue', value);
    },
})
</script>

<style scoped lang="postcss">

</style>
