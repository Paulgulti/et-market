import { defineLive } from "next-sanity";
import { client } from "./client";
import { Product } from "@/sanity.types";

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
    throw new Error('SANITY_API_READ_TOKEN is not valid')
}

export const {sanityFetch, SanityLive} = defineLive({
    client: client,
    serverToken: token,
    browserToken: token,
})

export async function getAllProducts() {
    const query = `*[_type == 'product']`;
    const products = await sanityFetch({query})
    return products.data as Product[]
}

export const getProductPage = async (id: string) => {
  const query = `*[_type == 'product' && _id == $id][0]`
  const product = await sanityFetch({ query: query, params: {id} })
  return product.data as Product
}

