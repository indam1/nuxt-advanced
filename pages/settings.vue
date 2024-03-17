<template>
    <AppSection
        class="py-12"
        inner-class="flex flex-col gap-12"
    >
        <h1 class="text-4xl font-extrabold">
            Settings
        </h1>
        <p>
            Set up your account
        </p>
        <UTabs
            orientation="vertical"
            :items="items"
            :ui="{
                wrapper: 'flex flex-row gap-12',
                list: {
                    width: 'w-48',
                    base: 'flex flex-col gap-4',
                    background: 'bg-transparent',
                }
            }"
        >
            <template #profile>
                <AppSection>
                    <Profile />
                </AppSection>
            </template>
            <template #avatar>
                <AppSection>
                    <Avatar />
                </AppSection>
            </template>
            <template #common>
                <AppSection>
                    <Common />
                </AppSection>
            </template>
        </UTabs>
    </AppSection>
</template>

<script setup lang="ts">
import Profile from "~/components/Setting/Profile.vue";
import Avatar from "~/components/Setting/Avatar.vue";
import Common from "~/components/Setting/Common.vue";

definePageMeta({
    documentDriven: false
});

const items = [
    {
        label: 'Profile',
        slot: 'profile',
    },
    {
        label: 'Avatar',
        slot: 'avatar',
    },
    {
        label: 'More',
        slot: 'common',
    },
];
</script>
