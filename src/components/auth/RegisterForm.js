import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from '../../hooks/useForm';

export const Register = () => {
  const [disabled, setDisabled] = useState(false);
  const [value, handleChange] = useForm({
    userName: '',
    password: '',
  });

  const [error, setError] = useState();

  const navigate = useNavigate();

  const { userName, password } = value;

  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:5000/api/v1/auth/register',
        {
          name: `${userName}`,
          password: `${password}`,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        console.log(res);
        alert('Account created successfuly!');
        navigate('/');
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  // Deshabilitamos botones de login si los input estan vacio
  useEffect(() => {
    if ([userName, password].includes('')) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [userName, password, disabled]);

  return (
    <section
      className="row p-0 m-0"
      style={{ height: 100 + 'vh', width: 100 + '%' }}
    >
      <article className="d-flex flex-column justify-content-center align-items-center">
        <form
          className="form-control bg-white p-3 shadow-lg rounded-3 "
          style={{ width: 90 + '%', maxWidth: 500 + 'px' }}
          onSubmit={handleSubmitSignUp}
        >
          <h1 className="text-center fs-3 my-3 text-uppercase text-black">
            Sign Up
          </h1>
          <div className="d-flex flex-column form-floating my-2">
            <input
              className="form-control"
              id="user-login"
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
            />
            <label htmlFor="user-login">Your username</label>
          </div>

          <div className="d-flex flex-column form-floating my-2">
            <input
              className="form-control"
              id="password-login"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="password-login">Your password</label>
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
              Sign Up
            </button>
          </div>
          <p className="text-center">
            Already have have an account?
            <Link
              to="/"
              className="text-decoration-none link-dark fw-bold mx-1"
            >
              Login
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
};
