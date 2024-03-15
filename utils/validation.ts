import { z } from 'zod';

export const profileChangeSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email(),
});

export const transactionViewSchema = z.object({
    transactionView: z.enum(getValues(TransactionViewOption))
});

const defaultTransactionModalSchema = z.object({
    created_at: z.string(),
    description: z.string().optional(),
    amount: z.number().positive('Amount needs to be more than 0'),
});

const incomeTransactionModalSchema = z.object({
    type: z.literal('Income')
});
const expenseTransactionModalSchema = z.object({
    type: z.literal('Expense'),
    category: z.enum(getValues(TransactionCategory)),
});
const investmentTransactionModalSchema = z.object({
    type: z.literal('Investment')
});
const savingTransactionModalSchema = z.object({
    type: z.literal('Saving')
});

export const transactionModalSchema = z.intersection(
    z.discriminatedUnion('type', [
        incomeTransactionModalSchema,
        expenseTransactionModalSchema,
        investmentTransactionModalSchema,
        savingTransactionModalSchema
    ]),
    defaultTransactionModalSchema
);
