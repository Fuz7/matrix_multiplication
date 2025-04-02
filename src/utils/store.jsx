import { create } from "zustand"

export const useMatrixSizeStore = create((set)=>{
    return{
        matrixSize: 'small',
        setMatrixSize: (size)=> set({matrixSize:size})
    }
})