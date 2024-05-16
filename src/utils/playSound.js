export default function playSound(sound, audioEnabled) {
    if (!audioEnabled) return;
    const audio = new Audio(`/audios/${sound}.mp3`);
    audio.play();
}
