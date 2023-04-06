import React from 'react';
import Navbar from '../components/Header/Navbar';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Navbar color="blue"/>
      <h1>Home</h1>
      <Link to={'/camera'}><Button color='blue'>Camera</Button></Link>
    </div>
  )
}
