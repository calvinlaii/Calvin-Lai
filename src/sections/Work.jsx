import React, { useRef, useEffect, useLayoutEffect } from "react";
import "../components/work.css"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";



gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

const Work = () => {

    const logoRef = useRef(null);
    const headerRef= useRef(null);
    const textRef = useRef(null);
   

    useGSAP(() => {
    const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".section-header",
        start: "center center",
        end: "bottom+=1550", // total scroll distance for both animations
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    // Animation 1: move header down
    tl.to(headerRef.current, {
        ease: "none",
        delay: 15,
    });

    // Animation 2: zoom r (starts only after header tween is done)
    tl.to(logoRef.current, {
      scale: 280,
      transformOrigin: "center center",
      ease: "none",
      duration: 4,
      xPercent: 1400,
    }, );

    return () => tl.revert();
  });

  useGSAP(() => {
  const ctx = gsap.context(() => {
    // ✅ since ref is on <h2>, pass it directly
    const split = SplitText.create(textRef.current, {
      type: "lines, words",
      mask: "lines",
      linesClass: "line",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 120%",
        end: "center bottom",
      },
    });

    tl.from(split.words, {
      opacity: 0,
      y: 100,
      stagger: 0.03,
      duration: 1,
    });
  }, textRef);

  return () => ctx.revert();
}, []);

  


  return (
    <section className="work" id="Work">
        <div className="container-quote">
            <div className="quote-title" ref={textRef}>
                <h2 className="quote">
  “Knowledge does not stay with us when we are only told what to do, but when we are involved in the <br />
  doing, the lesson becomes part of us and true learning takes place.”
                </h2>
            </div>
        </div>
        <div className="container">
            <div className="work-area-2-inner">
                <div className="section-header" ref={headerRef}>
                    <h2 className="section-title">Wo <span className="remove-text"><span ref={logoRef} id="zoom-text" className="text-zoom">r</span>ks
                    </span></h2>
                </div>
                <div className="works-wrapper-box">
                    <div className="works-wrapper ">
                        <div className="work-box1 fade-anim">
                            <div className="thumb parallax-view ">
                            <div className="image" data-speed="0.8" data-cursor-text="View Details" data-cursor-text-red>
                                <a href="https://theblate.com" target="_blank" rel="noopener noreferrer"><img src="./img/Blate Web.jpg" alt="image1" /></a>
                            </div>
                            </div>
                        </div>
                        <div className="work-box2 fade-anim">
                            <div className="thumb parallax-view">
                            <div className="image" data-speed="0.8" data-cursor-text="View Details" data-cursor-text-red>
                                <a href="https://justxport.com" target="_blank" rel="noopener noreferrer"><img src="./img/JustXport Web.jpg" alt="image2" /></a>
                            </div>
                            </div>
                        </div>
                
                        <div className="work-box3 fade-anim">
                            <div className="thumb parallax-view">
                            <div className="image" data-speed="0.8" data-cursor-text="View Details" data-cursor-text-red>
                                <a href="https://lailit.id" target="_blank" rel="noopener noreferrer"><img src="./img/Lailit web.jpg" alt="image3" /></a>
                            </div>
                            </div>
                        </div>

                        <div className="work-box4 fade-anim light-section">
                            <div className="thumb parallax-view">
                            <div className="image dark-section" data-speed="0.8" data-cursor-text="View Details" data-cursor-text-red>
                                <a href=""><img src="./img/north bridge web.jpg" alt="image4" /></a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</section>

  )
}

export default Work
