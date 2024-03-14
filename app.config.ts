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
        }
    }
});
