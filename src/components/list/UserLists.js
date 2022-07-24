import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/GlobalStates';
import axios from 'axios';

export const UserLists = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const { token } = authState;
    axios
      .get('http://localhost:5000/api/v1/auth/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const member = res.data.data.member_lists;
        const created = res.data.data.created_lists;
        setAuthState({
          ...authState,
          userMemberLists: member,
          userCreatedLists: created,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (listId) => {
    const { token, userCreatedLists } = authState;
    let posList = 0;

    for (let i = 0; i < userCreatedLists.length; i++) {
      if (userCreatedLists[i]._id === listId) {
        posList = i;
        break;
      }
    }

    userCreatedLists.splice(posList, 1);

    axios
      .delete(`http://localhost:5000/api/v1/lists/${listId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setAuthState({
          ...authState,
          userCreatedLists: userCreatedLists,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLeave = async (listId) => {
    let { token, userMemberLists, _id } = authState;
    let members = [];
    let posUser = 0;
    let posList = 0;

    for (let i = 0; i < userMemberLists.length; i++) {
      if (userMemberLists[i]._id === listId) {
        members = userMemberLists[i].members;
        posList = i;
        break;
      }
    }

    posUser = members.indexOf(_id);

    members.splice(posUser, 1);
    userMemberLists.splice(posList, 1);

    axios
      .put(
        `http://localhost:5000/api/v1/lists/${listId}`,
        {
          members: members,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setAuthState({
          ...authState,
          userMemberLists: userMemberLists,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const redirectToList = (listId) => {
    setAuthState({
      ...authState,
      currentListID: listId,
    });

    navigate('/list');
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {authState.userCreatedLists?.map((list) => {
            return (
              <tr key={list._id}>
                <td>
                  <button onClick={() => redirectToList(list._id)}>
                    {list.title}
                  </button>
                </td>
                <td>
                  <p>{list._id}</p>
                </td>
                <td>
                  <button onClick={() => handleDelete(list._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
          {authState.userMemberLists?.map((list) => {
            return (
              <tr key={list._id}>
                <td>
                  <button onClick={() => redirectToList(list._id)}>
                    {list.title}
                  </button>
                </td>
                <td>
                  <p>{list._id}</p>
                </td>
                <td>
                  <button onClick={() => handleLeave(list._id)}>Leave</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
