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

export default function Login() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const [loginData, setLoginData] = useState<any>();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //update based on reducer
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = {
        username: emailRef.current.value,
        password: passwordRef.current.value,
      };
      // const res = await axios.post(process.env.SERVER+"/auth/login",{
      //     username: emailRef.current.value,
      //     password: passwordRef.current.value
      // })
      //update based on reducer
      dispatch({ type: 'LOGIN_SUCCESS', payload: res });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
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

  return (
    <>
      {!loginData ? (
        <div className="site-wrap d-md-flex align-items-stretch">
          <Image src={ImgBg1} className="bg-img"></Image>
          <div className="form-wrap">
            <div className="form-inner">
              <h1 className="title">Login</h1>
              <p className="caption mb-4">
                Please enter your login details to sign in.
              </p>
              <form className="pt-3" onSubmit={handleSubmit}>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="info@example.com"
                    ref={emailRef}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="form-floating">
                  <span className="password-show-toggle js-password-show-toggle">
                    <span className="uil"></span>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                    />
                    <label htmlFor="remember" className="form-check-label">
                      Keep me logged in
                    </label>
                  </div>
                  <div>
                    <a href="#">Forgot password?</a>
                  </div>
                </div>

                <div className="d-grid mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isFetching}
                  >
                    Log in
                  </button>
                </div>

                <div className="mb-2">
                  Don’t have an account?
                  <AnchorLink href="/register" className="link">
                    Register
                  </AnchorLink>
                </div>

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
          </div>
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
