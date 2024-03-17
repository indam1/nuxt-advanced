<template>
    <AppSection class="mt-40">
        <UCard>
            <template #header>
                Signing in...
            </template>

            Wait a moment while we sign you in
        </UCard>
    </AppSection>
</template>

<script setup lang="ts">
definePageMeta({
    documentDriven: false
});
useRedirectIfAuthenticated('/mybank');
</script>
