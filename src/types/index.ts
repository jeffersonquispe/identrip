export interface Review {
  id: number;
  placeId: number;
  rating: number;
  comment: string;
  userAddress: string;
  verified: boolean;
  timestamp: number;
}

export interface Place {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: Review[];
  category: string;
  description: string;
  address: string;
}

export interface User {
  address: string;
  name: string;
  avatar: string;
} 