import React from 'react';
import { Logout } from '../components/auth/Logout';
import { UserLists } from '../components/list/UserLists';
import { JoinList } from '../components/list/JoinList';
import { CreateList } from '../components/list/CreateList';
import '../styles/nav.css';

export const UserProfile = () => {
  return (
    <>
      <div className="top-nav">
        <CreateList />
        <JoinList />
        <Logout />
      </div>
      <UserLists />
    </>
  );
};
