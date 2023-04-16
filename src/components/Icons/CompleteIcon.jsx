import React from "react";

const CompleteIcon = (props) => {
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
    <svg width={props.size} height={props.size} viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60.5" cy="60.5" r="60.5" fill={color} />
      <path d="M27 65.1429L46.4286 84.5714L95 36" stroke="#FBFBFB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default CompleteIcon;