import React from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';
// import Slider from '../components/Slider';
//import steps from '../assets/images/steps.mp4';
import steps3D from '../assets/images/steps3D.mp4';
// import ins1 from '../assets/images/ins1.jpg';
// import ins2 from '../assets/images/ins2.jpg';
// import ins3 from '../assets/images/ins3.jpg';

export default function Home() {
  return (
    <div className="home">
      <Navbar color="blue"/>
      {/* <Slider images={[prova2, ins1, ins2, ins3]} /> */}
      <div className="video-container">
      <video loop autoPlay muted>
        <source src={steps3D} alt="people" type="video/mp4" />
        </video>
        </div>
      <Footer color="yellow" size="70px"/>
    </div>
  )
}
