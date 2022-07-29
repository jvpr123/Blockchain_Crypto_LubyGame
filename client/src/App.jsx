import { useState, useEffect, useMemo } from "react";

import Web3 from "web3";

import Header from "./components/header/Header";
import InstallMetamaskModal from "./components/modal/InstallMetamaskModal";

import LubyGameContract from "./contracts/LubyGame.json";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState();
  const [metamaskRequiredModal, setMetamaskRequiredModal] = useState(false);

  useEffect(() => {
    if (!window.ethereum) {
      setMetamaskRequiredModal(true);
      return;
    }

    setMetamaskRequiredModal(false);
    connectMetamask();
  }, []);

  const connectMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      setIsConnected(true);

      return;
    } catch (error) {
      setIsConnected(false);
      console.error(error);
    }
  };

  return (
    <>
      <Header isConnected={isConnected} connectMetamask={connectMetamask} />
      <InstallMetamaskModal toggle={metamaskRequiredModal} />
    </>
  );
}

export default App;
