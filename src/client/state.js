const gameUpdates = [];

export function processGameUpdate(update) {
  console.log(update)
}

export function getCurrentState() {
  return gameUpdates[gameUpdates.length - 1]
}