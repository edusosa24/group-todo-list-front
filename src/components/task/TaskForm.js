import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/GlobalStates';
import axios from 'axios';

export const TaskForm = () => {
  const [disabled, setDisabled] = useState(false);
  const [todo, setTodo] = useState('');

  const [error, setError] = useState();

  const [authState, setAuthState] = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmitCreate = (e) => {
    e.preventDefault();

    const token = authState.token;
    const fromList = authState.currentListID;

    axios
      .post(
        'http://localhost:5000/api/v1/tasks',
        {
          todo: `${todo}`,
          fromList: `${fromList}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        navigate('/list');
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Deshabilitamos botones si el input está vacio
  useEffect(() => {
    if (todo === '') {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [todo]);

  return (
    <section
      className="row p-0 m-0"
      style={{ height: 100 + 'vh', width: 100 + '%' }}
    >
      <article className="d-flex flex-column justify-content-center align-items-center">
        <form
          className="form-control bg-white p-3 shadow-lg rounded-3 "
          style={{ width: 90 + '%', maxWidth: 500 + 'px' }}
          onSubmit={handleSubmitCreate}
        >
          <h1 className="text-center fs-3 my-3 text-uppercase text-black">
            Create Task
          </h1>

          <div className="d-flex flex-column form-floating my-2">
            <textarea
              className="form-control"
              id="todo"
              type="text"
              name="todo"
              value={todo}
              onChange={handleChange}
            />
            <label htmlFor="todo">Enter a todo.</label>
          </div>

          {error !== '' ? <p>{error}</p> : null}

          <div className="d-grid gap-2 my-3">
            <button
              type="submit"
              disabled={disabled}
              className={
                setDisabled
                  ? `btn btn-lg btn-primary ${disabled}`
                  : `btn btn-lg btn-primary`
              }
            >
              Create
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};
