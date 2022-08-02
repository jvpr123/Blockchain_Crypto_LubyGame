import { questions as MOCK_QUESTIONS } from "../questions/questions.json";
import { createContext, useReducer } from "react";

const gameInitialState = {
  isStarted: false,
  questions: [],
  totalQuestions: 0,
  currentQuestion: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
  gameBalance: 0,
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
      gameBalance: action.gameBalance,
    };
  }

  if (action.type === "REGISTER_WRONG_ANSWER") {
    return {
      ...latestState,
      currentQuestion: latestState.currentQuestion + 1,
      wrongAnswers: latestState.rightAnswers + 1,
      gameBalance: action.gameBalance,
    };
  }

  return gameInitialState;
};

const GameContext = createContext({
  ...gameInitialState,
  handleStartGame: () => {},
});

export const GameContextProvider = ({ children }) => {
  const [game, dispatchGame] = useReducer(gameReducer, gameInitialState);

  const handleStartGame = (balance) => {
    dispatchGame({
      type: "START_GAME",
      action: {
        questions: MOCK_QUESTIONS,
        balance,
      },
    });
  };

  return (
    <GameContext.Provider value={{ game, handleStartGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
