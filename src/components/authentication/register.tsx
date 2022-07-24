import axios from 'axios';
import ImgBg1 from '@/assets/images/img-bg-1.jpg';
import Image from '@/components/ui/image';
import { useModal } from '@/components/modal-views/context';
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import jwt_decode from 'jwt-decode';
import { Context } from '@/lib/hooks/context/Context';
import AnchorLink from '../ui/links/anchor-link';
interface googleAuthInt {
  profileObj: Object;
  tokenId: string;
  googleLoginResponse: GoogleLoginResponse | GoogleLoginResponseOffline;
}
const CLIENT_ID: string = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID as string;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loginData, setLoginData] = useState<any>();
  const { dispatch, isFetching } = useContext(Context);
  const handleCallbackResponse = (res: any) => {
    const userObj = jwt_decode(res.credential);
    console.log('User OBJ', userObj);
    setLoginData(userObj);
    localStorage.setItem('loginData', JSON.stringify(userObj));
  };
  useEffect(() => {
    // @ts-ignore
    if (google == undefined || google == null) {
      return;
    }
    const initializeGoogle = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallbackResponse,
      });

      // @ts-ignore
      google.accounts.id.renderButton(document.getElementById('googleSignin'), {
        theme: 'outline',
        size: 'large',
      });

      // @ts-ignore
      google.accounts.id.prompt();
    };
    initializeGoogle();
    // Perform localStorage action
    const item = localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData') || '{}')
      : null;
    if (item != null) {
      setLoginData(item);
      console.log(item);
    }
  }, []);
  const handleLogout = () => {
    setLoginData(null);
    localStorage.removeItem('loginData');
    window.location.reload();
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = {
        name,
        email,
        password,
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: res });
      // const res = await axios.post(server+"/auth/register",{
      //     username,
      //     email,
      //     password
      // })
      res && window.location.replace('/login');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      setError(true);
      console.log(err);
    }
  };
  return (
    <>
      {!loginData ? (
        <div className="register">
          <span className="registerTitle">Register</span>
          <form className="registerForm" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              className="registerInput"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
            />
            <label>Email</label>
            <input
              type="text"
              className="registerInput"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="registerInput"
              placeholder="Enter your password..."
            />
            <button className="registerButton">Register</button>
            <button className="registerLoginButton" type="submit">
              <AnchorLink href="/login" className="link">
                Login
              </AnchorLink>
            </button>
            {error && (
              <span style={{ color: 'red' }}>Something went wrong</span>
            )}
            <div className="social-account-wrap">
              <h4 className="mb-4">
                <span>or continue with</span>
              </h4>
              <div className="list-unstyled social-account d-flex justify-content-between">
                <div id="googleSignin"></div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div>You already loggedin</div>
          <div>{loginData.name}</div>
          <img src={loginData.picture} alt="" />
          <button onClick={(e) => handleLogout()}>Sign out</button>
          <div id="googleSignin" hidden></div>
        </>
      )}
    </>
  );
}
