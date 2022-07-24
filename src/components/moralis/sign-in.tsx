import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import Logo from './Web3Auth.svg';
import { useState } from 'react';

export default function SignIn() {
  const { authenticate, authError, isAuthenticating, Moralis } = useMoralis();

  const handleCustomLogin = async () => {
    let chain = parseInt(Moralis.Chains.ETH_ROPSTEN, 16);
    await authenticate({
      provider: 'web3Auth',
      clientId:
        'BOgdJYwd5tJEV2d_RzLbZyzK-_VSTRPZj5lMDGCE9czzsOEKEERzseVS46mXEI03haM44GNUbRHdAQknY-dGB1Y',
      chainId: chain,
    });
  };

  return (
    <div className="card">
      <Image className="img" src={Logo} width={80} height={80} />
      {isAuthenticating && <p className="gren">Authenticating</p>}
      {authError && (
        <p className="error">{JSON.stringify(authError.message)}</p>
      )}
      <div className="buttonCard">
        <button className="loginButton" onClick={handleCustomLogin}>
          Login with Web3Auth
        </button>
      </div>
    </div>
  );
}
