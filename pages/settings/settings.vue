<template>
    <UForm
        :state="state"
        :schema="schema"
        @submit="saveProfile"
    >
        <UFormGroup
            label="Transaction View"
            class="mb-4"
            help="Choose how you would like to view transactions"
        >
            <USelect
                v-model="state.transactionView"
                :options="getValues(TransactionViewOption)"
            />
        </UFormGroup>

        <UButton
            type="submit"
            color="black"
            variant="solid"
            label="Save"
            :loading="pending"
            :disabled="disabled"
        />
    </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod';
import {TransactionViewOption} from '~/constants';
import {getValues} from "~/lib/enum";
const user = useSupabaseUser();
const transactionView = computed(() => user.value?.user_metadata?.transaction_view ?? TransactionViewOption.Monthly);
const state = ref({
    transactionView: transactionView.value,
});
const schema = z.object({
    transactionView: z.enum(getValues(TransactionViewOption))
});

const { pending, saveProfile } = useSavingUser(state.value);
const disabled = computed(() => pending.value || (transactionView.value === state.value.transactionView));
</script>

<style scoped lang="postcss">

</style>
