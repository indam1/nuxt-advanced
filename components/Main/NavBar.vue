<template>
    <nav class="justify-between">
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
            <div class="text-center p-2 cursor-default w-full">
                {{ key }}
            </div>
            <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>
            </template>
        </UDropdown>
    </nav>
</template>

<script setup lang="ts">
import type {DropdownItem} from "#ui/types";

type Navigation = { [key: string]: Array<Array<DropdownItem>> };
const hover = ref<keyof Navigation | null>(null);
const props = defineProps<{
    navigation: Navigation
}>();
const { navigation } = toRefs(props);
</script>
