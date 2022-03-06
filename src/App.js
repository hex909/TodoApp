import React, { useEffect,  useState } from "react";
import Todos from "./components/Todos";
import './App.css'

function App() {
  const [isLight, setIsLight] =useState(true)

  useEffect(() => {
    if(!localStorage.getItem('theme')) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
        setIsLight(false)
        localStorage.setItem("theme", 'dark')
      }else {
        localStorage.setItem("theme", 'light')
      }
    }

    if(localStorage.getItem('theme') === 'light') {
      setIsLight(true)
    }else {
      setIsLight(false)
    }
  },[])
  
  function changeLight() {
    setIsLight(v => {
      if (!v) {
        localStorage.setItem("theme", 'light')
      }else {
        localStorage.setItem("theme", 'dark')
      }
      return !v
    })
  }

  return (
    <main className={`${isLight ?"light" : 'dark'}`}>
      <header className="header">
        <div className="headerImgCon">
        </div>
      </header>
      <section className="body">
        <Todos isLight={isLight} changeLight={changeLight}/>
      </section>
    </main>
  );
}

export default App;
