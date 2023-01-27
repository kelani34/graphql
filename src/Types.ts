export type Product = {
  id: number;
  description: string;
  total: number;
};

export type Customer = {
  id: string;
  name: string;
  industry: string;
  products: Product[];
};
