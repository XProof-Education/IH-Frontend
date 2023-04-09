import CameraIcon from "./CameraIcon";

const Footer = (props) => {
  return (
    <footer className="footer">
      <CameraIcon size={props.size} color={props.color} />
    </footer>
  )
}

export default Footer;