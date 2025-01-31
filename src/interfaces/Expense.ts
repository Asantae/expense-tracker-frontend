import { Frequency } from "./FrequencyEnum";

export interface Expense {
    id?: number;
    amount: number;
    categoryId: string;
    categoryName: string;
    frequency: Frequency;
    description?: string;
}