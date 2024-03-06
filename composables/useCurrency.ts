export const useCurrency = (amount: any) => {
    const currency = computed(
        () => new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(toValue(amount))
    );

    return { currency };
}
