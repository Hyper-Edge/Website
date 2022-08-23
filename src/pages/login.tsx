import React, { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import Trade from '@/components/ui/trade';
import Login from '@/components/authentication/login';
import SignIn from '@/components/moralis/sign-in';
import { SignOut } from '@/components/moralis/sign-out';
import { useMoralis } from 'react-moralis';
const LoginPage: NextPageWithLayout = () => {
  const { isAuthenticated } = useMoralis();
  let [toggleCoin, setToggleCoin] = useState(false);
  return (
    <>
      <NextSeo
        title="Login"
        description="HyperEdge - future blockchain technology"
      />
      {isAuthenticated ? <SignOut /> : <SignIn />}
    </>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LoginPage;
