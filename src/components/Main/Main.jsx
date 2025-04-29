import { useState } from "react";
import StandardMatrix from "./StandardMatrix";
import StandardResult from "./StandardResult";
import { motion } from "motion/react";
import { useIsMultiplicationFinished, useMatrixSizeStore } from "../../utils/store";

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

  
  return (
    <motion.main
    transition={{ease:'linear',duration:3}}
    variants={
      
      {active:{x:'-100%'},initial:{x:0}}
    }
    initial="initial"
    animate={isMultiplicationFinished ? 'active':'initial'}
    className="flex ">
      {matrixSize === 'small' && (
        <>
        <StandardMatrix inputMatrixes={inputMatrixes} />
        <StandardResult row={matrix1Pos.row} col={matrix2Pos.col}/>
        </>

      )}
    </motion.main>
  );
}
