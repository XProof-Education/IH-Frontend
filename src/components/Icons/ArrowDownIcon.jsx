import React from "react";

const ArrowDownIcon = (props) => {
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
    <svg width={props.width} height={props.height} viewBox="0 0 87 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L43.6225 43.6225L85.2449 2" stroke={color} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ArrowDownIcon;