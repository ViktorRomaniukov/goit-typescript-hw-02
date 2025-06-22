export interface ImageUrls {
    small: string;
  }
  
  export interface Image {
    id: string;
    urls: ImageUrls;
    alt_description: string | null;
}
  
export interface UnsplashImage {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
    [key: string]: string;
  };
  user: {
    name: string;
  };
  likes: number;
  description?: string | null;
}