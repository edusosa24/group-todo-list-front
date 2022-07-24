import React from 'react';
import { Logout } from '../components/auth/Logout';
import { UserLists } from '../components/list/UserLists';
import { JoinList } from '../components/list/JoinList';
import { CreateList } from '../components/list/CreateList';

export const UserProfile = () => {
  return (
    <>
      <Logout />
      <JoinList />
      <CreateList />
      <UserLists />
    </>
  );
};
