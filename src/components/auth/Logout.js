import React, { useContext } from 'react';
import { AuthContext } from '../../utils/GlobalStates';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Logout = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get('http://localhost:5000/api/v1/auth/logout', {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setAuthState({
          ...authState,
          token: '',
          _id: '',
          userMemberLists: [],
          userCreatedLists: [],
          currentListID: '',
        });
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button className="btn btn-sm btn-outline-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};
