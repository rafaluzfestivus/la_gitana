export type Maybe<T> = T | null;

export type Connection<T> = {
    edges: Array<Edge<T>>;
};

export type Edge<T> = {
    node: T;
};

export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type Money = {
    amount: string;
    currencyCode: string;
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    price: Money;
    compareAtPrice: Maybe<Money>;
    selectedOptions: {
        name: string;
        value: string;
    }[];
};

export type Product = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: {
        id: string;
        name: string;
        values: string[];
    }[];
    priceRange: {
        maxVariantPrice: Money;
        minVariantPrice: Money;
    };
    variants: Connection<ProductVariant>;
    featuredImage: Maybe<Image>;
    images: Connection<Image>;
    seo: {
        title: Maybe<string>;
        description: Maybe<string>;
    };
    tags: string[];
    updatedAt: string;
};

export type Collection = {
    id: string;
    handle: string;
    title: string;
    description: string;
    seo: {
        title: Maybe<string>;
        description: Maybe<string>;
    };
    updatedAt: string;
    image: Maybe<Image>;
    products: Connection<Product>;
};

export type CartCost = {
    totalAmount: Money;
};

export type CartLine = {
    id: string;
    quantity: number;
    cost: CartCost;
    merchandise: {
        id: string;
        title: string;
        selectedOptions: {
            name: string;
            value: string;
        }[];
        product: {
            handle: string;
            title: string;
            featuredImage: Maybe<Image>;
        };
        price: Money;
    };
};

export type Cart = {
    id: string;
    checkoutUrl: string;
    cost: CartCost;
    lines: Connection<CartLine>;
    totalQuantity: number;
};
