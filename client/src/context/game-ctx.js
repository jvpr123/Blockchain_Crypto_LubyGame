import { createContext, useReducer, useContext, useCallback } from "react";

import { questions as MOCK_QUESTIONS } from "../questions/questions.json";
import MetamaskContext from "./metamask-ctx";

const gameInitialState = {
  isStarted: false,
  questions: MOCK_QUESTIONS,
  totalQuestions: 0,
  currentQuestion: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
  gameBalance: 0,
  gameBet: 0,
  handleStartGame: async () => {},
  handleBuyCoins: async () => {},
  handleUpdateGameBalance: async () => {},
  handleClaimBalance: async () => {},
  handleVerifyAnswer: () => {},
};

const gameReducer = (latestState, action) => {
  if (action.type === "START_GAME") {
    return {
      ...latestState,
      isStarted: true,
      questions: action.questions,
      totalQuestions: action.questions.length,
      currentQuestion: 0,
      gameBalance: action.balance,
    };
  }

  if (action.type === "REGISTER_RIGHT_ANSWER") {
    return {
      ...latestState,
      currentQuestion: latestState.currentQuestion + 1,
      rightAnswers: latestState.rightAnswers + 1,
      gameBalance: action.balance,
    };
  }

  if (action.type === "REGISTER_WRONG_ANSWER") {
    return {
      ...latestState,
      currentQuestion: latestState.currentQuestion + 1,
      wrongAnswers: latestState.rightAnswers + 1,
      gameBalance: action.balance,
    };
  }

  if (action.type === "UPDATE_GAME_BALANCE") {
    return {
      ...latestState,
      gameBalance: action.balance,
      gameBet: action.bet,
    };
  }

  return gameInitialState;
};

const GameContext = createContext({
  ...gameInitialState,
  handleStartGame: async () => {},
  handleUpdateGameBalance: async () => {},
});

export const GameContextProvider = ({ children }) => {
  const { web3, account, network, contract } = useContext(MetamaskContext);

  const [game, dispatchGame] = useReducer(gameReducer, gameInitialState);

  // Utils functions and properties
  const toBN = (value) => web3.utils.toBN(value);
  const toWei = (valueBN, unit) => web3.utils.toWei(valueBN, unit);
  const credentials = { from: account.address };
  const betValue = toWei(toBN(4));

  // Calls startGame contract function to bet 4 LBC an start playing
  const handleStartGame = async () => {
    console.log("Start game");
    // await contract.methods.startGame(betValue).send(credentials);
    // await handleUpdateGameBalance();

    dispatchGame({
      type: "START_GAME",
      questions: MOCK_QUESTIONS,
    });
  };

  const handleVerifyAnswer = (option) => {
    console.log(game.currentQuestion);
    dispatchGame({ type: "REGISTER_RIGHT_ANSWER" });
    console.log(game.currentQuestion);
  };

  // Calls mintLbc() and approve() contract functions simulating a token sale
  const handleBuyCoins = async () => {
    await contract.methods.mintLbc(betValue).send(credentials);
    await contract.methods.approve(betValue).send(credentials);
    await handleUpdateGameBalance();
  };

  // Updates current addres tokens amount in wallet and gambled in game
  const handleUpdateGameBalance = useCallback(async () => {
    if (contract["_address"] && contract.methods) {
      const bet = await contract.methods
        .getBalanceIndividual()
        .call(credentials);
      const balance = await contract.methods
        .balanceOf(account.address)
        .call(credentials);

      dispatchGame({ type: "UPDATE_GAME_BALANCE", balance, bet });
    }
  }, [network.network, account.address, credentials]);

  // Calls claimBalance() contract function to transfer amount gambled to wallet
  const handleClaimBalance = async () => {
    await contract.methods.claimBalance(account.address).send(credentials);
    await handleUpdateGameBalance();
  };

  return (
    <GameContext.Provider
      value={{
        game,
        handleStartGame,
        handleBuyCoins,
        handleUpdateGameBalance,
        handleClaimBalance,
        handleVerifyAnswer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
