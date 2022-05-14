import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/UI/input/Input';
import Button from '../../components/UI/button/Button';
import '../authentication/Authentication.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({  login: '', password: '' });
  const url = 'https://localhost:5001/api/register';
  let navigate = useNavigate();

  async function Registration (e){
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
          console.log('user with the same email already exists')
        }else if(result.status === 200){
          navigate("../signin", { replace: true });
        }
    });
  }
  const onChange = (e) => {
    e.persist();
    console.log(data);
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={Registration}>
      <div className='main__container'>
          <div className='sign__up__container'>
            <h2 className='welcome__text'>Create account</h2>
            <div className="sign__up__input__container">
              <Input placeholder='Email' 
                  type='text' 
                  name="login" 
                  onChange={onChange} 
                  value={data.login}/>
              <Input placeholder='Password' 
                  type='password'
                  name='password'
                  onChange={onChange}
                  value={data.password}/>
              <Input placeholder='Confirm Password' type='password'/>    
            </div>
            <div className="btn__container">
              <Button>Sign up</Button>
            </div>
            <div className="link__container">
              <div className="answer__text">Have an account?{' '}
                <Link to='/signin' className='link'>
                  SignIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
  )
}

export default SignUp
