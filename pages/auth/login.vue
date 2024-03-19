<template>
    <AppSection class="mt-40">
        <UCard
            v-if="!success"
        >
            <template #header>
                Sign-in to IndamFake Bank
            </template>

            <form @submit.prevent="handleLogin">
                <UFormGroup
                    label="Email"
                    name="email"
                    class="mb-4"
                    :required="true"
                    help="You will receive an email with the confirmation link"
                >
                    <UInput
                        v-model="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                </UFormGroup>

                <UButton
                    type="submit"
                    label="Sign-in"
                    :loading="pending"
                    :disabled="pending"
                />
            </form>
        </UCard>
        <UCard v-else>
            <template #header>
                Email has been sent
            </template>

            <div class="text-center">
                <p>We have sent an email to <strong>{{ email }}</strong> with a link to sign-in</p>
                <p>
                    <strong>Important:</strong> The link will expire in 5 minutes.
                </p>
            </div>
        </UCard>
    </AppSection>
</template>

<script setup lang="ts">
import type {Database} from "~/utils/supabase";

definePageMeta({
    layout: 'registration',
    documentDriven: false,
});

const email = ref('');
const { success, pending, handleLogin } = useLoginHandling(email);

useRedirectIfAuthenticated();

function useLoginHandling(email: Ref<string>) {
    const success = ref(false);
    const pending = ref(false);

    const { toastError } = useAppToast();
    const { baseUrl } = useRuntimeConfig().public;
    const supabase = useSupabaseClient<Database>();

    const handleLogin = async () => {
        pending.value = true;

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email.value,
                options: {
                    emailRedirectTo: `${baseUrl}/auth/confirm`,
                },
            });

            if (error) {
                toastError({
                    title: 'Error authenticating',
                    description: error.message,
                });
                return;
            }

            success.value = true;

        } finally {
            pending.value = false;
        }
    };

    return { pending, success, handleLogin };
}
</script>
