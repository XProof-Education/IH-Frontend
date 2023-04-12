import React from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
//import steps from '../assets/images/steps.mp4';
// import steps3D from '../assets/images/steps3D.mp4';
import step0 from '../assets/images/step0.mp4';
import step2 from '../assets/images/step2.mp4';
import step1 from '../assets/images/step1.mp4';

export default function Home() {
  return (
    <div className="home">
      <Navbar color="blue" />
      
      <div className="video-container">
        <Slider steps={[step0, step1, step2]} />
        {/* <video loop autoPlay muted playsInline>
          <source src={steps3D} alt="people" type="video/mp4" />
        </video> */}
      </div>
      <Footer color="yellow" size="70px" />
    </div>
  );
}
