<template>
    <footer
        class="bg-neutral-800"
        aria-labelledby="footer-heading"
    >
        <h2
            id="footer-heading"
            class="sr-only"
        >
            Footer
        </h2>
        <div class="mx-auto max-w-7xl px-6 pb-8 pt-8 sm:pt-16 lg:px-8 xl:pt-32">
            <div class="grid grid-cols-3 gap-8 xl:col-span-3 pt-16 xl:pt-0">
                <div class="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                        <h3 class="text-sm font-semibold leading-6 text-white">
                            Products
                        </h3>
                        <ul
                            role="list"
                            class="mt-6 space-y-4"
                        >
                            <li
                                v-for="item in navigation.products"
                                :key="item.name"
                            >
                                <NuxtLink
                                    :to="item.to"
                                    class="text-sm leading-6 text-gray-300 hover:text-white"
                                >
                                    {{ item.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="md:grid md:grid-cols-2 md:gap-8">
                    <div class="mt-10 md:mt-0">
                        <h3 class="text-sm font-semibold leading-6 text-white">
                            Resources
                        </h3>
                        <ul
                            role="list"
                            class="mt-6 space-y-4"
                        >
                            <li
                                v-for="item in navigation.resources"
                                :key="item.name"
                            >
                                <NuxtLink
                                    :to="item.to"
                                    class="text-sm leading-6 text-gray-300 hover:text-white"
                                >
                                    {{ item.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="md:grid md:grid-cols-2 md:gap-8">
                    <div class="mt-10 md:mt-0">
                        <h3 class="text-sm font-semibold leading-6 text-white">
                            More
                        </h3>
                        <ul
                            role="list"
                            class="mt-6 space-y-4"
                        >
                            <li
                                v-for="item in navigation.more"
                                :key="item.name"
                            >
                                <NuxtLink
                                    :to="item.to"
                                    class="text-sm leading-6 text-gray-300 hover:text-white"
                                >
                                    {{ item.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
                <div class="flex space-x-6 md:order-2">
                    <a
                        v-for="item in navigation.social"
                        :key="item.name"
                        target="_blank"
                        :href="item.href"
                        class="text-white"
                        :class="item.hoverClass"
                    >
                        <span class="sr-only">{{ item.name }}</span>
                        <UIcon
                            :name="item.icon"
                            class="h-6 w-6 text-bl"
                            aria-hidden="true"
                            dynamic
                        />
                    </a>
                </div>

                <p class="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
                    &copy; {{ new Date().getFullYear() }} IndamFake Bank
                    &bull;
                    This website and its content is copyright of IndamFake (Honestly, no)
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const navigation = {
    products: [
        { name: 'Credit Cards', to: '/products/credit-cards/' },
        { name: 'Debit Cards', to: '/products/debit-cards/' },
        { name: 'Investments', to: '/products/investments/' },
        { name: 'Savings', to: '/products/savings/' },
        { name: 'Mortgage', to: '/products/mortgage/' },
    ],
    resources: [
        { name: 'Terms And Conditions', to: '/terms/' },
        { name: 'Privacy Policy', to: '/privacy/' },
    ],
    more: [
        { name: 'About', to: '/about/' },
        { name: 'Articles', to: '/articles/' },
        { name: 'Contacts', to: '/contacts/' },
        { name: 'Reviews', to: '/reviews/' },
    ],
    social: [
        {
            name: 'GitHub',
            href: SOCIALS.github,
            icon: 'i-mdi-github',
            hoverClass: 'hover:text-gray-200'
        },
        {
            name: 'LinkedIn',
            href: SOCIALS.linkedin,
            icon: 'i-mdi-linkedin',
            hoverClass: 'hover:text-blue-500'
        },
        {
            name: 'Telegram',
            href: SOCIALS.telegram,
            icon: 'i-mdi-telegram',
            hoverClass: 'hover:text-blue-400'
        },
    ],
};
</script>

<style scoped lang="postcss">

</style>
