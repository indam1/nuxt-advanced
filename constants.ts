export const TransactionViewOption = {
    Yearly: 'Yearly',
    Monthly: 'Monthly',
    Daily: 'Daily',
} as const;
export type TransactionViewOption = typeof TransactionViewOption[keyof typeof TransactionViewOption];

export const TransactionCategory = {
    Food: 'Food',
    Housing: 'Housing',
    Car: 'Car',
    Entertainment: 'Entertainment',
} as const;
export type TransactionCategory = typeof TransactionCategory[keyof typeof TransactionCategory];

export const TransactionType = {
    Income: 'Income',
    Expense: 'Expense',
    Saving: 'Saving',
    Investment: 'Investment',
} as const;
export type TransactionType = typeof TransactionType[keyof typeof TransactionType];
