import React from 'react';
import { Logout } from '../components/auth/Logout';
import { DisplayList } from '../components/list/DisplayList';
import { BackToProfile } from '../components/list/BackToProfile';
import { CreateTask } from '../components/task/CreateTask';

export const List = () => {
  return (
    <>
      <Logout />
      <BackToProfile />
      <CreateTask />
      <DisplayList />
    </>
  );
};
