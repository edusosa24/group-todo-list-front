import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './GlobalStates';

export const PrivateRoutes = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  let { token } = authState;

  return token !== '' ? <Outlet /> : <Navigate to="/" />;
};
