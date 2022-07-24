import React from 'react';
import { Link } from 'react-router-dom';

export const CreateTask = () => {
  return (
    <>
      <Link to={'/new-task'}>Create Task</Link>
    </>
  );
};
