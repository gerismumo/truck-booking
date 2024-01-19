import { faPenToSquare,faEyeSlash,faEye ,faSquareCheck} from '@fortawesome/free-regular-svg-icons';
import { faTrash,faAngleDown ,faXmark, faBarsStaggered} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const icons =  {
  edit : <FontAwesomeIcon icon={faPenToSquare} />,
  delete: <FontAwesomeIcon icon={faTrash} />,
  eyeSlash: <FontAwesomeIcon icon={faEyeSlash} />,
  eye: <FontAwesomeIcon icon={faEye} />,
  check: <FontAwesomeIcon icon={faSquareCheck} />,
  angleDown: <FontAwesomeIcon icon={faAngleDown} />,
  markX: <FontAwesomeIcon icon={faXmark}/>,
  barsStaggered: <FontAwesomeIcon icon={faBarsStaggered} />,
}

export default icons