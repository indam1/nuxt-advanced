<template>
    <div class="flex flex-col">
        <AppSection inner-class="gap-12 mt-16 flex flex-col items-center">
            <h1 class="text-3xl md:text-4xl font-extrabold text-opacity-100 text-black text-center">
                This is a short answer to the question why we are a cool bank
            </h1>
            <p class="text-center">
                This is a brief overview of the benefits of our products
            </p>
            <UButton
                label="Buy something"
                class="px-8 py-4 rounded-xl text-sm"
            />
            <NuxtImg
                alt="Lime Logo"
                src="/main.png"
                width="512"
                height="512"
                class="w-48 h-48 md:h-[512px] md:w-[512px]"
                format="webp"
            />
        </AppSection>
        <AppSection
            class="mt-16"
            inner-class="gap-12 flex flex-col items-center"
        >
            <h1 class="text-4xl font-extrabold text-opacity-100 text-black text-center">
                Recommended products
            </h1>
            <div class="md:grid md:grid-cols-6 md:grid-rows-2 flex flex-col gap-12 w-full">
                <ProductCard
                    class="col-span-3"
                    title="Credit Cards"
                    description="Some text with description"
                    to="/products/credit-cards/"
                />
                <ProductCard
                    class="col-span-3"
                    title="Debit Cards"
                    description="Some text with description"
                    to="/products/debit-cards/"
                />
                <ProductCard
                    class="col-span-2"
                    title="Investments"
                    description="Some text with description"
                    to="/products/investments/"
                />
                <ProductCard
                    class="col-span-2"
                    title="Savings"
                    description="Some text with description"
                    to="/products/savings/"
                />
                <ProductCard
                    class="col-span-2"
                    title="Mortgage"
                    description="Some text with description"
                    to="/products/mortgage/"
                />
            </div>
            <UButton label="All products" />
        </AppSection>
        <LazyAppSection inner-class="gap-12 flex flex-col items-center">
            <h1 class="text-4xl font-extrabold text-opacity-100 text-black text-center">
                Additionally
            </h1>
            <div class="flex flex-col md:grid md:grid-cols-3 gap-12 w-full">
                <UCard class="transition duration-500 hover:scale-105 rounded-3xl">
                    <template #header>
                        Support
                    </template>
                    We wanna help you
                    <template #footer>
                        <UButton label="More details" />
                    </template>
                </UCard>
                <UCard class="transition duration-500 hover:scale-105 rounded-3xl">
                    <template #header>
                        Review Title: <strong>{{ pending ? 'Loading review title' : data?.title ?? 'No Title' }}</strong>
                    </template>
                    {{ pending ? 'Loading review' : data?.body ?? 'Oops, no review' }}
                    <template #footer>
                        <UButton label="Read all" />
                    </template>
                </UCard>
                <UCard class="transition duration-500 hover:scale-105 rounded-3xl">
                    <template #header>
                        Contacts
                    </template>
                    Find suitable contact and call us
                    <template #footer>
                        <UButton label="More details" />
                    </template>
                </UCard>
            </div>
        </LazyAppSection>
        <LazyAppSection inner-class="gap-12 flex flex-col items-center">
            <h1 class="text-4xl font-extrabold text-opacity-100 text-black text-center">
                Ask us
            </h1>
            <div class="w-full grid md:grid-cols-6 md:grid-rows-3 gap-x-2 md:gap-x-12 gap-y-4">
                <UTextarea
                    class="order-2 md:order-1 col-span-4 row-span-3 h-full"
                    :ui="{
                        base: 'h-full'
                    }"
                    aria-label="Your question"
                />
                <p class="order-1 md:order-2 col-span-2">
                    Fill form with your email and we will get back to you soon
                </p>
                <UInput
                    class="col-span-2 order-3 md:order-3"
                    placeholder="Email"
                    type="email"
                    name="email"
                />
                <UButton
                    class="col-span-2 order-4 md:order-4"
                    label="Send"
                />
            </div>
        </LazyAppSection>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    documentDriven: false
});

const { $reviewApi } = useNuxtApp();
const reviewRepo = reviewRepository($reviewApi);
const { data, pending } = await useLazyAsyncData(() => reviewRepo.getFirst());
</script>
