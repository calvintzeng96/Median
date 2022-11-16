import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { ModalContext } from "../../context/Modal"
import "./login-signup.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { setModalType } = useContext(ModalContext)

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user) {
      setModalType(null)
    }
  }, [user])

  const demoLogin = () => {
    setEmail("email1@gmail.com")
    setPassword("password1")
    return dispatch(login(email, password)).then(() => setModalType(null))
  }


  return (
    <form id="login-container" className="modal-content" onSubmit={onLogin}>
      <div id="login-title">Log In</div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      {/* <div className="border"> */}
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          // placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      {/* </div> */}
      {/* <div className="border"> */}
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          // placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      {/* </div> */}
      <button type='submit'>Login</button>
      <button onClick={() => demoLogin()}>Demo Login</button>
    </form>
  );
};

export default LoginForm;
