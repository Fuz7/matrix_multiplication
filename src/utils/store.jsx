import { create } from "zustand"

export const useMatrixSizeStore = create((set)=>{
    return{
        matrixSize: 'small',
        setMatrixSize: (size)=> set({matrixSize:size})
    }
})

// export const useMatrix1DimensionStore = create((set)=>{
//     return{
//         columnSize: '',
//         setColumnSize:(size)=> set({columnSize:size}),
//         rowSize:'',
//         setRowSize:'',
//     }
// })