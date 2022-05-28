import React from 'react'
import { useState } from 'react'
import './Authentication.css';
import Input from '../../components/ui/input/Input.jsx'
import Button from '../../components/ui/button/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignIn = () => {
  const [data, setData] = useState({  login: '', password: '' });
  const url = 'https://localhost:5001/api/login';
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
      Login();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors= {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.login){
      errors.login = "Email is required!"
    } else if (!regex.test(values.login)){
      errors.login = "This is not a valid email format!!"
    }

    if(!values.password){
      errors.password = "Password is required!"
    }  else if (values.password.length < 8){
      errors.password = "Account not found!"
    } else if (values.password.length > 16){
      errors.password = "Account not found!"
    } 
    return errors;
  }

  async function Login(){
    
    localStorage.setItem('isAuth', false);

    const requestData = { login: data.login, password: data.password};
    await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }).then(function(response){
      if(response.status === 401){
        setFormErrors({ password: 'Account not found!' });
      }else if(response.status === 200){
        navigate("../", { replace: true })
        return response.json();
      }
    }).then(function(data) { 
      if(typeof data !== "undefined"){
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuth', true);
      }
    });
  }
  
  const onChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='main__container'>
        <div className='sign__in__container'>
          <h2 className='welcome__text'>Welcome</h2>
          <div className="sign__in__input__container">
            <Input 
                placeholder='Email' 
                name='login' 
                value={data.login}
                onChange={onChange}/>
            <p className='error'>{ formErrors.login }</p>
            <Input 
                placeholder='Password' 
                type='password'
                name='password'
                value={data.password}
                onChange={onChange}/>  
            <p className='error'>{ formErrors.password }</p>
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
      </div>
    </form>
  )
}

export default SignIn;
