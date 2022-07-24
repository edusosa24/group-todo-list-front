import React from 'react';
import { Logout } from '../components/auth/Logout';
import { BackToList } from '../components/task/BackToList';
import { TaskForm } from '../components/task/TaskForm';

export const CreateTask = () => {
  return (
    <>
      <div className="top-nav-create">
        <BackToList />
        <Logout />
      </div>

      <TaskForm />
    </>
  );
};
