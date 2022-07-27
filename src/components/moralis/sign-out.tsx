import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';

export const SignOut = () => {
  const { logout, Moralis, user } = useMoralis();
  const [balance, setBalance] = useState(0);
  const fetchBalance = async () => {
    try {
      const address = user!.attributes.accounts[0];
      const options: { chain: '0x3'; address: string } = {
        chain: Moralis.Chains.ETH_ROPSTEN,
        address: address,
      };
      const balance = await Moralis.Web3API.account.getNativeBalance(options);
      setBalance(parseInt(balance.balance) / 10 ** 18);
    } catch {}
  };
  useEffect(() => {
    console.log('logged in user:', user);
    console.log('logged in user:', Moralis.User.current());
    fetchBalance();
    const query = new Moralis.Query('EthTransactions');
    query.equalTo('from_address', user!.get('ethAddress'));
    query.find().then((a) => console.log('user transactions:', a));
  }, []);
  async function getUserTransactions(user: any) {
    // create query
    const query = new Moralis.Query('EthTransactions');
    query.equalTo('from_address', user.get('ethAddress'));

    // subscribe to query updates ** add this**
    const subscription = await query.subscribe();
    handleNewTransaction(subscription);

    // run query
    const results = await query.find();
    console.log('user transactions:', results);
  }

  async function handleNewTransaction(subscription: any) {
    // log each new transaction
    subscription.on('create', function (data: any) {
      console.log('new transaction: ', data);
    });
  }
  const handleTransfer = async () => {
    try {
      const web3 = await Moralis.enableWeb3();
      console.log(user!.attributes.accounts[0]);
      await Moralis.transfer({
        amount: Moralis.Units.ETH('0.1'),
        receiver: '0xc0c7183305DB3bb791083bc028081Ea5Fc9B1588',
        type: 'native',
      }).then((e: any) => {
        alert('sucesfully transfered');
      });
      await fetchBalance();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="signOutCard">
      <h4>Welcome To Moralis x Web3Auth!</h4>
      <button className="refresh" onClick={fetchBalance}>
        Refresh
      </button>
      <p className="subHeader">Details:</p>

      <div className="detailsDiv">
        <div>
          <h5>Account:</h5>
          <p>{user!.attributes.accounts[0]}</p>
        </div>
        <div>
          <h5>Balance (Eth)</h5>
          <p>{balance} </p>
        </div>
      </div>

      <div className="fotter">
        <button className="loginButton" onClick={handleTransfer}>
          Test Transfer
        </button>
        <button className="loginButton" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};
