import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
        <Route path='/:article_id' element={<SingleArticle/>}></Route>
      </Routes>
    </>
  )
}

export default App
