import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/GlobalStates';
import axios from 'axios';

export const ListForm = () => {
  const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const [error, setError] = useState();

  const [authState, setAuthState] = useContext(AuthContext);

  const navigate = useNavigate();

  const { title, description } = values;

  const handleSubmitCreate = (e) => {
    e.preventDefault();

    const token = authState.token;

    axios
      .post(
        'http://localhost:5000/api/v1/lists',
        {
          title: `${title}`,
          description: `${description}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        navigate('/my-profile');
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  const handleTitleChange = (e) => {
    setValues({
      ...values,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setValues({
      ...values,
      description: e.target.value,
    });
  };

  // Deshabilitamos botones si los input estan vacios
  useEffect(() => {
    if ([title, description].includes('')) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [title, description, disabled]);

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
            Create List
          </h1>
          <div className="d-flex flex-column form-floating my-2">
            <input
              className="form-control"
              id="title-create-list"
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
            <label htmlFor="title-create-list">
              Enter the title of the list.
            </label>
          </div>

          <div className="d-flex flex-column form-floating my-2">
            <textarea
              className="form-control"
              id="description-create-list"
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <label htmlFor="description-create-list">
              Enter a description of the list.
            </label>
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
