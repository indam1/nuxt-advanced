<template>
    <header class="flex justify-between items-center w-full px-4 sm:px-6 lg:px-96 lg:py-3 bg-neutral-50">
        <NuxtLink
            to="/"
            class="text-xl font-bold"
        >
            UsanoFake Bank
        </NuxtLink>

        <MainNavBar />

        <UDropdown
            mode="hover"
            :popper="{ placement: 'bottom-end' }"
            :items="items"
            :ui="{
                item: { disabled: 'cursor-text select-text' },
                width: 'w-64',
                wrapper: 'rounded hover:bg-gray-200',
            }"
        >
            <div class="flex gap-4 items-center p-2 cursor-default text-blue-500 personal-account">
                Personal Account
                <UAvatar
                    v-if="user"
                    :src="url"
                    alt="Avatar"
                />
                <UIcon
                    v-else
                    name="i-heroicons-user"
                />
            </div>

            <template #account>
                <div class="text-left">
                    <p>
                        {{ user ? 'Signed in as' : 'Unsigned' }}
                    </p>
                    <p class="font-medium text-gray-900">
                        {{ user ? user.email : 'Click any active button to sign in' }}
                    </p>
                </div>
            </template>

            <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>

                <UIcon
                    :name="item.icon"
                    class="flex-shrink-0 h-4 w-4 text-gray-500 ms-auto"
                />
            </template>
        </UDropdown>
    </header>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { url } = useAvatarUrl();
const items = [
    [
        {
            slot: 'account',
            disabled: true,
        }
    ],
    [
        {
            label: 'My account',
            icon: 'i-heroicons-user-circle',
            to: '/mybank',
        },
        {
            label: 'Settings',
            icon: 'i-heroicons-cog-8-tooth',
            to: '/settings/profile',
        },
        {
            disabled: !user.value,
            label: 'Sign out',
            icon: 'i-heroicons-arrow-left-on-rectangle',
            click: async () => {
                await supabase.auth.signOut();
                navigateTo('/auth/login');
            },
        }
    ]
];
</script>
