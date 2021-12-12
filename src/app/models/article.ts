export interface Article {
  id: number;
  key: string;
  excerpt: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
}
