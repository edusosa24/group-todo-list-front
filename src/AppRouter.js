import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/GlobalStates';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { HomeLogin } from './pages/HomeLogin';
import { HomeRegister } from './pages/HomeRegister';
import { UserProfile } from './pages/UserProfile';
import { List } from './pages/List';
import { CreateList } from './pages/CreateList';
import { CreateTask } from './pages/CreateTask';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeLogin />} />
          <Route path="/register" element={<HomeRegister />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/my-profile" element={<UserProfile />} />
            <Route path="/list" element={<List />} />
            <Route path="/new-list" element={<CreateList />} />
            <Route path="/new-task" element={<CreateTask />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
