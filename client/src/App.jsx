import { useState, useEffect, useCallback, useMemo } from "react";
import Web3 from "web3";

function App() {
  const [account, setAccoount] = useState();
  const [network, setNetwork] = useState();
  const [balance, setBalance] = useState();

  const web3 = useMemo(() => new Web3(Web3.givenProvider), []);

  const loadAccounts = useCallback(async (provider) => {
    const accounts = await provider.eth.requestAccounts();
    setAccoount(accounts[0]);
  }, []);

  const loadBalance = useCallback(
    async (provider) => {
      const network = await provider.eth.net.getNetworkType();
      const balance = await provider.eth.getBalance(account);

      setNetwork(network);
      setBalance(balance);
    },
    [account]
  );

  window.ethereum.on("accountsChanged", (accounts) => setAccoount(accounts[0]));
  window.ethereum.on("chainChanged", () => loadBalance(web3));

  useEffect(() => {
    loadAccounts(web3);
    loadBalance(web3);
  }, [loadAccounts, loadBalance, web3]);

  return (
    <>
      <p>Account: {account}</p>
      <p>
        Balance ({network}): {balance / (1e18).toFixed(5)}
      </p>
    </>
  );
}

export default App;
