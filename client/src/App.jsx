import { MetamaskContextProvider } from "./context/metamask-ctx";

import Header from "./components/header/Header";
import InstallMetamaskModal from "./components/modal/InstallMetamaskModal";

// import LubyGameContract from "./contracts/LubyGame.json";

function App() {
  return (
    <MetamaskContextProvider>
      <Header />
      <InstallMetamaskModal />
    </MetamaskContextProvider>
  );
}

export default App;
