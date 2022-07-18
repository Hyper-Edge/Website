import React, { useCallback, useRef, useState } from 'react';
import { User } from './User'; // component display user (see detail on /example directory)
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialTwitter,
  IResolveParams,
} from 'reactjs-social-login';

// CUSTOMIZE ANY UI BUTTON
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';

const REDIRECT_URI = 'http://localhost:3000';

export default function SocialLogin() {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  return (
    <>
      {provider && profile ? (
        <User
          provider={provider}
          profile={profile}
          onLogout={onLogoutSuccess}
        />
      ) : (
        <div className={`App ${provider && profile ? 'hide' : ''}`}>
          <h1 className="title">ReactJS Social Login</h1>
          <LoginSocialFacebook
            appId={process.env.REACT_APP_FB_APP_ID || ''}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>

          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GG_APP_ID || ''}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>

          <LoginSocialAmazon
            client_id={process.env.REACT_APP_AMAZON_APP_ID || ''}
            redirect_uri={REDIRECT_URI}
            onResolve={({ provider, data }: IResolveParams) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err: any) => {
              console.log(err);
            }}
            onLoginStart={onLoginStart}
          >
            <AmazonLoginButton />
          </LoginSocialAmazon>

          <LoginSocialInstagram
            client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
            client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err: any) => {
              console.log(err);
            }}
          >
            <InstagramLoginButton />
          </LoginSocialInstagram>

          <LoginSocialMicrosoft
            client_id={process.env.REACT_APP_MICROSOFT_APP_ID || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err: any) => {
              console.log(err);
            }}
          >
            <MicrosoftLoginButton />
          </LoginSocialMicrosoft>

          <LoginSocialLinkedin
            client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
            client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err: any) => {
              console.log(err);
            }}
          >
            <LinkedInLoginButton />
          </LoginSocialLinkedin>

          <LoginSocialGithub
            client_id={process.env.REACT_APP_GITHUB_APP_ID || ''}
            client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err: any) => {
              console.log(err);
            }}
          >
            <GithubLoginButton />
          </LoginSocialGithub>

          <LoginSocialTwitter
            client_id={process.env.REACT_APP_TWITTER_API_KEY || ''}
            client_secret={process.env.REACT_APP_TWITTER_APP_SECRET || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err: any) => {
              console.log(err);
            }}
          >
            <TwitterLoginButton />
          </LoginSocialTwitter>
        </div>
      )}
    </>
  );
}
