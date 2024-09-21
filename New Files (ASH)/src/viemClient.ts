import { createPublicClient, http } from 'viem';
import { hardhat, fantomTestnet } from 'viem/chains';

export const publicClient = createPublicClient({
  // chain: hardhat,
  chain: fantomTestnet,
  transport: http(),
});
