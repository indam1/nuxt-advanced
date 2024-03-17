<template>
    <NuxtLink
        :to="article._path"
        class="group border-l-4 border-green-400 relative flex flex-col justify-between hover:bg-gradient-to-r hover:-translate-y-2 hover:border-zinc-300 transition-all duration-500 from-green-500/60 to-green-600/60 p-8 bg-gray-300 rounded-2xl"
    >
        <h3 class="text-2xl font-semibold">
            {{ article.title }}
        </h3>
        <div class="mt-4 md:mt-2 md:flex gap-4">
            <div>{{ article.datePublished }}</div>
            <ul class="flex gap-2">
                <li
                    v-for="topic in article.topics"
                    :key="topic"
                >
                    #{{ topic }}
                </li>
            </ul>
        </div>
        <p
            v-if="article.description"
            class="mt-8 !font-normal text-gray-700 group-hover:text-gray-800"
        >
            {{ article.description }}
        </p>
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    article: any
}>();
const { article } = toRefs(props);
</script>
