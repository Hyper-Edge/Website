import React, { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import Login from '@/components/authentication/login';
import Register from '@/components/authentication/register';

const RegisterPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Register"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <Register></Register>
    </>
  );
};

RegisterPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default RegisterPage;
