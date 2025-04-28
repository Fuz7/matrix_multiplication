import { create } from "zustand";

export const useMatrixSizeStore = create((set) => {
  return {
    matrixSize: "small",
    setMatrixSize: (size) => set({ matrixSize: size }),
  };
});

export const useStartedStore = create((set) => {
  return {
    started: false,
    setStarted: (playing) => set({ started: playing }),
  };
});

export const useMultiplicationType = create((set) => {
  return {
    multiplicationType: "standard",
    setMultiplicationType: (type) => set({ multiplicationType: type }),
  };
});

export const useFastForwardSpeed = create((set) => {
  return {
    fastForwardSpeed: 1,
    setFastForwardSpeed: (speed) => set({ fastForwardSpeed: speed }),
  };
});
export const useIsResultButtonVisible = create((set) => {
  return {
    isResultVisible: false,
    setIsResultVisible: (isVisible) => set({ isResultVisible: isVisible }),
  };
});

export const useIsMultiplicationFinished = create((set) => {
  return {
    isMultiplicationFinished: false,
    setIsMultiplicationFinished: (isFinished) =>
      set({ isMultiplicationFinished: isFinished }),
  };
});

// export const useMatrix1DimensionStore = create((set)=>{
//     return{
//         columnSize: '',
//         setColumnSize:(size)=> set({columnSize:size}),
//         rowSize:'',
//         setRowSize:'',
//     }
// })
