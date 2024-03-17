<template>
    <AppSection>
        <h1 class="mt-12 font-extrabold text-5xl">
            What's New
        </h1>
        <div class="space-y-8 md:space-y-0 md:grid grid-cols-2 gap-12 justify-around mt-8">
            <ContentList
                v-slot="{ list }"
                :query="query"
            >
                <ArticlePreview
                    v-for="entry in list"
                    :key="entry._path"
                    :article="entry"
                />
            </ContentList>
        </div>
    </AppSection>
</template>

<script setup lang="ts">
definePageMeta({
    documentDriven: false,
});

const query = { path: '/news', sort: [{ dateModified: -1, datePublished: -1 }] };
</script>
