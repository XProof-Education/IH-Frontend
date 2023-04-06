import React from 'react';
import Navbar from '../components/Header/Navbar';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import CameraIcon from '../components/CameraIcon';

export default function Home() {
  return (
    <div>
      <Navbar color="blue"/>
      <h1>Home</h1>
      <Link to={'/camera'}><CameraIcon size='70px' color='pink' /></Link>
    </div>
  )
}
