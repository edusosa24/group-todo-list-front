import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const Register = () => {
  const [disabled, setDisabled] = useState(false);
  const [value, handleChange] = useForm({
    userName: '',
    password: ''
  });

  const { userName, password } = value;

  const handleSubmitSingUp = (e) => {
    e.preventDefault();

    console.log({ userName }, { password });
  };
 
  // Deshabilitamos botones de login si los input estan vacio
  useEffect(() => {
    if ([userName, password].includes('')) {
      setDisabled(true);
      return
    }
    setDisabled(false)
  }, [userName, password, disabled]);
  
  return (

    <section
      className='row p-0 m-0'
      style={{ height: 100 + 'vh', width: 100 + '%' }}
    >

      <article className='d-flex flex-column justify-content-center align-items-center'>
        
        <form
          className='form-control bg-white p-3 shadow-lg rounded-3 '
          style={{ width: 90 + '%', maxWidth: 500 + 'px' }}
          onSubmit={handleSubmitSingUp}
        >
          <h1 className='text-center fs-3 my-3 text-uppercase text-black'>Sing Up</h1>
          <div className='d-flex flex-column form-floating my-2'>
            <input
              className='form-control'
              id='user-login'
              type='text'
              name='userName'
              value={userName}
              onChange={handleChange}
            />
            <label htmlFor='user-login'>Your username</label>
          </div>

          <div className='d-flex flex-column form-floating my-2'>
            <input
              className='form-control'
              id='password-login'
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
            <label htmlFor='password-login'>Your password</label>
          </div>

          <div className='d-grid gap-2 my-3'>
            <button
              type='submit'
              disabled={disabled}
              className={
                (setDisabled)
                  ? `btn btn-lg btn-primary ${disabled}`
                  : `btn btn-lg btn-primary`
              }
            >
              Sing Up
            </button>
          </div>
          <p className='text-center'>
            Already have have an account?
            <Link
              to='/login'
              className='text-decoration-none link-dark fw-bold mx-1'
            >
              Login
            </Link>
          </p> 
        </form>
      </article>
    </section>
  )
};