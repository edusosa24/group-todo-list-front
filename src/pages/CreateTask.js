import React from 'react';
import { Logout } from '../components/auth/Logout';
import { TaskForm } from '../components/task/TaskForm';

export const CreateTask = () => {
  return (
    <>
      <Logout />
      <TaskForm />
    </>
  );
};
