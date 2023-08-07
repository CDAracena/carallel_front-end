import { AxiosResponse } from "axios";

export interface PreviewPost {
  title: string;
  id: number;
}

export interface FullPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export type PreviewPostApiResponse = AxiosResponse<PreviewPost[]>;
export type FullPostApiResponse = AxiosResponse<FullPost>;
