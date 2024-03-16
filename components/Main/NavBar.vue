<template>
    <nav class="flex justify-between">
        <UDropdown
            v-for="(value, key) in navigation"
            :key="key"
            mode="hover"
            :items="value"
            :popper="{ placement: 'bottom' }"
            :ui="{
                item: { disabled: 'cursor-text select-text' },
                width: 'w-64',
                wrapper: `flex w-24 rounded ${hover && hover !== key ? 'text-gray-400' : 'text-gray-900'}`,
            }"
            @mouseover="hover = key"
            @mouseleave="hover = null"
        >
            <div class="text-center p-2 cursor-default personal-account w-full">
                {{ key }}
            </div>
            <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>
            </template>
        </UDropdown>
    </nav>
</template>

<script setup lang="ts">
const hover = ref<string | null>(null);
const navigation = {
    Products: [[
        { label: 'Credit Cards', to: '/products/credit-cards/' },
        { label: 'Debit Cards', to: '/products/debit-cards/' },
        { label: 'Investments', to: '/products/investments/' },
        { label: 'Savings', to: '/products/savings/' },
        { label: 'Mortgage', to: '/products/mortgage/' },
    ]],
    Resources: [[
        { label: 'Terms And Conditions', to: '/terms/' },
        { label: 'Privacy Policy', to: '/privacy/' },
    ]],
    More: [[
        { label: 'About', to: '/about/' },
        { label: 'Articles', to: '/articles/' },
        { label: 'Contacts', to: '/contacts/' },
        { label: 'Reviews', to: '/reviews/' },
    ]],
};
</script>
