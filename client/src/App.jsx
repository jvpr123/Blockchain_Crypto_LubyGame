import { useState, useEffect, useMemo, useCallback } from "react";

import Web3 from "web3";

import Header from "./components/header/Header";
import InstallMetamaskModal from "./components/modal/InstallMetamaskModal";

import LubyGameContract from "./contracts/LubyGame.json";

function App() {
  const web3 = useMemo(() => new Web3(Web3.givenProvider), []);

  const [account, setAccount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [metamaskRequiredModal, setMetamaskRequiredModal] = useState(false);

  const handleAccountsChange = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsConnected(true);
      return;
    }

    setIsConnected(false);
  };

  const connectMetamask = useCallback(async () => {
    if (window.ethereum === undefined) {
      setMetamaskRequiredModal(true);
      return;
    }

    setMetamaskRequiredModal(false);
    window.ethereum.on("accountsChanged", connectMetamask);

    try {
      const accountsConnected = await web3.eth.getAccounts();
      handleAccountsChange(accountsConnected);

      if (!isConnected) {
        const accountsToConnect = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        handleAccountsChange(accountsToConnect);
      }
    } catch (error) {
      setIsConnected(false);
    }
  }, [web3, isConnected]);

  useEffect(() => {
    connectMetamask();
  }, [connectMetamask]);

  return (
    <>
      <Header isConnected={isConnected} connectMetamask={connectMetamask} />
      <InstallMetamaskModal toggle={metamaskRequiredModal} />
    </>
  );
}

export default App;
