type ToastData = {
    title: string;
    description?: string;
};

export const useAppToast = () => {
    const { add } = useToast();

    return {
        toastSuccess: ({ title, description }: ToastData) => {
            add({
                title,
                description,
                icon: 'i-heroicons-check-circle',
                color: 'green',
            });
        },
        toastError: ({ title, description }: ToastData) => {
            add({
                title,
                description,
                icon: 'i-heroicons-exclamation-circle',
                color: 'red',
            });
        },
    };
};
