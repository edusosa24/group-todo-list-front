import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/GlobalStates';
import { useForm } from '../../hooks/useForm';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [value, handleChange] = useForm({
    userName: '',
    password: '',
  });

  const [error, setError] = useState();

  const [authState, setAuthState] = useContext(AuthContext);

  const navigate = useNavigate();

  const { userName, password } = value;

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:5000/api/v1/auth/login',
        {
          name: `${userName}`,
          password: `${password}`,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        const token = res.data.token;
        const userID = jwt_decode(res.data.token).id;
        setAuthState({
          ...authState,
          token: token,
          _id: userID,
        });
        navigate('/my-profile');
      })
      .catch((err) => {
        console.log(err);
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
          onSubmit={handleSubmitLogin}
        >
          <h1 className="text-center fs-3 my-3 text-uppercase text-black">
            Login
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
              Login
            </button>
          </div>
          <p className="text-center">
            You don't have an account?
            <Link
              to="/register"
              className="text-decoration-none link-dark fw-bold mx-1"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
};
