import { MetamaskContextProvider } from "./context/metamask-ctx";
import { GameContextProvider } from "./context/game-ctx";

import Header from "./components/header/Header";
import BodyCard from "./components/main-content/BodyCard";
import InstallMetamaskModal from "./components/warnings/InstallMetamaskModal";

function App() {
  return (
    <MetamaskContextProvider>
      <GameContextProvider>
        <Header />
        <BodyCard />
      </GameContextProvider>

      <InstallMetamaskModal />
    </MetamaskContextProvider>
  );
}

export default App;
