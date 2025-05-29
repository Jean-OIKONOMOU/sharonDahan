if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait").catch(err => console.warn("Orientation lock failed:", err));
}
