import React, { useRef, useEffect, useLayoutEffect } from "react";
import "../components/about.css"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP,SplitText,CustomEase);

const About = () => {

  const textRef = useRef(null);

  useGSAP(() => { 
    let split = new SplitText(".header-about", { 
      type: "chars, words",
      mask: "chars",
      charsClass: "char++"
    })


    gsap.from(split.chars, {
      yPercent: 100,
      stagger: 0.05,
      duration: 0.75,
      delay: 0.5,
      scrollTrigger: {
        trigger: ".header-about",
        start: "top bottom",
        ease: "power4.inOut",
      }
    })

    return() => {
      split.revert();
    }
  })

   useGSAP(() => { 
    let split = new SplitText(".container-about-me", { 
      type: "words",
    })


    gsap.from(split.words, {
      yPercent: 100,
      stagger: 0.03,
      opacity: 0,
      scrollTrigger: {
        trigger: ".container-about-me",
        start: "top bottom",
        ease: "power3.inOut",
      }
    })

    return() => {
      split.revert();
    }
  })

  useGSAP(() => {
  gsap.set(".container-img img.swipeimage", { yPercent: -50, xPercent: -50 });

  let firstEnter;

  gsap.utils.toArray(".container-img").forEach((el) => {
    const image = el.querySelector("img.swipeimage");

    if (!image) return; // safety check

    const setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" }),
      setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" });

    const align = (e) => {
      if (firstEnter) {
        setX(e.clientX, e.clientX);
        setY(e.clientY, e.clientY);
        firstEnter = false;
      } else {
        setX(e.clientX);
        setY(e.clientY);
      }
    };

    const startFollow = () => document.addEventListener("mousemove", align);
    const stopFollow = () => document.removeEventListener("mousemove", align);

    const fade = gsap.to(image, {
      autoAlpha: 1, // animates opacity + visibility
      ease: "none",
      paused: true,
      duration: 0.1,
      onReverseComplete: stopFollow,
    });

    el.addEventListener("mouseenter", (e) => {
      firstEnter = true;
      fade.play();
      startFollow();
      align(e); // snap to cursor immediately
    });

    el.addEventListener("mouseleave", () => fade.reverse());
  });
});

  useGSAP (() => {
    const textElements = gsap.utils.toArray('.text');

    textElements.forEach(text => {
      gsap.to(text, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'center 80%',
          end: 'center 20%',
          scrub: true,
        },
      });
    });
  })

 

  return (
    <section className="about light-section" id="About">
      <div className="container-all">
          <div className="about-header">
            <div className="header-about" ref={textRef}>
              <h1 className="text-about">about <span>ME</span></h1>
            </div>
          </div>
          <div className="about-me">
            <div className="container-about-me">
              <p className="paragraph-text-about">
    Hi, I'm Calvin <br/>
    <span className="indent">Coding has been part of my life, i've been learning web dev and game dev since highschool.</span> I enjoy trying out different business ideas, always looking for ways to improve and innovate along the way.
  </p>
            </div>
          </div>
          <div className="service">
            <div className="service-provide">
              <div className="service-text">
                <h3 className="text-service">I DO</h3>
              </div>
              <div className="service-services">
                  <li className="container-img">
                    <img className="swipeimage" src="img/Website.jpg"/>
                    <h1 className="text">WEBSITE<span className="span-text">2 YEARS</span></h1>
                  </li>
                  <li className="container-img">
                    <img className="swipeimage" src="img/Editor.jpg"/>
                    <h1 className="text">EDITOR<span className="span-text">4 YEARS</span></h1>
                  </li>
                  <li className="container-img">
                    <img className="swipeimage" src="img/Branding.jpg"/>
                    <h1 className="text">BRANDING<span className="span-text">2 YEARS</span></h1>
                  </li>
                  <li className="container-img">
                    <img className="swipeimage" src="img/Game.jpg"/>
                    <h1 className="text">GAME<span className="span-text">2 MONTHS</span></h1>
                  </li>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default About
