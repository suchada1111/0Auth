export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
};

const initialProducts: Product[] = [
  {
    id: "p001",
    name: "Mechanical Keyboard",
    price: 2590,
    description: "คีย์บอร์ด Mechanical สำหรับทำงานและเล่นเกม",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&auto=format&fit=crop&q=80",
    category: "Gaming",
  },
  {
    id: "p002",
    name: "Wireless Mouse",
    price: 1290,
    description: "เมาส์ไร้สาย น้ำหนักเบา",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    category: "Accessories",
  },
  {
    id: "p003",
    name: "USB-C Hub",
    price: 1890,
    description: "USB-C Hub พร้อม HDMI และ Card Reader",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    category: "Gadgets",
  },
];

declare global {
  // eslint-disable-next-line no-var
  var demoProducts: Product[] | undefined;
}

// รีเซ็ตแคชข้อมูลเพื่อให้ดึงค่า initialProducts ที่มีรูปใหม่
const products = structuredClone(initialProducts);

if (process.env.NODE_ENV !== "production") {
  globalThis.demoProducts = products;
}

export function getProducts() {
  return products;
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function updateProduct(
  id: string,
  values: Pick<Product, "name" | "price" | "description"> & { image?: string }
) {
  const product = getProduct(id);
  if (!product) {
    throw new Error("Product not found");
  }
  product.name = values.name;
  product.price = values.price;
  product.description = values.description;
  if (values.image !== undefined) {
    product.image = values.image;
  }
}

export function deleteProduct(id: string) {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    throw new Error("Product not found");
  }
  products.splice(index, 1);
}