import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { argentWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from 'wagmi';
import { fantomTestnet, hardhat, avalanche } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!alchemyApiKey || !walletConnectProjectId) {
  throw new Error('Some ENV variables are not defined');
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [fantomTestnet, hardhat, avalanche],
  [alchemyProvider({ apiKey: alchemyApiKey }), publicProvider()],
);

const { wallets } = getDefaultWallets({
  appName: 'xFoundation',
  projectId: walletConnectProjectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId: walletConnectProjectId, chains }),
      ledgerWallet({ projectId: walletConnectProjectId, chains }),
    ],
  },
]);

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };