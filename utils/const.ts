import type {ValueOf} from "type-fest";

export const TransactionViewOptions = {
    Yearly: 'Yearly',
    Monthly: 'Monthly',
    Daily: 'Daily',
} as const;
export type TransactionViewOption = ValueOf<typeof TransactionViewOptions>;

export const TransactionCategories = {
    Food: 'Food',
    Housing: 'Housing',
    Car: 'Car',
    Entertainment: 'Entertainment',
} as const;
export type TransactionCategory = ValueOf<typeof TransactionCategories>;

export const TransactionTypes = {
    Income: 'Income',
    Expense: 'Expense',
    Saving: 'Saving',
    Investment: 'Investment',
} as const;
export type TransactionType = ValueOf<typeof TransactionTypes>;

export const SOCIALS = {
    github: 'https://github.com/indam1/',
    linkedin: 'https://www.linkedin.com/in/andreiusanov/',
    telegram: 'https://t.me/Indam1/',
} as const;
