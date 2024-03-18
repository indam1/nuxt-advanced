<template>
    <header class="bg-neutral-50">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <NuxtLink
                    to="/"
                    class="text-xl font-bold mr-12"
                >
                    IndamFake Bank
                </NuxtLink>

                <div class="flex flex-row md:justify-between justify-end gap-8 items-center grow">
                    <MainNavBar
                        class="hidden md:flex"
                        :navigation="navigation"
                    />

                    <UDropdown
                        class="hidden md:flex"
                        mode="hover"
                        :popper="{ placement: 'bottom-end' }"
                        :items="items"
                        :ui="{
                            item: { disabled: 'cursor-text select-text' },
                            width: 'w-64',
                            wrapper: 'rounded hover:bg-gray-200',
                        }"
                    >
                        <div class="flex gap-4 items-center p-2 cursor-default text-blue-500">
                            <span>Personal Account</span>
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

                    <UButton
                        color="gray"
                        class="block md:hidden cursor-default text-blue-500 w-8 h-8"
                        icon="i-heroicons-user"
                        @click="toggleOpened('profile')"
                    />
                    <UButton
                        color="gray"
                        class="block md:hidden cursor-default text-blue-500 w-8 h-8"
                        icon="i-heroicons-bars-3"
                        @click="toggleOpened('navigation')"
                    />
                </div>
            </div>
        </div>

        <UVerticalNavigation
            v-show="opened"
            :links="allItems"
            class="block md:hidden"
        />
    </header>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { url } = useAvatarUrl();

const opened = ref<string | null>(null);
const { toggleOpened, allItems } = useAllItems(opened);

const navigation = {
    Products: [[
        { label: 'Credit Cards', to: '/products/credit-cards/', click: () => opened.value = null },
        { label: 'Debit Cards', to: '/products/debit-cards/', click: () => opened.value = null },
        { label: 'Investments', to: '/products/investments/', click: () => opened.value = null },
        { label: 'Savings', to: '/products/savings/', click: () => opened.value = null },
        { label: 'Mortgage', to: '/products/mortgage/', click: () => opened.value = null },
    ]],
    Resources: [[
        { label: 'Terms And Conditions', to: '/terms/', click: () => opened.value = null },
        { label: 'Privacy Policy', to: '/privacy/', click: () => opened.value = null },
    ]],
    More: [[
        { label: 'About', to: '/about/', click: () => opened.value = null },
        { label: 'What\'s New', to: '/news/', click: () => opened.value = null },
        { label: 'Contacts', to: '/contacts/', click: () => opened.value = null },
        { label: 'Reviews', to: '/reviews/', click: () => opened.value = null },
    ]],
};

const items = [
    [{
        slot: 'account',
        disabled: true,
    }],
    [{
        label: 'My account',
        icon: 'i-heroicons-user-circle',
        to: '/mybank',
        click: () => opened.value = null,
    },
    {
        label: 'Settings',
        icon: 'i-heroicons-cog-8-tooth',
        to: '/settings',
        click: () => opened.value = null,
    },
    {
        disabled: !user.value,
        label: 'Sign out',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: async () => {
            await supabase.auth.signOut();
            navigateTo('/auth/login');
        },
    }]
];

function useAllItems(value: any) {
    const opened = ref(value);
    const toggleOpened = (value: string) => {
        if (opened.value === value) {
            opened.value = null;
            return;
        }

        opened.value = value;
    };

    const allItems = computed(() => {
        if (opened.value === 'profile') {
            return items.filter((item) => !item[0].disabled);
        }

        if (opened.value === 'navigation') {
            return [navigation.Products[0], navigation.Resources[0], navigation.More[0]];
        }

        return [];
    });

    return { allItems, toggleOpened };
}
</script>
