import React from "react";
import { Link } from "react-router-dom";

const CameraIcon = (props) => {
  let color = ""
  if (props.color === "yellow") {
    color = '#F7CF5C'
  } else if (props.color === 'pink') {
    color = '#E7327B'
  } else if (props.color === 'purple') {
    color = '#420ED0' 
  } else if (props.color === 'blue') {
    color = '#61D4F7' 
  }
  
  return (
    <Link to="/camera">
      <svg width={props.size} height={props.size} viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="36.5" fill={color} stroke={color} />
        <path d="M14 50.8V27.8C14 25.2595 16.0595 23.2 18.6 23.2H19.75C21.1979 23.2 22.5613 22.5183 23.43 21.36L28.536 14.552C28.7966 14.2045 29.2056 14 29.64 14H44.36C44.7945 14 45.2034 14.2045 45.464 14.552L50.57 21.36C51.4387 22.5183 52.8022 23.2 54.25 23.2H55.4C57.9406 23.2 60 25.2595 60 27.8V50.8C60 53.3406 57.9406 55.4 55.4 55.4H18.6C16.0595 55.4 14 53.3406 14 50.8Z" fill="#FBFBFB" stroke="#FBFBFB" strokeWidth="2.91066" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M37 46.2C42.081 46.2 46.2 42.081 46.2 37C46.2 31.9191 42.081 27.8 37 27.8C31.919 27.8 27.8 31.9191 27.8 37C27.8 42.081 31.919 46.2 37 46.2Z" fill="#FBFBFB" stroke={color} strokeWidth="2.91066" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export default CameraIcon;



