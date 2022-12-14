import {
  InjectedConnector,
  StarknetConfig,
  useConnectors,
} from '@starknet-react/core';
import { Container, MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SequencerProvider } from 'starknet';
import HomePage from './pages/HomePage';

import './App.css';
import PageLayout from './components/PageLayout';
import AdminPage from './pages/AdminPage';
import ResultPage from './pages/ResultPage';
import StandingPage from './pages/StandingPage';
import { getBaseURLFromEnv } from './tools/starknet';

function App() {
  /*const provider = new SequencerProvider({
    baseUrl: 'http://localhost:5050',
    feederGatewayUrl: 'http://localhost:5050',
    gatewayUrl: 'http://localhost:5050',
    chainId: StarknetChainId.TESTNET,
  });*/

  const provider = new SequencerProvider({
    network: import.meta.env.VITE_DAPP_ENV,
  });

  //const provider = new SequencerProvider({ network: 'goerli-alpha-2' });

  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' } }),
    new InjectedConnector({ options: { id: 'argentX' } }),
  ];

  return (
    <StarknetConfig connectors={connectors} defaultProvider={provider}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/standings" element={<StandingPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </StarknetConfig>
  );
}

export default App;

/*
defaultProvider={{
  baseUrl: 'http://localhost:5050',
  feederGatewayUrl: 'http://localhost:5050',
  gatewayUrl: 'http://localhost:5050',
  chainId: StarknetChainId.TESTNET,
}}
*/
