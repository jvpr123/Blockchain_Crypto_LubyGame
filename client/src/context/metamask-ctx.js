import { createContext, useState } from "react";
import Web3 from "web3";

const MetamaskContext = createContext({
  isConnected: false,
  account: "",
  handleAccountsConnection: async () => {},
  handleRequestAccountConnection: async () => {},
});

export const MetamaskContextProvider = ({ children }) => {
  const web3 = new Web3(Web3.givenProvider);

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

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
      await handleRequestAccountConnection();
    }
  };

  return (
    <MetamaskContext.Provider
      value={{
        isConnected,
        account,
        handleAccountsConnection,
        handleRequestAccountConnection,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export default MetamaskContext;
