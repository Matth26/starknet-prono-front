import { StarknetProvider } from '@starknet-react/core';
import { MantineProvider } from '@mantine/core';
import { getInstalledInjectedConnectors } from '@starknet-react/core';
import { connect } from '@argent/get-starknet';

import YourApp from './components/YourApp';
import './App.css';

function App() {
  const connectors = getInstalledInjectedConnectors();

  return (
    <StarknetProvider connectors={connectors}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <YourApp />
      </MantineProvider>
    </StarknetProvider>
  );
}

export default App;
