// const { ApolloServer, gql } = require('apollo-server');
// const OpenSea = require('opensea-js');
// const openSeaApiUrl = 'https://api.opensea.io/graphql/';
// // Initialize the OpenSea SDK
// const openSea = new OpenSea(openSeaApiUrl);
// // Define the GraphQL schema
// const typeDefs = gql`
// type Asset {
// tokenId: ID!
// name: String!
// description: String
// imageUrl: String
// owner: User
// collection: Collection
// traits: [Trait!]!
// }
// type User {
// address: ID!
// assets: [Asset!]!
// }
// type Collection {
// slug: String!
// name: String!
// description: String
// imageUrl: String
// assets: [Asset!]!
// }
// type Trait {
// traitType: String!
// value: String!
// }
// type Query {
// assetById(tokenId: ID!): Asset
// assetsByOwner(ownerAddress: ID!): [Asset!]!
// collectionBySlug(slug: String!): Collection
// }
// `;

//------------------example
// const { OpenSeaPort, Network } = require("opensea-js");
// const { providerUtils } = require("@0x/utils");
// const Web3 = require("web3");

// const providerUrl = "https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY"; // Replace 'YOUR_INFURA_API_KEY' with your actual Infura API key
// const provider = providerUtils.standardizeOrThrow(new Web3.providers.HttpProvider(providerUrl));
// const seaport = new OpenSeaPort(provider, {
//   networkName: Network.Main,
// });

// const resolvers = {
//   Query: {
//     getNFT: async (_, { contractAddress, tokenId }) => {
//       try {
//         const asset = await seaport.api.getAsset({
//           tokenAddress: contractAddress,
//           tokenId: tokenId,
//         });

//         return {
//           id: asset.token_id,
//           name: asset.name,
//           description: asset.description,
//           imageUrl: asset.image_url,
//           metadataUrl: asset.external_link,
//           owner: asset.owner.address,
//           creator: asset.creator.address,
//           mintedAt: asset.asset_contract.created_date,
//         };
//       } catch (error) {
//         throw new Error(`Error fetching NFT data from OpenSea: ${error.message}`);
//       }
//     },
//     // ...other resolvers
//   },
// };

// module.exports = resolvers;




// const axios = require('axios');

// const NFTPortApiKey = 'c9dba90e-6ac3-4216-b14d-917e6c684424'; // Replace with your NFTPort API key

// const resolvers = {
//   Query: {
//     getNFT: async (_, { contractAddress, tokenId }) => {
//       try {
//         const response = await axios.get(`https://api.nftport.xyz/get_nft/${contractAddress}/${tokenId}`, {
//           headers: {
//             'Authorization': `Bearer ${NFTPortApiKey}`,
//           },
//         });

//         const data = response.data;

//         return {
//           id: data.token_id,
//           name: data.name,
//           description: data.description,
//           image: data.image,
//           owner: data.owner,
//           contractAddress: data.contract_address,
//           metadata: data.metadata,
//         };
//       } catch (error) {
//         throw new Error(`Error fetching NFT data from NFTPort: ${error.message}`);
//       }
//     },
//   },
// };

// module.exports = resolvers;




// const Web3 = require('web3');

// const ERC721_ABI = [
//   // ERC721 Metadata interface
//   {
//     constant: true,
//     inputs: [{ name: 'tokenId', type: 'uint256' }],
//     name: 'tokenURI',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   // ERC721 interface
//   {
//     constant: true,
//     inputs: [{ name: 'tokenId', type: 'uint256' }],
//     name: 'ownerOf',
//     outputs: [{ name: '', type: 'address' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];

// const web3 = new Web3('https://mainnet.infura.io/v3/d48da051f5424635a1ad00ebbf9d2455'); // Replace with your Infura Project ID

// const resolvers = {
//   Query: {
//     getNFT: async (_, { contractAddress, tokenId }) => {
//       try {
//         const contract = new web3.eth.Contract(ERC721_ABI, contractAddress);
//         const tokenURI = await contract.methods.tokenURI(tokenId).call();
//         const owner = await contract.methods.ownerOf(tokenId).call();

//         // If the tokenURI is a valid JSON metadata, you can fetch the metadata and use it in the response
//         // Otherwise, you can return only the tokenURI, owner, and other basic information

//         return {
//           id: tokenId,
//           contractAddress: contractAddress,
//           owner: owner,
//           metadata: tokenURI,
//         };
//       } catch (error) {
//         throw new Error(`Error fetching NFT data from the smart contract: ${error.message}`);
//       }
//     },
//   },
// };

// module.exports = resolvers;

// const Web3 = require('web3');

