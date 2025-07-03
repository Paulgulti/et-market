import ProductGrid from "@/components/Product/ProductGrid";
import { getAllProducts } from "@/sanity/live";
import heroImage from '@/public/Desktop-hero.jpg'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  const products = await getAllProducts()
  return (
    // <div className="container mx-auto px-2 my-8">
    //   <ProductGrid products={products}/>
    // </div>
    <div >
      <div className="bg-[url('/Mobile-hero.jpg')] md:bg-[url('/Desktop-hero.jpg')] h-screen bg-no-repeat bg-cover bg-center">
        <div className="px-2 md:px-8 flex flex-col gap-2 h-screen justify-center">
          <h2 className="text-violet-500 text-xl md:text-4xl font-semibold">Store at your convenience</h2>
          <p className="text-white text-sm md:text-lg max-w-[220px] md:max-w-[400px]">
            Welcome to the shop where great deals meet zero self-control. Browse, click, repeat — your cart's new best friend is here!          </p>
          <div>
            <Button asChild className="bg-violet-500 hover:cursor-pointer">
              <Link
                href="/shop"
              >Shop</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
