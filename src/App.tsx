import {
  InjectedConnector,
  StarknetConfig,
  useConnectors,
} from '@starknet-react/core';
import { Container, MantineProvider } from '@mantine/core';
import { StarknetChainId } from 'starknet/src/constants';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SequencerProvider } from 'starknet';
import HomePage from './pages/HomePage';

import './App.css';
import PageLayout from './components/PageLayout';
import AdminPage from './pages/AdminPage';
import ResultPage from './pages/ResultPage';
import StandingPage from './pages/StandingPage';

function App() {
  /*const provider = new SequencerProvider({
    baseUrl: 'http://localhost:5050',
    feederGatewayUrl: 'http://localhost:5050',
    gatewayUrl: 'http://localhost:5050',
    chainId: StarknetChainId.TESTNET,
  });*/

  const provider = new SequencerProvider({
    baseUrl: 'https://goerli-2.voyager.online',
    feederGatewayUrl: 'https://alpha4-2.starknet.io/feeder_gateway/',
    gatewayUrl: 'https://alpha4-2.starknet.io/gateway/',
    chainId: StarknetChainId.TESTNET2,
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
              <Route path="/admin" element={<AdminPage />} />
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
