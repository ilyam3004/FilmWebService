import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/UI/input/Input';
import Button from '../../components/UI/button/Button';
import '../authentication/Authentication.css';

const SignUp = () => {
  return (
    <body>
        <div className='sign__up__container'>
          <h2 className='welcome__text'>Create account</h2>
          <div className="sign__up__input__container">
            <Input placeholder='Email' type='text'/>
            <Input placeholder='Password' type='password'/>
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
      </body>
  )
}

export default SignUp
