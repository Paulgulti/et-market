import ProductGrid from "@/components/Product/ProductGrid";
import { getAllProducts } from "@/sanity/live";

export default async function Home() {

  const products = await getAllProducts()
  return (
    <div className="container mx-auto px-2 mb-4 ">
      <div className='container mx-auto bg-orange-500 opacity-50 py-4 my-2'>
        <p className='text-center text-2xl md:text-3xl font-bold'>
          UP TO 90% OFF! <span className='animate-pulse'>🔥</span>
        </p>
        <p className='text-center text-sidebar-primary-foreground animate-pulse'>
          Flash Sale Ending Soon ⏰ Limited Time Offer
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
