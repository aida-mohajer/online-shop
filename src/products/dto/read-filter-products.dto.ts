export class ReadFilterProductsdto {
  response?: {
    id?: string;
    productName?: string;
    price?: number;
    rating?: number;
    description?: string;
    coverImage: {
      id?: string;
    } | null;
  }[];
  totalPages?: number;
  totalProducts?: number;
  message?: string;
  error?: string;
}
