import { createClient } from "next-sanity";
import { sanityFetch } from "./live";

export const client = createClient({
  projectId: "dqgmntrx",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

