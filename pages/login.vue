<template>
    <UCard
        v-if="!success"
    >
        <template #header>
            Sign-in to UsanoFake Bank
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
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'registration',
});

import type {Database} from "~/types/supabase";
const success = ref(false);
const email = ref('');
const pending = ref(false);
const { toastError } = useAppToast();
const supabase = useSupabaseClient<Database>();
const { baseUrl } = useRuntimeConfig().public;

useRedirectIfAuthenticated();

const handleLogin = async () => {
    pending.value = true;

    try {
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                emailRedirectTo: `${baseUrl}/confirm`,
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
</script>

<style scoped lang="postcss">

</style>