// const ERC721_ABI = [
//   // ERC721 Metadata interface
//   {
//     constant: true,
//     inputs: [{ name: 'tokenId', type: 'uint256' }],
//     name: 'tokenURI',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   // ERC721 interface
//   {
//     constant: true,
//     inputs: [{ name: 'tokenId', type: 'uint256' }],
//     name: 'ownerOf',
//     outputs: [{ name: '', type: 'address' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   // ERC721 Metadata extension
//   {
//     constant: true,
//     inputs: [],
//     name: 'name',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: 'symbol',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: true,
//     inputs: [{ name: 'tokenId', type: 'uint256' }],
//     name: 'tokenMetadata',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];

// const web3 = new Web3('https://mainnet.infura.io/v3/d48da051f5424635a1ad00ebbf9d2455'); // Replace with your Infura Project ID

// const resolvers = {
//   Query: {
//     getNFT: async (_, { contractAddress, tokenId }) => {
//       try {
//         const contract = new web3.eth.Contract(ERC721_ABI, contractAddress);
//         const tokenURI = await contract.methods.tokenURI(tokenId).call();
//         const owner = await contract.methods.ownerOf(tokenId).call();
//         const name = await contract.methods.name().call();

//         // If the tokenURI is a valid JSON metadata, you can fetch the metadata and use it in the response
//         // Otherwise, you can return only the tokenURI, owner, and other basic information

//         return {
//           id: tokenId,
//           name: name,
//           contractAddress: contractAddress,
//           owner: owner,
//           metadata: tokenURI,
//         };
//       } catch (error) {
//         throw new Error(`Error fetching NFT data from the smart contract: ${error.message}`);
//       }
//     },
//   },
// };

// module.exports = resolvers;



// const Web3 = require('web3');

// const ERC721_ABI = [
//   // ERC721 Metadata interface
//   {
//     constant: true,
//     inputs: [{ name: 'tokenId', type: 'uint256' }],
//     name: 'tokenURI',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   // ERC721 interface
//   {
//     constant: true,
//     inputs: [{ name: 'tokenId', type: 'uint256' }],
//     name: 'ownerOf',
//     outputs: [{ name: '', type: 'address' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   // ERC721 Name interface
//   {
//     constant: true,
//     inputs: [],
//     name: 'name',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];

// const web3 = new Web3('https://mainnet.infura.io/v3/d48da051f5424635a1ad00ebbf9d2455'); // Replace with your Infura Project ID

// const resolvers = {
//   Query: {
//     getNFT: async (_, { contractAddress, tokenId }) => {
//       try {
//         const contract = new web3.eth.Contract(ERC721_ABI, contractAddress);
//         let tokenURI;
//         let owner;
//         let name;

//         try {
//           tokenURI = await contract.methods.tokenURI(tokenId).call();
//         } catch (error) {
//           console.error('Error fetching tokenURI:', error);
//         }

//         try {
//           owner = await contract.methods.ownerOf(tokenId).call();
//         } catch (error) {
//           console.error('Error fetching owner:', error);
//         }

//         try {
//           name = await contract.methods.name().call();
//         } catch (error) {
//           console.error('Error fetching name:', error);
//         }

//         return {
//           id: tokenId,
//           name: name,
//           contractAddress: contractAddress,
//           owner: owner,
//           metadata: tokenURI,
//         };
//       } catch (error) {
//         throw new Error(`Error fetching NFT data from the smart contract: ${error.message}`);
//       }
//     },
//   },
// };

// module.exports = resolvers;




const Web3 = require('web3');

const ERC721_ABI = [
  // ERC721 Metadata interface
  {
    constant: true,
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  // ERC721 interface
  {
    constant: true,
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  // ERC721 Name interface
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const web3 = new Web3('https://mainnet.infura.io/v3/d48da051f5424635a1ad00ebbf9d2455'); // Replace with your Infura Project ID

const resolvers = {
  Query: {
    getNFT: async (_, { contractAddress, tokenId }) => {
      try {
        const contract = new web3.eth.Contract(ERC721_ABI, contractAddress);
        let tokenURI;
        let owner;
        let name;

        try {
          tokenURI = await contract.methods.tokenURI(tokenId).call();
        } catch (error) {
          console.error('Error fetching tokenURI:', error);
        }

        try {
          owner = await contract.methods.ownerOf(tokenId).call();
        } catch (error) {
          console.error('Error fetching owner:', error);
        }

        try {
          name = await contract.methods.name().call();
        } catch (error) {
          console.error('Error fetching name:', error);
        }

        return {
          id: tokenId,
          name: name,
          contractAddress: contractAddress,
          owner: owner,
          metadata: tokenURI,
        };
      } catch (error) {
        throw new Error(`Error fetching NFT data from the smart contract: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;



