<template>
    <div class="mt-12">
        <AppSection inner-class="flex flex-col gap-12 items-center">
            <h1 class="text-5xl font-extrabold text-center">
                Reviews about us
            </h1>
            <TransitionGroup
                name="list"
                tag="ul"
                class="flex flex-col gap-8 md:gap-16 md:grid md:grid-rows-2 md:grid-cols-2"
            >
                <!--ToDo to component (?) -->
                <UCard
                    v-for="review in reviews"
                    :key="review.id"
                    as="li"
                    :ui="{
                        divide: '',
                    }"
                    class="rounded-3xl"
                >
                    <template #header>
                        <p class="md:whitespace-nowrap text-ellipsis overflow-hidden font-extrabold">
                            {{ review.title }}
                        </p>
                    </template>
                    <p>{{ review.body }}</p>
                </UCard>
            </TransitionGroup>
            <UButton
                v-if="!isShownAll"
                label="Show all"
                @click="isShownAll = true"
            />
        </AppSection>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    documentDriven: false
});

const { $reviewApi } = useNuxtApp();
const reviewRepo = reviewRepository($reviewApi);
const { data } = await useAsyncData(() => reviewRepo.getTwenty());
const isShownAll = ref(false);
const reviews = computed(() => {
    if (isShownAll.value) {
        return data.value;
    }

    return data.value?.slice(0, 10);
});
</script>

<style scoped lang="postcss">
.list-enter-active,
.list-leave-active {
    transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
}
</style>
