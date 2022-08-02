import { createContext, useReducer, useContext, useCallback } from "react";

import { questions as MOCK_QUESTIONS } from "../questions/questions.json";
import MetamaskContext from "./metamask-ctx";

const gameInitialState = {
  isStarted: false,
  questions: [],
  totalQuestions: 0,
  currentQuestion: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
  gameBalance: 0,
  handleStartGame: async () => {},
  handleUpdateGameBalance: async () => {},
};

const gameReducer = (latestState, action) => {
  if (action.type === "START_GAME") {
    return {
      ...latestState,
      questions: action.questions,
      totalQuestions: action.questions.length,
      currentQuestion: 1,
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
  const { contract } = useContext(MetamaskContext);
  const [game, dispatchGame] = useReducer(gameReducer, gameInitialState);

  const handleStartGame = (balance) => {
    console.log("Start game");
    console.log(contract);
    dispatchGame({
      type: "START_GAME",
      questions: MOCK_QUESTIONS,
      balance,
    });
  };

  const handleUpdateGameBalance = async () => {
    if (contract.methods) {
      const balance = await contract.methods.getBalanceIndividual().call();
      console.log(balance);
      dispatchGame({ type: "UPDATE_GAME_BALANCE", balance });
    }
  };

  return (
    <GameContext.Provider
      value={{ game, handleStartGame, handleUpdateGameBalance }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
