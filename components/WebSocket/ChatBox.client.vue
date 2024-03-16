<template>
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
</template>

<script setup lang="ts">
const { send, open } = useWebSocket(`ws://${location.host}/api/websocket`, {
    autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed() {
            alert('Failed to connect WebSocket after 3 retries');
        },
    },
    heartbeat: {
        message: 'ping',
        interval: 10 * 1000,
        pongTimeout: 1000,
    },
    onMessage(ws, event) {
        const { data } = event;
        const { message = "" } = data.startsWith("{") ? JSON.parse(data) : { message: data };
        log('system', message);
    },
});

const messages = defineModel<Array<any>>({ required: true });
const log = (user, ...args) => {
    messages.value.push({
        text: args.join(" "),
        formattedText: "",
        user: user,
        date: new Date().toLocaleString(),
    });
};

const clear = () => {
    messages.value = [];
    log("system", "previous messages cleared");
};

const messageInput = ref<string>('');
const sendMessage = () => {
    if (messageInput.value) {
        send(messageInput.value);
    }
    messageInput.value = '';
};
</script>
