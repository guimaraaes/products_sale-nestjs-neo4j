export type Product = {
  name: string;
  cotation: number;
  image: string;
}
export type Sale = {
    total_sale: number;
    type_payment: number;
    quantity_parcels: number;
}

export type Client= {
  name: String;
  raking: number;
}

export type Query = {
  getProduct: [Product],
  product(id: Number): Product,
  getSale: [Sale],
  sale(id: Number): Sale,
}
