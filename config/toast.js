export default {
    position: 'top-right',
    duration: 2000,
    keepOnHover: true,
    fullWidth: false,
    containerClass: "max-w-sm",
    iconPack: "mdi",
    action: {
        icon: 'close',
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    },
}