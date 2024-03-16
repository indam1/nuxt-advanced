<template>
    <div class="flex flex-col gap-24">
        <AppSection inner-class="gap-12 pt-20">
            <h1 class="text-4xl font-extrabold text-opacity-100 text-black text-center">
                This is a short answer to the question why we are a cool bank
            </h1>
            <p>This is a brief overview of the benefits of our products</p>
            <UButton
                label="Buy something"
                class="px-8 py-4 rounded-xl text-sm"
            />
            <img
                alt=""
                src="@/public/main.png"
            >
        </AppSection>
        <AppSection inner-class="gap-12 w-full">
            <h1 class="text-4xl font-extrabold text-opacity-100 text-black text-center">
                Recommended products
            </h1>
            <div class="grid grid-cols-6 grid-rows-2 gap-12 w-full">
                <UCard
                    class="col-span-3 transition duration-500 hover:scale-105 rounded-3xl"
                    :ui="{ body: { base: 'min-h-64' } }"
                >
                    <template #header>
                        <h2 class="text-xl">
                            Credit Cards
                        </h2>
                    </template>
                    Some text with description
                    <template #footer>
                        <UButton label="Click me" />
                    </template>
                </UCard>
                <UCard
                    class="col-span-3 transition duration-500 hover:scale-105 rounded-3xl"
                    :ui="{ body: { base: 'h-64' } }"
                >
                    <template #header>
                        <h2 class="text-xl">
                            Debit Cards
                        </h2>
                    </template>
                    Some text with description
                    <template #footer>
                        <UButton label="Click me" />
                    </template>
                </UCard>
                <UCard
                    class="col-span-2 transition duration-500 hover:scale-105 rounded-3xl"
                    :ui="{ body: { base: 'h-64' } }"
                >
                    <template #header>
                        <h2 class="text-xl">
                            Investments
                        </h2>
                    </template>
                    Some text with description
                    <template #footer>
                        <UButton label="Click me" />
                    </template>
                </UCard>
                <UCard
                    class="col-span-2 transition duration-500 hover:scale-105 rounded-3xl"
                    :ui="{ body: { base: 'h-64' } }"
                >
                    <template #header>
                        <h2 class="text-xl">
                            Savings
                        </h2>
                    </template>
                    Some text with description
                    <template #footer>
                        <UButton label="Click me" />
                    </template>
                </UCard>
                <UCard
                    class="col-span-2 transition duration-500 hover:scale-105 rounded-3xl"
                    :ui="{ body: { base: 'h-64' } }"
                >
                    <template #header>
                        <h2 class="text-xl">
                            Mortgage
                        </h2>
                    </template>
                    Some text with description
                    <template #footer>
                        <UButton label="Click me" />
                    </template>
                </UCard>
            </div>
            <UButton label="All products" />
        </AppSection>
        <AppSection inner-class="gap-12 w-full">
            <h1 class="text-4xl font-extrabold text-opacity-100 text-black text-center">
                Additionally
            </h1>
            <div class="grid grid-cols-3 gap-12 w-full">
                <UCard
                    class="transition duration-500 hover:scale-105 rounded-3xl"
                    :ui="{ body: { base: 'h-32' } }"
                >
                    <template #header>
                        Support
                    </template>
                    We wanna help you
                    <template #footer>
                        <UButton label="More details" />
                    </template>
                </UCard>
                <UCard
                    class="transition duration-500 hover:scale-105 rounded-3xl"
                    :ui="{ body: { base: 'h-32' } }"
                >
                    <template #header>
                        Review
                    </template>
                    Read all our reviews
                    <template #footer>
                        <UButton label="More details" />
                    </template>
                </UCard>
                <UCard
                    class="transition duration-500 hover:scale-105 rounded-3xl"
                    :ui="{ body: { base: 'h-32' } }"
                >
                    <template #header>
                        Contacts
                    </template>
                    Find suitable contact and call us
                    <template #footer>
                        <UButton label="More details" />
                    </template>
                </UCard>
            </div>
        </AppSection>
        <AppSection inner-class="gap-12 w-full pb-20">
            <h1 class="text-4xl font-extrabold text-opacity-100 text-black text-center">
                Ask us
            </h1>
            <div class="w-full grid grid-cols-6 grid-rows-3 gap-x-12 gap-y-4">
                <UTextarea
                    class="col-span-4 row-span-3 h-full"
                    :ui="{
                        base: 'h-full'
                    }"
                />
                <p class="col-span-2">
                    Fill form with your email and we will get back to you soon
                </p>
                <UInput
                    class="col-span-2"
                    placeholder="Email"
                    type="email"
                    name="email"
                />
                <UButton
                    class="col-span-2"
                    label="Send"
                />
            </div>
        </AppSection>
    </div>
</template>
<script setup lang="ts">
</script>
