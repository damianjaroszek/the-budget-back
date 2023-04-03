export interface CategoryEntity {
    id?: string;
    name: string;
    isDeletable: number;
}

export interface NewCategoryEntity extends Omit<CategoryEntity, 'id'> {
    id?: string;
}



