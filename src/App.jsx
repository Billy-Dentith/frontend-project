import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Articles from './components/Articles';
import IndividualArticle from './components/IndividualArticle'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
        <Route path='/:article_id' element={<IndividualArticle/>}></Route>
      </Routes>
    </>
  )
}

export default App
