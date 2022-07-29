import { useState, useEffect, useMemo } from "react";

import Web3 from "web3";
import InstallMetamaskModal from "./components/modal/InstallMetamaskModal";

import LubyGameContract from "./contracts/LubyGame.json";

function App() {
  // const [account, setAccoount] = useState();
  // const [contract, setContract] = useState();

  // useEffect(() => {
  //   const loadAccounts = async (provider) => {
  //     const accounts = await provider.eth.requestAccounts();
  //     setAccoount(accounts[0]);
  //   };

  //   const loadContract = async (provider) => {
  //     const networkId = await provider.eth.net.getId();
  //     const contract = new provider.eth.Contract(
  //       LubyGameContract.abi,
  //       LubyGameContract.networks[networkId] &&
  //         LubyGameContract.networks[networkId].address
  //     );

  //     setContract(contract);
  //   };

  //   loadAccounts(web3);
  //   loadContract(web3);
  // }, []);

  // const handleMint = async () => {
  //   try {
  //     await contract.methods
  //       .mintLbc(web3.utils.toWei(web3.utils.toBN(1), "ether"))
  //       .send({ from: account });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleStartGame = async () => {
  //   try {
  //     await contract.methods
  //       .approve(web3.utils.toWei(web3.utils.toBN(1), "ether"))
  //       .send({ from: account });

  //     await contract.methods
  //       .startGame(web3.utils.toWei(web3.utils.toBN(1), "ether"))
  //       .send({ from: account });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleBalance = async () => {
  //   try {
  //     const balance = await contract.methods
  //       .getBalanceIndividual()
  //       .call({ from: account });

  //     console.log(balance);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState();
  const [metamaskRequiredModal, setMetamaskRequiredModal] = useState(false);

  useEffect(() => {
    if (!window.ethereum) {
      setMetamaskRequiredModal(true);
      return;
    }

    setMetamaskRequiredModal(false);
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
        <div className="container-fluid">
          <h1 className="navbar-brand">Luby Game</h1>
          <button onClick={connectMetamask} className="btn btn-light">
            🦊 {isConnected ? "Connected" : "Connect to Metamask"}
          </button>
        </div>
      </nav>

      <InstallMetamaskModal toggle={metamaskRequiredModal} />
    </>
  );
}

export default App;
