export default function playSound(sound, audioEnabled, volume) {
    if (!audioEnabled) return;
    const audio = new Audio(`/audios/${sound}`);
    if (volume) audio.volume = volume;
    audio.play();
}
