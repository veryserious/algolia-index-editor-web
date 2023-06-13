export type Product = {
  objectID: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categories: string[];
  popularity: number;
};

export type EditableProductFields = {
  name: Product["name"];
  description: Product["description"];
  price: Product["price"];
  categories: Product["categories"];
  popularity: Product["popularity"];
};
