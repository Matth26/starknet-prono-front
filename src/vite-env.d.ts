/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SC_ADDRESS: string;
  readonly VITE_DAPP_ENV: DappEnvType;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
