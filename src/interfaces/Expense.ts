import { Frequency } from "./FrequencyEnum";

export interface Expense {
    id?: number;
    amount: number | undefined;
    categoryId: string;
    categoryName?: string;
    frequency: Frequency | undefined;
    description?: string;
}