import React from 'react';
import { Link } from 'react-router-dom';

export const BackToList = () => {
  return (
    <>
      <Link to={'/list'}>Back to list</Link>
    </>
  );
};
