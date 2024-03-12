import type {Database} from "~/types/supabase";

export const useSavingUser = (state: { name?: string, email?: string, transactionView?: string }) => {
    const user = useSupabaseUser();
    const pending = ref(false);
    const { toastError, toastSuccess } = useAppToast();
    const supabase = useSupabaseClient<Database>();

    const saveProfile = async () => {
        pending.value = true;

        try {
            const attributes: { data: { full_name?: string, transaction_view?: string }, email?: string } = { data: {} };
            if (state.email !== undefined) {
                if (state.email !== (user.value?.email ?? '')) {
                    attributes.email = state.email;
                }
            }

            if (state.name !== undefined) {
                attributes.data.full_name = state.name;
            }

            if (state.transactionView !== undefined) {
                attributes.data.transaction_view = state.transactionView;
            }

            const { error } = await supabase.auth.updateUser(attributes);

            if (error) {
                toastError({
                    title: 'Error updating profile',
                    description: error.message,
                });
                return;
            }

            toastSuccess({
                title: 'Profile updated',
            });
        } catch (e: any) {
            toastError({
                title: 'Error updating profile',
                description: e.message,
            });

        } finally {
            pending.value = false;
        }
    };

    return { pending, saveProfile };
};
