import './components.css';
import HalfDotColor from './Icons/HalfDot';

const Button = (props) => {
  return (
    <>
      {props.action !== undefined
        ? <button className={props.color === "blue"
          ? "button-style button-color-blue"
          : props.color === 'pink'
            ? "button-style button-color-pink"
            : props.color === 'yellow'
              ? "button-style button-color-yellow"
              : props.color === 'violet'
                ? "button-style button-color-violet"
                : "button-style"
        }
          onClick={props.action}> <HalfDotColor color={props.color} size="15" /> {props.children} </button>
        : <button className={props.color === "blue"
          ? "button-style button-color-blue"
          : props.color === 'pink'
            ? "button-style button-color-pink"
            : props.color === 'yellow'
              ? "button-style button-color-yellow"
              : props.color === 'violet'
                ? "button-style button-color-violet"
                : "button-style"} > <HalfDotColor color={props.color} size="15" />{props.children} </button>
      }
    </>
  );
}

export default Button;