import React from 'react';
import { Link } from 'react-router-dom';

export const BackToProfile = () => {
  return (
    <>
      <Link to={'/my-profile'}>My Profile</Link>
    </>
  );
};
