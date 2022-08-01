import { createContext, useState, useReducer } from "react";

import Web3 from "web3";
import LubyGameContract from "../contracts/LubyGame.json";

const accountIntialState = { address: "No account connected", balance: 0 };

const accountReducer = (latestState, action) => {
  if (action.type === "ADDRESS_UPDATE") {
    return {
      address: action.address,
      balance: action.balance,
    };
  }

  if (action.type === "BALANCE_UPDATE") {
    return {
      address: latestState.address,
      balance: action.balance,
    };
  }

  return latestState;
};

const MetamaskContext = createContext({
  isConnected: false,
  account: accountIntialState,
  network: "No network connected",
  handleAccountsConnection: async () => {},
  handleRequestAccountConnection: async () => {},
  handleGetNetwork: async () => {},
  handleGetContractInstance: async () => {},
});

export const MetamaskContextProvider = ({ children }) => {
  const web3 = new Web3(Web3.givenProvider);

  const [isConnected, setIsConnected] = useState(false);
  const [account, dispatchAccount] = useReducer(
    accountReducer,
    accountIntialState
  );

  const [network, setNetwork] = useState("");

  const handleUpdateAccount = async (accounts) => {
    if (accounts.length > 0) {
      const balance = await web3.eth.getBalance(accounts[0]);

      setIsConnected(true);
      dispatchAccount({
        type: "ADDRESS_UPDATE",
        address: accounts[0],
        balance,
      });
    } else {
      setIsConnected(false);
      dispatchAccount({});
    }
  };

  const handleSetAccountConnection = async () => {
    const accounts = await web3.eth.getAccounts();
    await handleUpdateAccount(accounts);
  };

  const handleRequestAccountConnection = async () => {
    if (!isConnected) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await handleUpdateAccount(accounts);
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
