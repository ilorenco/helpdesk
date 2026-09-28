export type Service = {
    id: number;
    name: string;
    priceInCents: number;
    // Inactive services stay on existing tickets but can't be picked for new ones
    isActive: boolean;
};
