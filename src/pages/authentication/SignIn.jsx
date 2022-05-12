import React from 'react'
import { useState } from 'react'
import '../../App.css';
import './Authentication.css';
import axios from 'axios';
import Input from '../../components/UI/input/Input.jsx'
import Button from '../../components/UI/button/Button';
import { Link } from 'react-router-dom';

const SignIn = () => {

  const [password, setPassword] = useState('');

  const [login, setLogin] = useState('');

  const [token, setToken] = useState('');

  async function Login(){
        const response = axios.post("https://localhost:5001/api/login", {
            login: login,
            password: password
        }).then((response) => {
            setToken(response.data.token);
            console.log(token);
        });
  }
  
  return (
      <body>
        <div className='sign__in__container'>
          <h2 className='welcome__text'>Welcome</h2>
          <div className="sign__in__input__container">
            <Input placeholder='Email' type='text'/>
            <Input placeholder='Password' type='password'/>  
          </div>
          <div className="btn__container">
            <Button>Login</Button>
          </div>
          <div className="link__container">
            <div className="answer__text">Don't have an account?{' '}
              <Link to='/signup' className='link'>
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </body>
  )
}

export default SignIn;
