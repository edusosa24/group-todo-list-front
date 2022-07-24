import React from 'react';
import { Logout } from '../components/auth/Logout';
import { BackToProfile } from '../components/list/BackToProfile';
import { ListForm } from '../components/list/ListForm';

export const CreateList = () => {
  return (
    <>
      <div className="top-nav-create">
        <BackToProfile />
        <Logout />
      </div>
      <ListForm />
    </>
  );
};
