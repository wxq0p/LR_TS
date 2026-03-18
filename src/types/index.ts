export interface Source {
  id: string;
  name: string;
}

export interface Article {
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: Source;
}

export interface NewsResponse {
  articles: Article[];
}

export interface SourcesResponse {
  sources: Source[];
}

export type ApiResponse = NewsResponse | SourcesResponse;

export interface LoaderOptions {
  apiKey: string | undefined;
  [key: string]: string | undefined;
}

export interface RequestOptions {
  sources?: string;
  [key: string]: string | undefined;
}

export interface GetRespOptions {
  endpoint: string;
  options?: RequestOptions;
}