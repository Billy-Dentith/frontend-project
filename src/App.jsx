import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle'
import { UserProvider } from './contexts/UserContext';

function App() {

  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
        <Route path='/:article_id' element={<SingleArticle/>}></Route>
      </Routes>
    </UserProvider>
  )
}

export default App
