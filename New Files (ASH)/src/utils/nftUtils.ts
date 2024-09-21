import Moralis from 'moralis';

const settings = {
  chain: '0xa86a',
  format: 'decimal',
  normalizeMetadata: true,
  mediaItems: false,
};

Moralis.start({
  // Use the correct environment variable name
  apiKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQzNzQwMmI4LWEzNzktNDI4Ni04ZmU3LTI0N2JkMzVjNDYwNyIsIm9yZ0lkIjoiMzk5NjgyIiwidXNlcklkIjoiNDEwNjg5IiwidHlwZUlkIjoiNDc0ZmM4NzMtNWEzZS00NjkwLThmNjgtYWE1OTg5ZWNkZjZjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjA2NjI1ODcsImV4cCI6NDg3NjQyMjU4N30.0CaUt1J-TS9ltJmn_iHsSJEfEZfcdzobDohqOmXWh_c',
});

// Get NFT MetaData
export const getNFTMetaData = async (
  address: string,
  tokenId: string,
): Promise<any> =>
  Moralis.EvmApi.nft.getNFTMetadata({
    chain: '0xa86a',
    format: 'decimal',
    normalizeMetadata: true,
    mediaItems: false,
    address,
    tokenId,
  });

// Get Collection MetaData
export const getCollectionMetaData = async (address: string) =>
  Moralis.EvmApi.nft.getNFTContractMetadata({
    ...settings,
    address,
  });

// Get NFT Sale Prices
export const getNFTSalePrices = async (address: string, tokenId: string) =>
  Moralis.EvmApi.nft.getNFTSalePrices({
    address,
    tokenId,
  });

// Get NFTs on Specific Collection
export const getNftsOnCollection = async (address: string, tokenId: string) =>
  Moralis.EvmApi.nft.getNFTSalePrices({
    address,
    tokenId,
  });
