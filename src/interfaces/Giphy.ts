export interface Giphy {
  embed_url: string;
  id: string;
  title: string;
  images: {
    downsized: {
      url: string;
    };
  };
}
