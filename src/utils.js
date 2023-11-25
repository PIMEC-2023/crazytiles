export const playAudioFile = (audioFile, soundVolume) => {
    var audio = new Audio(audioFile)
    audio.volume = soundVolume
    audio.play();
}