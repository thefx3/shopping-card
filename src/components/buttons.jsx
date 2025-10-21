import { Link } from "react-router-dom";
import '../styles/components/buttons.css';

function DirectButton({ text, to }) {
    return (
      <Link to={to} className="direct-button">
        {text}
      </Link>
    );
}

export default DirectButton;


function NavButton({ text, to }) {
    return (
      <Link to={to} className="nav-button">
        {text}
      </Link>
    );
}

export { NavButton };

