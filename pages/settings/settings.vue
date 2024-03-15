<template>
    <UForm
        :state="state"
        :schema="transactionViewSchema"
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
            label="Save"
            :loading="pending"
            :disabled="disabled"
        />
    </UForm>
</template>

<script setup lang="ts">
const { transactionView } = useTransactionView();

const state = ref({ transactionView: transactionView.value });
const disabled = computed(() => pending.value || (transactionView.value === state.value.transactionView));

const { pending, saveProfile } = useSavingUser(state.value);
</script>

<style scoped lang="postcss">

</style>
