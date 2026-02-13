export interface TemplateCard {
  id: string;
  title: string;
  author: {
    address: string;
    reputation: number;
    avatar: string;
  };
  price: string;
  image: string;
  verified: boolean;
  tags: string[];
}

export interface FilterCategory {
  name: string;
  icon: string;
  options: string[];
}
