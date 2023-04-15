import React from "react";

const ArrowRightIcon = (props) => {
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
    <svg width={props.width} height={props.height} viewBox="0 0 50 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L48 48L2 94" stroke={color} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ArrowRightIcon;