import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Matrix from './components/Matrix'

function App() {

  return (
    <div className='min-h-[100vh] initialPage font-smt
     text-3xl text-white'>
      <Header />
      <Matrix></Matrix>
    </div>
  )
}

export default App
