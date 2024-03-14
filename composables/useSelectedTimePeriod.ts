import {TransactionViewOption} from "~/constants";
import {endOfDay, endOfMonth, endOfYear, startOfDay, startOfMonth, startOfYear, sub} from 'date-fns';

export const useSelectedTimePeriod = (period: Ref<TransactionViewOption>) => {
    const data = computed(() => ({
        date: new Date(),
        period: period.value,
    }));

    const current = computed(() => {
        switch (data.value.period) {
            case TransactionViewOption.Yearly:
                return {
                    from: startOfYear(data.value.date),
                    to: endOfYear(data.value.date),
                };
            case TransactionViewOption.Monthly:
                return {
                    from: startOfMonth(data.value.date),
                    to: endOfMonth(data.value.date),
                };
            case TransactionViewOption.Daily:
                return {
                    from: startOfDay(data.value.date),
                    to: endOfDay(data.value.date),
                };
            default:
                return {
                    from: startOfYear(data.value.date),
                    to: endOfYear(data.value.date),
                };
        }
    });

    const previous = computed(() => {
        switch (data.value.period) {
            case TransactionViewOption.Yearly:
                return {
                    from: startOfYear(sub(data.value.date, {years: 1})),
                    to: endOfYear(sub(data.value.date, {years: 1})),
                };
            case TransactionViewOption.Monthly:
                return {
                    from: startOfMonth(sub(data.value.date, {months: 1})),
                    to: endOfMonth(sub(data.value.date, {months: 1})),
                };
            case TransactionViewOption.Daily:
                return {
                    from: startOfDay(sub(data.value.date, {days: 1})),
                    to: endOfDay(sub(data.value.date, {days: 1})),
                };
            default:
                return {
                    from: startOfYear(sub(data.value.date, {years: 1})),
                    to: endOfYear(sub(data.value.date, {years: 1})),
                };
        }
    });

    return { current, previous };
};
