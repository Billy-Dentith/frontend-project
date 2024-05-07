import './App.css'
import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Header from './components/Header'
import Articles from './components/Articles';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
      </Routes>
    </>
  )
}

export default App
