import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle'
import { UserProvider } from './contexts/UserContext';
import Topics from './components/Topics';
import NotFound from './components/ErrorPage';
import PostArticleForm from './components/PostArticleForm';
import Users from './components/Users';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {

  return (
    <UserProvider>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
        <Route path='/articles' element={<Articles/>}></Route>
        <Route path='/articles/:article_id' element={<SingleArticle/>}></Route>
        <Route path='/topics' element={<Topics/>}></Route>
        <Route path='/topics/:slug' element={<Articles/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/submit' element={<PostArticleForm/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      <Footer/>
    </UserProvider>
  )
}

export default App
