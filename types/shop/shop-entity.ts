export interface ShopEntity {
    id?: string;
    name: string;
    isDeletable?: number;
}

export interface NewShopEntity extends Omit<ShopEntity, 'id'> {
    id?: string;
}
