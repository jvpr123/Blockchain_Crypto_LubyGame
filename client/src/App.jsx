import { useState, useEffect, useCallback, useMemo } from "react";
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

  const handleMint = async () =>
    await contract.methods.mintLbc(10).send({ from: account });

  const handleBalance = async () => {
    try {
      await contract.methods.startGame(1).send({ from: account });

      const bal = await contract.methods.getBalanceIndividual().call();

      console.log(bal);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleMint}>Mint</button>
      <button onClick={handleBalance}>Balance</button>
    </>
  );
}

export default App;
