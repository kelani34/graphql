export type Product = {
  id: number;
  description: string;
  total: number;
};

export type Customer = {
  id: number;
  name: string;
  industry: string;
  products: Product[];
};

export type ProductProps ={
  customerId: number;
}