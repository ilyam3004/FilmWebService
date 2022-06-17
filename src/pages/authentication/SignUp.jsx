import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../authentication/Authentication.css';
import { useNavigate } from "react-router-dom";
import Input from '../../components/ui/input/Input';

const SignUp = () => {
  const [data, setData] = useState({  login: '', password: '', confirmPassword: '' });
  const url = 'https://movie-web-api-service.herokuapp.com/api/register';
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
      Registration();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors= {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.login){
      errors.login = "Email is required!"
    } else if (!regex.test(values.login)){
      errors.login = "This is not a valid email format!"
    }

    if(!values.password){
      errors.password = "Password is required!"
    }  else if (values.password.length < 8){
      errors.password = "Password must be more then 8 characters!"
    } else if (values.password.length > 16){
      errors.password = "Password must be less then 16 characters!"
    } 
    
    if(!values.confirmPassword){
      errors.confirmPassword = "Confirm password is required!"
    } else if(values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match!"
    }
    return errors;
  }

  async function Registration(){
    const requestData = { login: data.login, password: data.password};
    await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }).then((result) => {
        if(result.status === 400){
          setFormErrors({ login: 'User with this email already exists!', password: '', confirmPassword: ''});
        }else if(result.status === 200){
          navigate("../signin", { replace: true });
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
          <div className='sign__up__container'>
            <h2 className='welcome__text'>Create account</h2>
            <div className="sign__up__input__container">
              <Input placeholder='Email' 
                  type='text' 
                  name="login" 
                  onChange={onChange} 
                  value={data.login}/>
                  <p className='error'>{ formErrors.login }</p>
              <Input placeholder='Password' 
                  type='password'
                  name='password'
                  onChange={onChange}
                  value={data.password}/>
                  <p className='error'>{ formErrors.password }</p>
              <Input placeholder='Confirm Password' 
                  type='password'
                  name='confirmPassword'
                  onChange={onChange}
                  value={data.confirmPassword}/>
                  <p className='error'>{ formErrors.confirmPassword }</p>   
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
            <div className="link__container">
            <div className="answer__text">Want to try without Sign Up?{' '}
              <Link to='/' 
                  className='link' 
                  onClick={() => localStorage.setItem('isAuht', false)}>
                Click here!
              </Link>
            </div>
          </div>
          </div>
        </div>
      </form>
  )
}

export default SignUp
