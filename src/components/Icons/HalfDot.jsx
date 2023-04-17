import React from "react";

const HalfDotColor = (props) => {
  let color = ""
  if (props.color === "yellow") {
    color = '#F7CF5C'
  } else if (props.color === 'pink') {
    color = '#E7327B'
  } else if (props.color === 'violet') {
    color = '#420ED0' 
  } else if (props.color === 'blue') {
    color = '#61D4F7' 
  }
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 55 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M54.5 55.5003C54.5 85.5997 54.5 110 54.5 110C24.4005 110 0 85.5998 0 55.5003C0 25.4007 24.4005 1.00026 54.5 1.00026C54.5 -3.49996 54.5 25.4007 54.5 55.5003Z" fill={color} />
      <text x="71" y="64" fill="black" fontSize="28" textAnchor="middle" writingMode="tb" fontFamily="raisonne">{props.text}</text>
    </svg>
  );
}

export default HalfDotColor;