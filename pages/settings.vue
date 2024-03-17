<template>
    <UTabs
        orientation="vertical"
        :items="items"
        :ui="{
            wrapper: 'flex flex-row gap-12 p-10',
            list: {
                width: 'w-48',
                base: 'flex flex-col gap-4',
                background: 'bg-transparent',
            }
        }"
    >
        <template #profile>
            <Profile />
        </template>
        <template #avatar>
            <Avatar />
        </template>
        <template #common>
            <Common />
        </template>
    </UTabs>
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
