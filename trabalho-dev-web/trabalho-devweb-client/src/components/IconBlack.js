import icon from './componentImages/ship.svg';
import './componentStyles/Icon.css';

function Icon() {
  return (
    <div>
        <img src={icon} className="icon"/>
    </div>
  );
}

export default Icon;
