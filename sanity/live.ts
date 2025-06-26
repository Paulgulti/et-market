import { defineLive } from "next-sanity";
import { client } from "./client";
import { Order, Product, ProductCategory } from "@/sanity.types";

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

export async function getProductCategory() {
    const query = `*[_type == 'productCategory']`;
    const categories = await sanityFetch({query})
    return categories.data as ProductCategory[]
}

export async function getProductsByCategorySlug(slug: string) {
    const query = `*[_type == 'product' && references(*[_type == 'productCategory' && slug.current == $slug][0]._id)]`
    const products = await sanityFetch({ query: query, params: { slug } })
    return products.data as Product[];
}

export async function getCategorySlug(slug: string) {
    const query = `*[_type == 'productCategory' && slug.current == $slug][0]`
    const productCategory = await sanityFetch({ query: query, params: { slug } })
    return productCategory.data as ProductCategory;
}

export async function searchProduct(searchQuery: string) {
    const query = `*[_type == 'product' && (
        title match '*' + $searchQuery + '*' ||
        description match '*' + $searchQuery + '*' ||
        category->title match '*' + $searchQuery + '*' ||
        category->slug.current match '*' + $searchQuery + '*'
    )]`

    const products = await sanityFetch({ query: query, params: { searchQuery } })
    return products.data as Product[];
}

export const getMyOrders = async (userId: string) => {
    if (!userId) {
        throw new Error('UserId is required');
    }
    const ordersQuery = `*[_type == 'order' && 
        clerkUserId == $userId] | order(orderDate desc){
            ...,products[]{
                ...,product->
            }
        }`

    try {
        const orders = await sanityFetch({ query: ordersQuery, params: { userId } });
        return orders.data as Order[] || [];
    } catch (error) {
        console.error('Error fetching orders', error);
        return [];
    }
}
