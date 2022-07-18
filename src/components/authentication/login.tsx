import Button from '@/components/ui/button';
import { WalletContext } from '@/lib/hooks/use-connect';
import IconApple from '@/assets/images/icon-apple.svg';
import IconFacebook from '@/assets/images/icon-facebook.svg';
import IconGoogle from '@/assets/images/icon-google.svg';
import IconTwitter from '@/assets/images/icon-twitter.svg';
import ImgBg1 from '@/assets/images/img-bg-1.jpg';
import Image from '@/components/ui/image';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import jwt_decode from 'jwt-decode';
interface googleAuthInt {
  profileObj: Object;
  tokenId: string;
  googleLoginResponse: GoogleLoginResponse | GoogleLoginResponseOffline;
}
const CLIENT_ID: string = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID as string;

export default function Login() {
  const [loginData, setLoginData] = useState<any>();
  const [loginFailed, setLoginFailed] = useState<boolean>();
  const { openModal } = useModal();
  const { address, disconnectWallet, balance } = useContext(WalletContext);
  // Error Handler
  const responseGoogleError = (response: any) => {
    console.log(response);
  };

  const handleCallbackResponse = (res: any) => {
    const userObj = jwt_decode(res.credential);
    console.log('User OBJ', userObj);
    setLoginData(userObj);
  };
  useEffect(() => {
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
    // Perform localStorage action
    // const item = localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData') || "{}"): null

    // @ts-ignore
    google.accounts.id.prompt();
  }, []);
  const handleLogout = () => {
    setLoginData(null);
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
              <form action="#" className="pt-3">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="info@example.com"
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
                  <button type="submit" className="btn btn-primary">
                    Log in
                  </button>
                </div>

                <div className="mb-2">
                  Don’t have an account? <a href="signup.html">Sign up</a>
                </div>

                <div className="social-account-wrap">
                  <h4 className="mb-4">
                    <span>or continue with</span>
                  </h4>
                  <ul className="list-unstyled social-account d-flex justify-content-between">
                    <li>
                      <div id="googleSignin"></div>{' '}
                    </li>
                    <li>
                      <a href="#">
                        <Image src={IconApple} alt="Apple logo"></Image>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Image src={IconFacebook} alt="Facebook logo"></Image>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Image src={IconTwitter} alt="Twitter logo"></Image>
                      </a>
                    </li>
                  </ul>
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
          <button onClick={(e) => handleLogout()}></button>
        </>
      )}
    </>
  );
}
