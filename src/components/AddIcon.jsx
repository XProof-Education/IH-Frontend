import React from "react";

const AddIcon = (props) => {
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
    <svg width={props.size} height={props.size} viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21.5" cy="21.5" r="21.5" fill={color} />
      <path d="M9 21H22M22 21H35M22 21V8M22 21V34" stroke="#FBFBFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default AddIcon;