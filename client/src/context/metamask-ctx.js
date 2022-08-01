import { createContext, useState } from "react";

import Web3 from "web3";
import LubyGameContract from "../contracts/LubyGame.json";

const MetamaskContext = createContext({
  isConnected: false,
  account: "",
  network: "",
  handleAccountsConnection: async () => {},
  handleRequestAccountConnection: async () => {},
  handleGetNetwork: async () => {},
  handleGetContractInstance: async () => {},
});

export const MetamaskContextProvider = ({ children }) => {
  const web3 = new Web3(Web3.givenProvider);

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");

  const handleAccountChanged = (accounts) => {
    if (accounts.length > 0) {
      setIsConnected(true);
      setAccount(accounts[0]);
    } else {
      setAccount("");
      setIsConnected(false);
    }
  };

  const handleSetAccountConnection = async () => {
    const accounts = await web3.eth.getAccounts();
    handleAccountChanged(accounts);
  };

  const handleRequestAccountConnection = async () => {
    if (!isConnected) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      handleAccountChanged(accounts);
    }
  };

  const handleAccountsConnection = async () => {
    if (window.ethereum) {
      await handleSetAccountConnection();
    }
  };

  const handleGetNetwork = async () => {
    if (window.ethereum) {
      const network = await web3.eth.net.getNetworkType();
      setNetwork(network.toLocaleUpperCase());
    }
  };

  const handleGetContractInstance = async () => {
    const currentNetworkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(
      LubyGameContract.abi,
      LubyGameContract.networks[currentNetworkId] &&
        LubyGameContract.networks[currentNetworkId].address
    );

    return contract;
  };

  return (
    <MetamaskContext.Provider
      value={{
        isConnected,
        account,
        network,
        handleAccountsConnection,
        handleRequestAccountConnection,
        handleGetNetwork,
        handleGetContractInstance,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export default MetamaskContext;
