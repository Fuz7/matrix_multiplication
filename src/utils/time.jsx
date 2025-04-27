import { useFastForwardSpeed } from "./store";

export function delayInMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getSpeed(){
  return (1/(useFastForwardSpeed.getState().fastForwardSpeed))
}