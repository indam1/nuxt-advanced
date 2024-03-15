export default defineAppConfig({
    ui: {
        dropdown: {
            transition: {
                enterActiveClass: 'transition duration-250 ease-out',
                enterFromClass: 'transform translate-y-10 opacity-0',
                enterToClass: 'transform translate-y-0 opacity-100',
                leaveActiveClass: 'transition duration-250 ease-in',
                leaveFromClass: 'transform translate-y-0 opacity-100',
                leaveToClass: 'transform translate-y-10 opacity-0',
            },
            background: 'bg-neutral-50',
            ring: '',
            item: {
                inactive: 'bg-gray-100 bg-gray-100 text-neutral-700 text-neutral-700 text-opacity-80 text-opacity-80',
                active: 'bg-gray-200 bg-gray-200 text-neutral-900 text-neutral-900',
            },
        },
        card: {
            background: 'bg-neutral-50 bg-neutral-50',
            ring: '',
            divide: 'divide-gray-300 divide-gray-300',
        },
        formGroup: {
            label: {
                base: 'text-gray-800 text-gray-800',
            },
            help: 'text-gray-800 text-gray-800',
        },
        input: {
            default: {
                placeholder: 'placeholder-gray-400',
                color: 'primary',
            },
            variant: {
                outline: 'text-gray-900',
            },
            color: {
                gray: {
                    outline: 'text-gray-900',
                },
                white: {
                    outline: 'text-gray-900',
                },
            },
        },
    }
});
