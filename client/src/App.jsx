import { MetamaskContextProvider } from "./context/metamask-ctx";

import Header from "./components/header/Header";
import InstallMetamaskModal from "./components/modal/InstallMetamaskModal";

function App() {
  return (
    <MetamaskContextProvider>
      <Header />
      <InstallMetamaskModal />
    </MetamaskContextProvider>
  );
}

export default App;
