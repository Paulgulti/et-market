import ProductGrid from "@/components/Product/ProductGrid";
import { getAllProducts } from "@/sanity/live";

export default async function Home() {

  const products = await getAllProducts()
  return (
    <div className="container mx-auto my-8">
      <ProductGrid products={products}/>
    </div>
  );
}
