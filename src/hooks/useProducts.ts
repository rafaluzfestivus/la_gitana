import { getProducts, getCollectionProducts, Product } from "@/lib/mockData";
import { useState, useEffect } from "react";

export function useProducts(collectionHandle?: string) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                let data: Product[];
                if (collectionHandle) {
                    data = await getCollectionProducts(collectionHandle);
                } else {
                    data = await getProducts();
                }
                console.log(`useProducts fetched (handle: ${collectionHandle || "all"}):`, data);
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [collectionHandle]);

    return { products, loading };
}
