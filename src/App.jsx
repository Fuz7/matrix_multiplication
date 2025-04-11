import './App.css'
import Header from './components/Header'
import Matrix from './components/Main/Matrix'
import Main from './components/Main/Main'

function App() {
  
  return (
    <div className='min-h-[100vh] initialPage font-smt
     text-3xl text-white'>
      <Header />
      <Main></Main>
    </div>
  )
}

export default App
