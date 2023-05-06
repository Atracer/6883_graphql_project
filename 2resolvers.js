const Web3 = require('web3');

// ...ERC721_ABI content...

const web3 = new Web3('https://mainnet.infura.io/v3/d48da051f5424635a1ad00ebbf9d2455'); // Replace with your Infura Project ID
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
  
async function fetchTransferEvents(contractAddress, tokenId) {
  try {
    const contract = new web3.eth.Contract(ERC721_ABI, contractAddress);
    const transferEvents = await contract.getPastEvents('Transfer', {
      filter: { tokenId: tokenId },
      fromBlock: 0,
      toBlock: 'latest',
    });

    return transferEvents.map((event) => ({
      id: event.id,
      from: event.returnValues.from,
      to: event.returnValues.to,
      transactionHash: event.transactionHash,
      timestamp: null, // You'll need to fetch the timestamp using the transaction hash
    }));
  } catch (error) {
    console.error('Error fetching transfer events:', error);
    return [];
  }
}


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
  NFT: {
    getSalesHistory: (parent) => fetchTransferEvents(parent.contractAddress, parent.id), // Reusing fetchTransferEvents function for sales history
    getTransactions: (parent) => fetchTransferEvents(parent.contractAddress, parent.id),
  },
};

module.exports = resolvers;
