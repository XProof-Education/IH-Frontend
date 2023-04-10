import React from "react";

const UploadIcon = (props) => {
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
    <svg width={props.size} height={props.size} viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="37" cy="37" r="36.5" fill={color} stroke={color} />
      <path d="M19 60.6667H54.75" stroke="#FBFBFB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36.875 48.75V13M36.875 13L47.302 23.4271M36.875 13L26.4479 23.4271" stroke="#FBFBFB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default UploadIcon;