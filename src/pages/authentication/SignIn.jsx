import React from 'react'
import { useState } from 'react'
import '../../App.css';
import './Authentication.css';
import Input from '../../components/UI/input/Input.jsx'
import Button from '../../components/UI/button/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [data, setData] = useState({  login: '', password: '' });
  const url = 'https://localhost:5001/api/login';
  let navigate = useNavigate();

  async function Login(e){ 
      e.preventDefault();
      const requestData = { login: data.login, password: data.password};
      console.log(JSON.stringify(requestData));
      await fetch(url, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }).then((result) => {
          if(result.status === 400){
            console.log('invalid data')
          }else if(result.status === 200){
            navigate("../watched", { replace: true });
          }
      });
  }
  const onChange = (e) => {
    e.persist();
    console.log(data);
    setData({ ...data, [e.target.name]: e.target.value });
  }
  return (
      <div className='main__container'>
        <div className='sign__in__container'>
          <h2 className='welcome__text'>Welcome</h2>
          <div className="sign__in__input__container">
            <Input 
                placeholder='Email' 
                name='login' 
                value={data.login}
                onChange={onChange}/>
            <Input 
                placeholder='Password' 
                type='password'
                name='password'
                value={data.password}
                onChange={onChange}/>  
          </div>
          <div className="btn__container">
            <Button onClick={Login}>Login</Button>
          </div>
          <div className="link__container">
            <div className="answer__text">Don't have an account?{' '}
              <Link to='/signup' className='link'>
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SignIn;
