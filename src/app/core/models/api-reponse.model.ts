export interface ApiResponse<T = any> {
  Search?: T;
  Response: 'True' | 'False';
  totalResults?: string;
  Error?: string
}
