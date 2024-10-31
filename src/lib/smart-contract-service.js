import { openContractCall } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';

class SmartContractService {
  constructor() {
    this.STACKS_ADDRESS = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    this.CONTRACT_NAME = "review";
    this.network = new StacksMainnet();
  }

  async addReview(placeId, rating, comment, userAddress) {
    const functionName = 'add-review';
    
    const options = {
      network: this.network,
      anchorMode: 1,
      contractAddress: this.STACKS_ADDRESS,
      contractName: this.CONTRACT_NAME,
      functionName,
      functionArgs: [placeId, rating, comment, userAddress],
      onFinish: (data) => {
        console.log('Transaction finished:', data);
      },
      onCancel: () => {
        console.log('Transaction cancelled');
      }
    };

    try {
      await openContractCall(options);
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }

  async getReviews(placeId) {
    const functionName = 'get-reviews';
    
    const options = {
      network: this.network,
      contractAddress: this.STACKS_ADDRESS,
      contractName: this.CONTRACT_NAME,
      functionName,
      functionArgs: [placeId]
    };

    try {
      const response = await this.network.callReadOnlyFunction(options);
      return this.parseReviewsResponse(response);
    } catch (error) {
      console.error('Error getting reviews:', error);
      return [];
    }
  }

  parseReviewsResponse(response) {
    try {
      return response.value.map(review => ({
        id: review.value.id,
        placeId: review.value.placeId,
        rating: review.value.rating / 10,
        comment: review.value.comment,
        userAddress: review.value.userAddress,
        verified: review.value.verified,
        timestamp: review.value.timestamp
      }));
    } catch (error) {
      console.error('Error parsing reviews:', error);
      return [];
    }
  }
}

export const smartContractService = new SmartContractService(); 