import { MetamaskContextProvider } from "./context/metamask-ctx";

import Header from "./components/header/Header";
import BodyCard from "./components/cards/BodyCard";
import InstallMetamaskModal from "./components/modal/InstallMetamaskModal";

function App() {
  return (
    <MetamaskContextProvider>
      <Header />
      <BodyCard />

      <InstallMetamaskModal />
    </MetamaskContextProvider>
  );
}

export default App;
