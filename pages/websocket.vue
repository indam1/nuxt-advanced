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
                        <img
                            :src="'https://www.gravatar.com/avatar/' + encodeURIComponent(message.user + Math.random()) + '?s=512&d=monsterid'"
                            alt="Avatar"
                            class="w-8 h-8 rounded-full"
                        >
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

        <!-- Chatbox -->
        <div
            class="bg-gray-800 px-4 py-2 flex items-center justify-between fixed bottom-0 w-full"
        >
            <div class="w-full min-w-6">
                <input
                    v-model="messageInput"
                    type="text"
                    placeholder="Type your message..."
                    class="w-full rounded-l-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                    @keydown.enter="sendMessage"
                >
            </div>
            <div class="flex">
                <button
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                    @click="sendMessage"
                >
                    Send
                </button>
                <button
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                    @click="open"
                >
                    Reconnect
                </button>
                <button
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg"
                    @click="clear"
                >
                    Clear
                </button>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'websocket',
});
const messageInput = ref<string>('');
const messages = ref<Array<any>>([]);

const { send, open } = useWebSocket('ws://localhost:3000/_ws', {
    autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed() {
            alert('Failed to connect WebSocket after 3 retries');
        },
    },
    heartbeat: {
        message: 'ping',
        interval: 30 * 1000,
        pongTimeout: 1000,
    },
    onMessage(ws, event) {
        const { message = "" } = event.data.startsWith("{")
            ? JSON.parse(event.data)
            : { message: event.data };
        log('system', message);
    },
});

const scroll = () => {
    nextTick(() => {
        const el = document.querySelector("#messages");
        if (!el) {
            console.error(`#messages not found by querySelector`);
            return;
        }
        el.scrollTop = el.scrollHeight;
        el.scrollTo({
            top: el.scrollHeight,
            behavior: "smooth",
        });
    });
};

const log = (user, ...args) => {
    console.log("[ws]", user, ...args);
    messages.value.push({
        text: args.join(" "),
        formattedText: "",
        user: user,
        date: new Date().toLocaleString(),
    });
    scroll();
};

const clear = () => {
    messages.value.splice(0, messages.value.length);
    log("system", "previous messages cleared");
};

const sendMessage = () => {
    if (messageInput.value) {
        console.log(`sending message: ${messageInput.value}`);
        send(messageInput.value);
    }
    messageInput.value = '';
};
</script>

<style scoped lang="postcss">

</style>
