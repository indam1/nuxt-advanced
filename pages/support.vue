<template>
    <main>
        <!-- Messages -->
        <div
            id="messages"
            class="flex-grow flex flex-col justify-end px-4 py-8"
        >
            <div
                v-for="message in messages"
                :key="message.date"
                class="flex items-center mb-4"
            >
                <div class="flex flex-col">
                    <p class="text-gray-500 mb-1 text-xs ml-10">
                        {{ message.user }}
                    </p>
                    <div class="flex items-center">
                        <NuxtImg
                            :src="'https://www.gravatar.com/avatar/' + encodeURIComponent(message.user + Math.random()) + '?s=512&d=monsterid'"
                            alt="Avatar"
                            class="w-8 h-8 rounded-full"
                            format="webp"
                        />
                        <div class="ml-2 bg-gray-800 rounded-lg p-2">
                            <p class="text-white">
                                {{ message.text }}
                            </p>
                        </div>
                    </div>
                    <p class="text-gray-500 mt-1 text-xs ml-10">
                        {{ message.date }}
                    </p>
                </div>
            </div>
        </div>

        <WebSocketChatBox v-model="messages" />
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    documentDriven: false
});

definePageMeta({
    layout: 'websocket',
});
const messages = ref<Array<any>>([]);
</script>
