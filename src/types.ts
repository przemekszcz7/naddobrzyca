export interface GalleryImage {
  url: string;
  title: string;
  category: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface Equipment {
  id: number;
  name: string;
  price: string;
  iconName: string;
  description: string;
}
