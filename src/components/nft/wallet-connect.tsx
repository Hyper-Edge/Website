import Button from '@/components/ui/button';
import { WalletContext } from '@/lib/hooks/use-connect';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';
import { Refresh } from '@/components/icons/refresh';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

export default function WalletConnect() {
  const { logout, Moralis, account, user, isAuthenticated, authenticate } =
    useMoralis();
  const [balance, setBalance] = useState(0);
  const handleCustomLogin = async () => {
    let chain = parseInt(Moralis.Chains.ETH_ROPSTEN, 16);
    await authenticate({
      provider: 'web3Auth',
      clientId:
        'BOgdJYwd5tJEV2d_RzLbZyzK-_VSTRPZj5lMDGCE9czzsOEKEERzseVS46mXEI03haM44GNUbRHdAQknY-dGB1Y',
      chainId: chain,
    });
  };

  const fetchBalance = async () => {
    try {
      const address = user!.attributes.accounts[0];
      const options: { chain: '0x3'; address: string } = {
        chain: Moralis.Chains.ETH_ROPSTEN,
        address: address,
      };
      const balance = await Moralis.Web3API.account.getNativeBalance(options);
      console.log(balance, 'balance');
      setBalance(parseInt(balance.balance) / 10 ** 18);
      return parseInt(balance.balance) / 10 ** 18;
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      console.log('logged in user:', user);
      console.log('logged in user:', Moralis.User.current());
      fetchBalance().then((a) => console.log('got balance: ', a));
      const query = new Moralis.Query('EthTransactions');
      query.equalTo('from_address', user!.get('ethAddress'));
      query.find().then((a) => console.log('user transactions:', a));
    }
  }, [isAuthenticated]);
  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative">
            <Menu>
              <Menu.Button className="block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12"></Menu.Button>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Menu.Items className="absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 p-3 dark:border-gray-700">
                      <ActiveLink
                        href="/profile"
                        className="flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      >
                        <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span>
                        <span className="grow uppercase">
                          View Your Profile
                        </span>
                        <ChevronForward />
                      </ActiveLink>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Item>
                      <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                            Balance
                          </span>
                          <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                            {user!.attributes.accounts[0].slice(0, 6)}
                            {'...'}
                            {user!.attributes.accounts[0].slice(
                              user!.attributes.accounts[0].length - 6
                            )}
                          </span>
                        </div>
                        <div className="mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                          {balance} ETH
                        </div>
                      </div>
                    </Menu.Item>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={fetchBalance}
                      >
                        <Refresh />
                        <span className="grow uppercase">Refresh balance</span>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={logout}
                      >
                        <PowerIcon />
                        <span className="grow uppercase">Disconnect</span>
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <ActiveLink href="/create-nft">
            <Button className="shadow-main hover:shadow-large">CREATE</Button>
          </ActiveLink>
        </div>
      ) : (
        <Button
          onClick={() => handleCustomLogin()}
          className="shadow-main hover:shadow-large"
        >
          CONNECT
        </Button>
      )}
    </>
  );
}
