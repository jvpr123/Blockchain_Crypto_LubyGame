import { MetamaskContextProvider } from "./context/metamask-ctx";

import Header from "./components/header/Header";
import BodyCard from "./components/main-content/BodyCard";
import InstallMetamaskModal from "./components/warnings/InstallMetamaskModal";

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
