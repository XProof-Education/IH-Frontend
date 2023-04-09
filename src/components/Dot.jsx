import React from "react";

const Dot = (props) => {
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
    <svg width={props.size} height={props.size} viewBox="0 30 110 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M55.4826 0.0175757C85.582 0.0175744 109.983 0.0175733 109.983 0.0175733C109.983 30.1171 85.5821 54.5176 55.4826 54.5176C25.383 54.5176 0.98256 30.1171 0.982559 0.0175781C-3.51766 0.0175783 25.383 0.017577 55.4826 0.0175757Z" fill={color} />
    </svg>
  );
}

export default Dot;