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
    <svg width={props.size} height={props.size} viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 64C27.7977 64 23.6365 63.1723 19.7541 61.5641C15.8717 59.956 12.3441 57.5989 9.37258 54.6274C6.40111 51.6559 4.044 48.1283 2.43585 44.2459C0.827702 40.3634 -1.76614e-06 36.2023 -1.39876e-06 32C-1.03139e-06 27.7977 0.827704 23.6365 2.43585 19.7541C4.04401 15.8717 6.40111 12.3441 9.37258 9.37258C12.3441 6.4011 15.8717 4.044 19.7541 2.43585C23.6366 0.827702 27.7977 -1.94983e-06 32 -1.39876e-06L32 32L32 64Z" fill={color} />
      <text x="42" y="32" fill="black" fontSize="16" textAnchor="middle" writingMode="tb" fontWeight="bold" fontFamily="Arial">{props.text}</text>
    </svg>
  );
}

export default HalfDotColor;