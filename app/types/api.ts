// types/api.ts

export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};