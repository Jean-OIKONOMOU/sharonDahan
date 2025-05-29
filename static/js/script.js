window.addEventListener("load", () => {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("portrait");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', () => {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('portrait');
        }
    }, { once: true });
});
