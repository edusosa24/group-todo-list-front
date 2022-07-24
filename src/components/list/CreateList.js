import React from 'react';
import { Link } from 'react-router-dom';

export const CreateList = () => {
  return (
    <>
      <Link to={'/new-list'}>Create List</Link>
    </>
  );
};
