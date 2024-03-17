<template>
    <div>
        <div class="mb-4">
            <UFormGroup
                label="Current avatar"
                class="w-full"
                help="This would be blank by default"
            >
                <UAvatar
                    :src="url"
                    size="3xl"
                />
            </UFormGroup>
        </div>

        <div class="mb-4">
            <UFormGroup
                label="New avatar"
                class="w-full"
                name="avatar"
                help="After choosing an image click Save to actually upload the new avatar"
            >
                <UInput
                    ref="fileInput"
                    type="file"
                />
            </UFormGroup>
        </div>

        <UButton
            type="submit"
            label="Save"
            :loading="uploading"
            :disabled="uploading"
            @click="saveAvatar"
        />
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { toastSuccess, toastError } = useAppToast();
const { url } = useAvatarUrl();

const uploading = ref(false);
const fileInput = ref<InstanceType<typeof UInput>>(); // Reference to an input with ref="fileInput" attribute

const saveAvatar = async () => {
    const input = fileInput.value?.input;
    const file = input?.files?.[0];
    if (!input || !file) {
        toastError({ title: 'Select a file to upload first'});
        return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    try {
        uploading.value = true;
        const currentAvatarUrl = user.value?.user_metadata?.avatar_url;
        const { error } = await supabase.storage.from('avatars').upload(fileName, file);
        if (error) {
            toastError({ title: 'Error uploading avatar', description: error.message });
            return;
        }

        await supabase.auth.updateUser({
            data: {
                avatar_url: fileName,
            }
        });

        if (currentAvatarUrl) {
            const { error } = await supabase.storage.from('avatars').remove([currentAvatarUrl]);
            if (error) {
                toastError({ title: 'Error deleting old avatar', description: error.message });
            } else {
                toastSuccess({ title: 'Old avatar deleted' });
            }
        }

        toastSuccess({ title: 'New avatar uploaded' });

    } catch (error: any) {
        toastError({ title: 'Error uploading avatar', description: error.message });

    } finally {
        uploading.value = false;
    }
};
</script>

<style scoped lang="postcss">

</style>
