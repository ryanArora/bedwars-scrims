// https://stackoverflow.com/a/2450976

const shuffle = (arr: any[]) => {
  let currentIndex = arr.length;
  let randomIndex = 0;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr;
};

export default shuffle;
