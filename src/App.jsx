import React from 'react'
import Watereffect from './components/Watereffect'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from './components/Navbar';
import Lenis from "@studio-freight/lenis";
import { Routes, Route } from 'react-router-dom';
import Work_X from './pages/Work_X';
import About_X from './pages/About_X';
import Home from './pages/Home';


gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 500);
    });
    gsap.ticker.lagSmoothing(0);
    
    let lastWidth = window.innerWidth;

    window.addEventListener("resize", () => {
      if (
        (lastWidth > 1024 && window.innerWidth <= 1024) ||
        (lastWidth <= 1024 && window.innerWidth > 1024)
      ) {
        window.location.reload();
      }
      lastWidth = window.innerWidth;
    });

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Work' element={<Work_X/>}/>
        <Route path='/About' element={<About_X/>}/>
      </Routes>
      
    </main>
  )
}

export default App
