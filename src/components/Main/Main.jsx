import { useEffect, useState } from "react";
import SmallMatrix from "./SmallMatrix";
import Result from "./Result";
import { motion } from "motion/react";
import { useIsMultiplicationFinished, useMatrixSizeStore, useMultiplicationType, useStandardKey } from "../../utils/store";
import LargeMatrix from "./LargeMatrix";
import { useMatrixSizeAndTypeChange } from "../hooks/main";

export default function Main() {
  const [smallMatrix1Pos, setSmallMatrix1Pos] = useState({ row: "3", col: "2" });
  const [smallMatrix2Pos, setSmallMatrix2Pos] = useState({ row: "2", col: "3" });
  const [largeMatrix1Pos, setLargeMatrix1Pos] = useState({ row: "5", col: "5" });
  const [largeMatrix2Pos, setLargeMatrix2Pos] = useState({ row: "5", col: "5" });
  const isMultiplicationFinished = useIsMultiplicationFinished((state)=>
    state.isMultiplicationFinished)
  const matrixSize = useMatrixSizeStore((state)=>state.matrixSize)
  const smallMatrixes = {
    smallMatrix1Pos,
    setSmallMatrix1Pos,
    smallMatrix2Pos,
    setSmallMatrix2Pos,
  };

  const largeMatrixes = {
    largeMatrix1Pos,
    setLargeMatrix1Pos,
    largeMatrix2Pos,
    setLargeMatrix2Pos
  }

  const standardKey = useStandardKey((state)=>state.standardKey)
  const multiplicationType = useMultiplicationType((state)=>state.multiplicationType)
  useMatrixSizeAndTypeChange(smallMatrixes,largeMatrixes,matrixSize,multiplicationType)

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
        inputMatrixes={smallMatrixes} />
        <Result row={smallMatrix1Pos.row} col={smallMatrix2Pos.col} matrixSize={matrixSize}/>
        </>
      )}
      {matrixSize === 'large' && (
        <>
        <LargeMatrix inputMatrixes={largeMatrixes} />
        <Result row={largeMatrix1Pos.row} col={largeMatrix2Pos.col} matrixSize={matrixSize}/>
        </>
      )}

    </motion.main>
  );
}
