import { faPenToSquare,faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const icons =  {
  edit : <FontAwesomeIcon icon={faPenToSquare} />,
  delete: <FontAwesomeIcon icon={faTrash} />,
  eyeSlash: <FontAwesomeIcon icon={faEyeSlash} />

}

export default icons