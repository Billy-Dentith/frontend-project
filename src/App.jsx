import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle'
import { UserProvider } from './contexts/UserContext';
import Topics from './components/Topics';
import SingleTopic from './components/SingleTopic';

function App() {

  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
        <Route path='/articles' element={<Articles/>}></Route>
        <Route path='/articles/:article_id' element={<SingleArticle/>}></Route>
        <Route path='/topics' element={<Topics/>}></Route>
        <Route path='/topics/:slug' element={<SingleTopic/>}></Route>
      </Routes>
    </UserProvider>
  )
}

export default App
