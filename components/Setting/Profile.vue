<template>
    <UForm
        :state="state"
        :schema="profileChangeSchema"
        @submit="saveProfile"
    >
        <UFormGroup
            class="mb-4"
            label="Full Name"
            name="name"
        >
            <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup
            class="mb-4"
            label="Email"
            name="email"
            help="You will receive an email with the confirmation link"
        >
            <UInput v-model="state.email" />
        </UFormGroup>

        <UButton
            type="submit"
            label="Save"
            :loading="pending"
            :disabled="disabled"
        />
    </UForm>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const state = ref<{ name: string, email: string }>({
    name: user.value?.user_metadata?.full_name ?? '',
    email: user.value?.email ?? '',
});

const disabled = computed(() => pending.value || (((user.value?.email ?? '') === state.value.email) && (user?.value?.user_metadata?.full_name ?? '') === state.value.name));
const { pending, saveProfile } = useSavingUser(state.value);
</script>
