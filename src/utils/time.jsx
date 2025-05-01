import { useFastForwardSpeed, useIsSkipped, useStartedStore } from "./store";

export function delayInMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getSpeed(){
  return (1/(useFastForwardSpeed.getState().fastForwardSpeed))
}

export function getIsSkipped(){
  return useIsSkipped.getState().isSkipped
}

export function getStarted(){
  return useStartedStore.getState().started
}