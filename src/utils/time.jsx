export function delayInMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}