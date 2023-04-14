const Percentage = (props) => {
  const { percentage, colorToPaint, fontSize, size} = props;
 
  let color = ""
  if (colorToPaint === "yellow") {
    color = '#F7CF5C'
  } else if (colorToPaint === 'pink') {
    color = '#E7327B'
  } else if (colorToPaint === 'purple') {
    color = '#420ED0' 
  } else if (colorToPaint === 'blue') {
    color = '#61D4F7' 
  }

  return (
    <div style={{ position: 'relative', width: `${size}`, height: `${size}` }}>
      <svg viewBox="0 0 36 36" style={{ position: 'absolute', top: 0, left: 0 }}>
        <path
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="#fff"
          stroke="#e6e6e6"
          strokeWidth="2"
        />
        <path
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={`${percentage} ${100 - percentage}`}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <span style={{ fontSize:`${fontSize}`, fontWeight: 'bold', color }}>{`${percentage}%`}</span>
      </div>
    </div>
  );
}

export default Percentage;