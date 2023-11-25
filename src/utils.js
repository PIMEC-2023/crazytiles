export const playAudioFile = (audioFile, soundVolume) => {
    var audio = new Audio(audioFile)
    audio.volume = soundVolume
    audio.play();
}

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  
  export const board = (x, y, arrayImgs) => {
    const tilesArray = [];
    const totalTiles = x * y;
    if (arrayImgs) {
      shuffleArray(arrayImgs);
    }
    for (let i = 0; i < totalTiles / 2; i++) {
      if (!arrayImgs) {
        tilesArray.push(i);
      } else {
        tilesArray.push(arrayImgs[i]);
      }
    }
    tilesArray.push(...tilesArray);
    shuffleArray(tilesArray);
    return tilesArray;
  };
  
  export const formatTime = (value) => {
    const valString = value + "";
    return valString.length < 2 ? "0" + valString : valString;
  };
  