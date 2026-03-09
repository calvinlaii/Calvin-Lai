import React, { useEffect} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef} from 'react';
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import About from "../sections/About";
import Work from "../sections/Work";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import About_X from "../pages/About_X";
import Work_X from "../pages/Work_X";
import Contact from "./Contact";
import "./menu.css"
import { useWindowScroll } from 'react-use';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Navbar = () => {

    const [isMenuOpen, setMenuOpen ] = useState(false);
    
    const [isNavAvailable, setNavAvailable] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { y : currentScrollY } = useWindowScroll();

    const container2 = useRef(null);
    const overlayRef = useRef(null);
    const tl = useRef();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    const menuLinks = [
        { path: "/", label: "Home"},
        { path: "/work", label: "Work"},
        { path: "/about", label: "About"},
    ];

    useEffect (() => {
        if (currentScrollY == 0){
            setNavAvailable(true);
        }else if(currentScrollY < lastScrollY){
            setNavAvailable(true);
        } else if (currentScrollY > lastScrollY){
            setNavAvailable(false);
        }
        setLastScrollY(currentScrollY)
    }, [currentScrollY, setLastScrollY])

    useEffect (() => {
        gsap.to(container2.current, {
            top: isNavAvailable ? 0 : -120,
            opacity: isNavAvailable ? 1 : 0,
            duration: 0.2,
        })
    }, [isNavAvailable])

    useGSAP(() => {
     let split = new SplitText(".menu-link-item-holder", {
        type: "words",
        mask: "words",
     })
     
     tl.current = gsap.timeline({ paused: true })
     .to(overlayRef.current, {
      duration: 1.25,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
     })
    .from (split.words, {
        stagger: 0.05,
        yPercent: 100,
        duration: 0.65,
     })
     
    }, {scope: overlayRef.current})

    useEffect(() => {
      if (isMenuOpen) {
        tl.current.play();
      } else{
        tl.current.reverse();
      }
    }, [isMenuOpen]);

    

  return(
    <>
      <div className="nav">
        <div className="menu-bar"  ref={container2} >
            <div className="logo">
                <a href="/">
                    <img id="nav-logo" src="img/Calvin Lai W.png" alt="Logo" />
                </a>
            </div>
        
            <div className="nav-links">
                <div className="text">
                    <a onClick={() => {
                    document.getElementById("About").scrollIntoView({ behavior: "smooth" });
                    }}>About</a>
                </div>
                <div className="text">
                    <a onClick={() => {
                    document.getElementById("Work").scrollIntoView({ behavior: "smooth" });
                    }}>Work</a>
                </div>
                <div className="menu-open">
                    <a onClick={toggleMenu}>MENU</a>
                </div>
                <div className="burger-menu" onClick={toggleMenu}>
                    <span className="first-strip"></span>
                    <span className="second-strip"></span>
                </div>
            </div>
        </div>
           
    </div> 
        <div className="menu-overlay" ref={overlayRef} >
                <div className="menu-overlay-bar">
                    <div className="logo">
                        <img id="nav-logo" src="img/Calvin Lai W.png" alt="Logo"></img>
                    </div>
                    <div className="menu-close" onClick={toggleMenu}>
                        <a href="#" onClick={(e) => {toggleMenu(); e.preventDefault();}}>CLOSE</a>
                    </div>
                    <div className="burger-menu" onClick={toggleMenu}>
                        <span className="first-strip-close"></span>
                        <span className="second-strip-close"></span>
                    </div>
                </div>

                <div className="menu-close-icon" onClick={toggleMenu}>
                    <p>&#x2715;</p>
                </div>

                <div className="menu-copy">
                    <div className="menu-links">
                        {menuLinks.map((link, index) => (
                            <div className="menu-link-item" key={index}>
                                <div className="menu-link-item-holder" onClick={toggleMenu}>
                                    <Link to={link.path} className="menu-link">
                                        {link.label}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="menu-info">
                        <div className="menu-info-col">
                            <a href="https://x.com/CalvinnnLai" target="_blank" rel="noopener noreferrer">X &#8599;</a>
                            <a href="https://www.instagram.com/calvinnnlai/" target="_blank" rel="noopener noreferrer">Instagram &#8599;</a>
                            <a href="https://www.linkedin.com/in/calvinsaputralai/" target="_blank" rel="noopener noreferrer">Linkedin &#8599;</a>
                        </div>
                    
                        <div className="menu-info-col2">
                            <a href="mailto:calvinsaputra06@gmail.com" target="_blank" rel="noopener noreferrer" className="nav-hover-btn3">
                                calvinsaputra06@gmail.com &#8599;
                            </a>
                            <p>+62 896 897 43082</p>
                        </div>
                    </div>
                </div>

            </div>
            </>
  )
}

export default Navbar;
