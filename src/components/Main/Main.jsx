import { useEffect, useState } from "react";
import SmallMatrix from "./SmallMatrix";
import Result from "./Result";
import { motion } from "motion/react";
import { useIsMultiplicationFinished, useMatrixSizeStore, useMultiplicationType, useStandardKey } from "../../utils/store";
import LargeMatrix from "./LargeMatrix";

export default function Main() {
  const [matrix1Pos, setMatrix1Pos] = useState({ row: "3", col: "2" });
  const [matrix2Pos, setMatrix2Pos] = useState({ row: "2", col: "3" });
  const isMultiplicationFinished = useIsMultiplicationFinished((state)=>
    state.isMultiplicationFinished)
  const matrixSize = useMatrixSizeStore((state)=>state.matrixSize)
  const inputMatrixes = {
    matrix1Pos,
    setMatrix1Pos,
    matrix2Pos,
    setMatrix2Pos,
  };
  const standardKey = useStandardKey((state)=>state.standardKey)
  const multiplicationType = useMultiplicationType((state)=>state.multiplicationType)
  useEffect(()=>{
    if(matrixSize === 'small' && multiplicationType === 'standard' ){
      setMatrix1Pos({row:"3",col:'2'})
      setMatrix2Pos({row:'2',col:'3'})
    }else if(matrixSize === 'small' && multiplicationType === 'strassen'){
      setMatrix1Pos({row:"2",col:'2'})
      setMatrix2Pos({row:'2',col:'2'})
    }else if(matrixSize === 'large' && multiplicationType === 'standard' ){
      setMatrix1Pos({row:"5",col:'5'})
      setMatrix2Pos({row:'5',col:'5'})
    }else if(matrixSize === 'large' && multiplicationType === 'strassen' ){
      setMatrix1Pos({row:"6",col:'6'})
      setMatrix2Pos({row:'6',col:'6'})
    }
  },[matrixSize,multiplicationType,setMatrix1Pos,setMatrix2Pos])


  return (
    <motion.main
    transition={{ease:'easeOut',duration:3}}
    variants={
      
      {active:{x:'-100%'},initial:{x:0}}
    }
    initial="initial"
    animate={isMultiplicationFinished ? 'active':'initial'}
    className="flex ">
      {matrixSize === 'small' && (
        <>
        <SmallMatrix 
        key={standardKey}
        inputMatrixes={inputMatrixes} />
        </>

      )}
      {matrixSize === 'large' && (
        <LargeMatrix inputMatrixes={inputMatrixes} />
      )}
      <Result row={matrix1Pos.row} col={matrix2Pos.col} matrixSize={matrixSize}/>

    </motion.main>
  );
}
