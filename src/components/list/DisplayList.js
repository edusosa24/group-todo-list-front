import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../utils/GlobalStates';
import axios from 'axios';
import '../../styles/list-info.css';

export const DisplayList = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const [list, setList] = useState({});

  useEffect(() => {
    const { token, currentListID } = authState;
    axios
      .get(`http://localhost:5000/api/v1/lists/${currentListID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const getList = res.data.data;
        setList(getList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = async (taskId, taskState) => {
    const { token } = authState;
    let state = 'Pending';
    let updatedList = list;
    if (taskState === 'Pending') {
      state = 'In Process';
    } else if (taskState === 'In Process') {
      state = 'Completed';
    }

    axios
      .put(
        `http://localhost:5000/api/v1/tasks/${taskId}`,
        {
          state: state,
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
        for (let i = 0; i < updatedList.tasks.length; i++) {
          if (updatedList.tasks[i]._id === taskId) {
            updatedList.tasks[i].state = state;
            break;
          }
        }
        setList({
          ...list,
          tasks: updatedList.tasks,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (taskId) => {
    const { token } = authState;
    let pos = 0;
    let updatedList = list;

    for (let i = 0; i < updatedList.tasks.length; i++) {
      if (updatedList.tasks[i]._id === taskId) {
        pos = i;
        break;
      }
    }

    updatedList.tasks.splice(pos, 1);

    axios
      .delete(`http://localhost:5000/api/v1/tasks/${taskId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setList({
          ...list,
          tasks: updatedList.tasks,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="list-general-info">
        <h1 className="list-title">{list?.title}</h1>
        <p className="list-description">{list?.description}</p>
      </div>
      <section className="list-tasks">
        {list?.tasks?.map((task) => {
          return (
            <div className="list-task" key={task._id}>
              <p className="task-todo">{task.todo}</p>
              <div className="task-buttons">
                <button
                  className="btn btn-sm task-state"
                  onClick={() => handleUpdate(task._id, task.state)}
                  value={task.state}
                >
                  {task.state}
                </button>
                <button
                  className="btn btn-sm btn-dark"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
