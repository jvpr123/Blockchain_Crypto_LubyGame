import {
  createContext,
  useState,
  useReducer,
  useMemo,
  useCallback,
} from "react";

import Web3 from "web3";
import LubyGameContract from "../contracts/LubyGame.json";

const accountIntialState = { address: "No account connected", balance: 0 };
const networkIntialState = { network: "No account connected", isValid: false };

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

const networkReducer = (latestState, action) => {
  if (action.type === "CHANGE_NETWORK") {
    return {
      network: action.network,
      isValid: action.network === "PRIVATE" ? true : false,
    };
  }

  return latestState;
};

const MetamaskContext = createContext({
  web3: {},
  isConnected: false,
  contract: {},
  account: accountIntialState,
  network: networkIntialState,
  handleAccountsConnection: async () => {},
  handleRequestAccountConnection: async () => {},
  handleGetNetwork: async () => {},
  handleGetContractInstance: async () => {},
  handleVerifyOwner: async () => {},
  handleGetContractBalance: async () => {},
  handleWithdrawContractBalance: async () => {},
});

export const MetamaskContextProvider = ({ children }) => {
  const web3 = useMemo(() => new Web3(Web3.givenProvider), []);

  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState({});

  const [account, dispatchAccount] = useReducer(
    accountReducer,
    accountIntialState
  );
  const [network, dispatchNetwork] = useReducer(
    networkReducer,
    networkIntialState
  );

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
      await handleGetContractInstance();

      dispatchNetwork({
        type: "CHANGE_NETWORK",
        network: network.toLocaleUpperCase(),
      });
    }
  };

  const handleGetContractInstance = useCallback(async () => {
    const currentNetworkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(
      LubyGameContract.abi,
      LubyGameContract.networks[currentNetworkId] &&
        LubyGameContract.networks[currentNetworkId].address
    );

    setContract(contract);
  }, [web3]);

  const handleVerifyOwner = async () => {
    const ownerAddress = await contract.methods
      .owner()
      .call({ from: account.address });

    return ownerAddress === account.address ? true : false;
  };

  const handleGetContractBalance = async () =>
    await contract.methods.getBalance(account.address).call();

  const handleWithdrawContractBalance = async () =>
    await contract.methods.withdraw().send({ from: account.address });

  return (
    <MetamaskContext.Provider
      value={{
        web3,
        contract,
        isConnected,
        account,
        network,
        handleAccountsConnection,
        handleRequestAccountConnection,
        handleGetNetwork,
        handleGetContractInstance,
        handleVerifyOwner,
        handleGetContractBalance,
        handleWithdrawContractBalance,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export default MetamaskContext;
