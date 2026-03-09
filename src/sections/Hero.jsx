import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Watereffect from '../components/Watereffect'    
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Navbar from '../components/Navbar';
import "../components/hero.css"
import { useEffect, useState } from "react";

gsap.registerPlugin(useGSAP,SplitText,CustomEase);

const Hero = () => {

    const specialityRef = useRef(null);
    const basedRef = useRef(null);
    const quoteRef = useRef(null);

    useGSAP(() => {
  // lock scroll before animation
  document.body.style.overflow = "hidden";

  CustomEase.create("hop", "0.9, 0, 0.1, 1");

  const tl = gsap.timeline({
    defaults: { ease: "hop" },
  });

  const counts = document.querySelectorAll('.count');  
  let split = new SplitText(specialityRef.current, { type: "words", mask: "words" });
  let split2 = new SplitText(basedRef.current, { type: "chars", mask: "chars" });
  let split3 = new SplitText(quoteRef.current, { type: "words", mask: "words" });

  counts.forEach((count, index) => {
    const digits = count.querySelectorAll('.digit h1');
  });

  tl.to('.spinner', {
    opacity: 0,
    duration: 0.3,
  });

  tl.to(".word", {
    duration: 3.05,
  }, ">");

  tl.to('.divider', {
    scaleX: "100%",
    duration: 1,
    onComplete: () => gsap.to('.divider', { opacity: 0, duration: 0.1, delay: 0.3 })
  });

  tl.to(".block1", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 2,
    stagger: 0.1,
  });

  tl.to(".block2", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 2,
    stagger: 0.1,
    onStart: () => gsap.to('.hero-img', { scale: 1, duration: 2, ease: "hop" })
  }, "<");

  tl.to([".nav", ".line h1", ".line2 h1", ".line p"], {
    y: "0%",
    duration: 1,
    stagger: 0.2,
    opacity: 1
  }, "<", "+=1.5");

  tl.from(split.words, {
    stagger: 0.05,
    yPercent: 100,
    duration: 0.65,
    delay: 0.5,
  }, "<");

  tl.from(split2.chars, {
    stagger: 0.05,
    yPercent: 100,
    duration: 0.65,
    ease: "power1.inOut"
  }, "<");

  tl.from(split3.words, {
    stagger: 0.05,
    yPercent: 100,
    duration: 0.65,
    ease: "power1.in"
  }, "<");

  tl.call(() => {
    document.body.style.overflow = "auto";
  });
});


    useGSAP(() => {
        const mm = gsap.matchMedia();

  // Desktop animation
  mm.add("(min-width: 1000px)", () => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center+=70",
        end: "+=500",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      xPercent: -65,
      scale: 1.1,
    });
  });

  // Mobile animation
  mm.add("(max-width: 999px)", () => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",   
      borderRadius: 0,
      yPercent: -17.8,   
      scale: 1.1
    });
  });
});

const [time, setTime] = useState("");

  useEffect(() => {
    const showTime = () => {
      const date = new Date();
      let h = date.getHours(); // 0 - 23
      let m = date.getMinutes(); // 0 - 59
      let s = date.getSeconds(); // 0 - 59
      let session = "AM";

      if (h === 0) {
        h = 12;
      }

      if (h > 12) {
        h = h - 12;
        session = "PM";
      }

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;

      const formattedTime = `[ ${h}:${m}:${s} ${session} ]`;
      setTime(formattedTime);
    };

    showTime(); // initial call
    const interval = setInterval(showTime, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <section className="section-hero light-section" id="Home">
            <div className="loader">
                <div className="overlay">
                    <div className="block1"></div>
                    <div className="block2"></div>
                </div>
        
                <div className="intro-text">
                    <div className="word">
                        <Watereffect/></div>
                </div>

                <div className="divider"></div>
                <div className="divider2"></div>
            </div>

            <div className="header">
                    <div className="hero-copy">
                        <div className="line">
                            <h1 className="title1" id="word-1">CALVIN</h1>
                            <div className="speciality" ref={specialityRef}>
                                <p>/Web Development</p>
                                <p>/Branding Design</p>
                                <p>/Web Design</p>
                            </div>
                        </div>
                        <div className="line2">
                            <h1 className="title2" id="word-1">LAI</h1>
                            <div className="text-wrapper" ref={basedRef}>
                              <p>BASED IN INDONESIA</p>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div id="MyClockDisplay" className='clock'>
                          {time}
                    </div>
                    
                    <div className="another-quote" ref={quoteRef}>
                          <p>Learn by practice</p>
                    </div>

                    <div className="img-header" id="clip">
                        <div className="mask-clip-path about-image">
                            <img
                                src="img/Calvin Lai 2.jpg"
                                alt="Background"
                                className="absolute left-0 top-0 size-full object-cover"/>
                        </div>
                    </div>   

            </div>
    </section>
   

  )
}

export default Hero
