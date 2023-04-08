import React from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import ins1 from '../assets/images/ins1.jpg';
import ins2 from '../assets/images/ins2.jpg';
import ins3 from '../assets/images/ins3.jpg';

export default function Home() {
  
  return (
    <div>
      <Navbar color="blue"/>
      <Slider images={[ins1, ins2, ins3]} />
      <Footer />
    </div>
  )
}
