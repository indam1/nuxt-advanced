<template>
    <div class="grid grid-cols-6 rounded-3xl bg-white px-40 py-16 gap-20">
        <UForm
            :schema="mortgageSchema"
            :state="state"
            class="col-span-4 grid grid-cols-4 grid-rows-8 gap-4"
        >
            <div class="flex flex-row justify-between items-center col-span-4">
                <span>Calculate your approximate payment</span>
                <span>Step 1 of 3</span>
            </div>
            <UFormGroup
                name="type"
                class="col-span-4"
            >
                <USelect
                    v-model="state.currentType"
                    size="xl"
                    label="Mortgage type"
                    :options="mortgageTypeOptions"
                />
            </UFormGroup>
            <UFormGroup
                name="amount"
                class="col-span-2"
            >
                <UInput
                    v-model="state.amount"
                    type="number"
                    size="xl"
                    placeholder="Amount, $"
                />
            </UFormGroup>
            <UFormGroup
                name="downPayment"
                class="col-span-2"
            >
                <UInput
                    v-model="state.downPayment"
                    type="number"
                    size="xl"
                    placeholder="Down payment, $"
                />
            </UFormGroup>
            <div class="col-span-4 relative items-center">
                <UInput
                    v-model="state.duration"
                    class="absolute top-0 left-0 w-full"
                    placeholder="Duration, %"
                    type="number"
                    size="xl"
                    :min="minDuration"
                    :max="maxDuration"
                />
                <URange
                    v-model="state.duration"
                    :min="minDuration"
                    :max="maxDuration"
                    size="2xs"
                    class="absolute bottom-0 left-0"
                />
            </div>
            <span class="flex col-span-1 items-center">Contact info</span>
            <UFormGroup
                name="fullName"
                class="col-span-4"
            >
                <UInput
                    v-model="state.fullName"
                    placeholder="Full Name"
                    size="xl"
                />
            </UFormGroup>
            <UFormGroup
                name="phoneNumber"
                class="col-span-2"
            >
                <UInput
                    v-model="state.phoneNumber"
                    placeholder="Phone number"
                    size="xl"
                />
            </UFormGroup>
            <UFormGroup
                name="email"
                class="col-span-2"
            >
                <UInput
                    v-model="state.email"
                    placeholder="Email"
                    size="xl"
                />
            </UFormGroup>
            <UDivider class="col-span-4" />
            <UButton
                class="col-span-1"
                size="xl"
                label="Next"
            />
        </UForm>
        <div class="col-span-2 flex flex-col">
            <template v-if="isValidAmount">
                <span class="text-base">Result amount</span>
                <span class="text-2xl font-semibold mt-4">{{ mortgageCost }}$</span>
                <span class="text-base mt-8">Monthly payment</span>
                <span class="text-2xl font-semibold mt-4">{{ monthlyPayment }}$</span>
                <span class="text-base mt-8">Interest rate</span>
                <span class="text-2xl font-semibold mt-4">{{ interestRate }}%</span>
            </template>
            <template v-else>
                <span class="text-xs">Result amount</span>
                <span>Result amount must be more than {{ minResultAmount }}$ and less than {{ maxResultAmount }}$</span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

const state = reactive({
    amount: 3500000,
    downPayment: 525000,
    duration: 30,
    currentType: 'type1',
    fullName: '',
    phoneNumber: '',
    email: '',
});
const minDuration = ref(1);
const maxDuration = ref(30);
const mortgageTypeOptions = [
    { name: 'Type 1', value: 'type1' },
    { name: 'Type 2', value: 'type2' },
    { name: 'Type 3', value: 'type3' },
    { name: 'Type 4', value: 'type4' },
];
const interestRates: Record<string, number> = {
    type1: 16.9,
    type2: 10,
    type3: 15,
    type4: 20,
};
const limits: Record<string, { min: number; max: number }> = {
    type1: { min: 500000, max: 10000000 },
    type2: { min: 500000, max: 20000000 },
    type3: { min: 1000000, max: 40000000 },
    type4: { min: 500000, max: 50000000 },
};
const mortgageCost = computed(() => state.amount - state.downPayment);
const interestRate = computed(() => interestRates[state.currentType]);
const minResultAmount = computed(() => limits[state.currentType].min);
const maxResultAmount = computed(() => limits[state.currentType].max);
const isValidAmount = computed(() => state.amount >= minResultAmount.value && state.amount <= maxResultAmount.value);
const monthlyInterestRate = computed(() => interestRate.value / 1200);
const mortgageTerm = computed(() => Math.pow(1 + monthlyInterestRate.value, state.duration * 12));
const monthlyPayment = computed(() => Math.floor(mortgageCost.value * monthlyInterestRate.value * mortgageTerm.value / ((mortgageTerm.value - 1))
));

const mortgageSchema = z.object({
    amount: z.number({ required_error: 'Amount is required' }),
    downPayment: z.number({ required_error: 'Down payment is required' }).min(Math.floor(state.amount * 0.15), 'At least 15% of the amount'),
    fullName: z.string({ required_error: 'Full name is required' }),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
});
</script>
