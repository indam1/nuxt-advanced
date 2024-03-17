<template>
    <AppSection class="bg-gradient-to-b !pb-4">
        <h1 class="mt-4">
            {{ page.title }}
        </h1>
        <div class="flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-8">
            <div class="flex">
                <p class="mr-2">
                    Updated at {{ page.dateModified }}
                </p>
            </div>
            <ul class="flex gap-8">
                <li
                    v-for="topic in page.topics"
                    :key="topic"
                    class="hover:underline"
                >
                    #{{ topic }}
                </li>
            </ul>
        </div>
    </AppSection>
    <AppSection class="justify-center pb-8">
        <div>
            <ContentDoc class="prose md:prose-lg lg:prose-xl" />
        </div>
        <div class="mt-16 md:mt-32">
            <div class="flex flex-col md:flex-row justify-between items-center gap-y-2 md:gap-0 mt-2">
                <p
                    v-if="page.datePublished !== page.dateModified"
                    class="order-4 md:order-2 text-sm md:inline text-zinc-300"
                >
                    Originally published at {{ page.datePublished }}
                </p>
            </div>
        </div>
    </AppSection>
</template>

<script setup lang="ts">
const { page } = useContent();
</script>
