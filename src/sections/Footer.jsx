import React from 'react'
import TextPressure from '../components/TextPressure'
import "../components/footer.css"

const Footer = () => {
  return (
    <section className="footer">
        <div className="sticky-footer">
            <div className="footer-wrap">
                <div className="nav-footer">
                    <div className="menu-footer">
                        <h3>Menu</h3>
                        <a className='nav-hover-btn' onClick={() => {
                            document.getElementById("Home").scrollIntoView({ behavior: "smooth" });
                            }}>Home</a>
                        <a className='nav-hover-btn' onClick={() => {
                            document.getElementById("Work").scrollIntoView({ behavior: "smooth" });
                            }}>Work</a>
                        <a className='nav-hover-btn' onClick={() => {
                            document.getElementById("About").scrollIntoView({ behavior: "smooth" });
                            }}>About</a>
                    </div>
                    <div className="social-media">
                        <h3>Social Media</h3>
                        <a className='nav-hover-btn' href="https://x.com/CalvinnnLai" target="_blank" rel="noopener noreferrer">Instagram &#8599;</a>
                        <a className='nav-hover-btn' href="https://x.com/CalvinnnLai" target="_blank" rel="noopener noreferrer">Linkedin &#8599;</a>
                        <a className='nav-hover-btn' href="https://x.com/CalvinnnLai" target="_blank" rel="noopener noreferrer">X &#8599;</a>
                    </div>
                </div> 
                <div className="footer-logo">
                        <img id="footer-logo" src="img/Calvin Lai W.png" alt="Logo"></img>
                </div>
            </div>
            <div className="brand-footer">
                    <div classNmae="small-size" style={{position: 'relative', height: '300px'}}>
                        <TextPressure
                            text="Calvin Lai"
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="white"
                            strokeColor="#ff0000"
                            minFontSize={36}
                        />
                    </div>
            </div>
        </div>
    </section>
  )
}

export default Footer
