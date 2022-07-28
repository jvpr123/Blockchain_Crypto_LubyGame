import { useState, useEffect } from "react";
import Web3 from "web3";

import LubyGameContract from "./contracts/LubyGame.json";

function App() {
  const web3 = new Web3(Web3.givenProvider);

  const [account, setAccoount] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    const loadAccounts = async (provider) => {
      const accounts = await provider.eth.requestAccounts();
      setAccoount(accounts[0]);
    };

    const loadContract = async (provider) => {
      const networkId = await provider.eth.net.getId();
      const contract = new provider.eth.Contract(
        LubyGameContract.abi,
        LubyGameContract.networks[networkId] &&
          LubyGameContract.networks[networkId].address
      );

      setContract(contract);
    };

    loadAccounts(web3);
    loadContract(web3);
  }, []);

  const handleMint = async () => {
    try {
      await contract.methods
        .mintLbc(web3.utils.toWei(web3.utils.toBN(1), "ether"))
        .send({ from: account });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartGame = async () => {
    try {
      await contract.methods
        .approve(web3.utils.toWei(web3.utils.toBN(1), "ether"))
        .send({ from: account });

      await contract.methods
        .startGame(web3.utils.toWei(web3.utils.toBN(1), "ether"))
        .send({ from: account });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBalance = async () => {
    try {
      const balance = await contract.methods
        .getBalanceIndividual()
        .call({ from: account });

      console.log(balance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleMint}>Mint</button>
      <button onClick={handleStartGame}>Start Game</button>
      <button onClick={handleBalance}>Balance</button>
    </>
  );
}

export default App;
