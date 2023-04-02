export interface ProductEntity {
    id?: string;
    name: string;
    //weight: number;
    categoryName?: string;
    categoryId?: string;
    //symbol: string;
    isDeletable: number;
}

export interface NewProductEntity extends Omit<ProductEntity, 'id'> {
    id?: string;
    categoryId?: string;
}



