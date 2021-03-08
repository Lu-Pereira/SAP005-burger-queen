/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope *//* eslint-disable jsx-a11y/alt-text */
/* eslint-disable linebreak-style */

import Logoimg from '../../Assets/logot.jpeg';
import './Logo.css';

export default function Logo() {
  return (
    <div>
      <div className="testelogo">
        <img className="imgLogo" src={Logoimg} />
        <img className="gif" src="https://media.giphy.com/media/loRt6ja0q6VHcljBCk/giphy.gif" />
      </div>
    </div>
  );
}
