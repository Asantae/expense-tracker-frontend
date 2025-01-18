export interface Expense {
    id: string;
    name: string;
    amount: number;
    categoryId: string;
    userId: string;
    frequency: 'daily' | 'weekly' | 'semi-monthly' | 'monthly';
    description?: string;
    createdAt: string;
    updatedAt: string;
}