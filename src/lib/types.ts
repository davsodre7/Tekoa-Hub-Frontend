export type Category = {
  id: number;
  name: string;
  description?: string;
  color?: string;
  createdAt: string;
  contents?: Content[];
};

export type Content = {
  id: number;
  title: string;
  type: string;
  description: string;
  imageUrl?: string;
  creator?: string;
  ethnicity?: string;
  region?: string;
  category?: Category;
  createdAt: string;
  likesCount?: number;
  isLikedByUser?: boolean;
};

export interface UserDTO {
  id: number;
  name: string;
  email: string;
}

export interface UserRegisterDTO {
  name: string;
  email: string;
  password: string;
  profileType?: 'indigenous' | 'educator' | 'general';
}