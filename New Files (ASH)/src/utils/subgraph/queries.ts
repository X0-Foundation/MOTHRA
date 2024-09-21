import { gql } from '@apollo/client';

export const CollectionCreateds = gql`
  query CollectionCreateds($first: Int!, $skip: Int!) {
    collectionCreateds(first: $first, skip: $skip) {
      id
      name
      collection_address
      uri
    }
  }
`;

// Get Collection Info with Specific ID
export const CollectionCreated = gql`
  query CollectionCreated($id: ID!) {
    collectionCreated(id: $id) {
      collection_address
      name
      owner
      uri
      id
    }
  }
`;

export const ItemListeds = gql`
  query ItemListeds($first: Int!, $skip: Int!) {
    itemListeds(first: $first, skip: $skip) {
      id
      collection
      price
      token_id
      collection
    }
  }
`;

export const ItemListed = gql`
  query ItemListed($id: ID!) {
    entity(id: $id) {
      id
      owner
      price
      token_id
    }
  }
`;

// Get Nfts Listed on Specifict Colelction ID
export const ItemListedsOnCollection = gql`
  query ItemListeds($collection: String!, $first: Int!, $skip: Int!) {
    itemListeds(collection: $collection, first: $first, skip: $skip) {
      id
      collection
      price
      token_id
    }
  }
`;
