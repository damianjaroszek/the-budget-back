export interface RecipeEntity {
    id?: string;
    date: string;
    price: number;
    name: string;
    //weight: number;
    shopName: string;
    categoryName: string;
    //symbol: string;
}

export interface NewRecipe {
    id?: string;
    date: Date | null;
    price: number;
    productId: string;
    shopId: string;
}
