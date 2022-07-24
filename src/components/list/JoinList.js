import React, { useContext, useState } from 'react';
import { AuthContext } from '../../utils/GlobalStates';
import axios from 'axios';

export const JoinList = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const [error, setError] = useState();

  const [listID, setListID] = useState('');

  const onList = () => {
    for (let i = 0; i < authState.userMemberLists.length; i++) {
      if (authState.userMemberLists[i]._id === listID) {
        return true;
      }
    }
    return false;
  };

  const handleJoin = async () => {
    const { token } = authState;
    axios
      .get(`http://localhost:5000/api/v1/lists/${listID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!onList()) {
          let memberLists = authState.userMemberLists;
          memberLists.push(res.data.data);
          setAuthState({
            ...authState,
            userMemberLists: memberLists,
          });
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <>
      <input
        placeholder="Enter list ID to join."
        onBlur={(e) => setListID(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>

      {error !== '' ? <p>{error}</p> : null}
    </>
  );
};
