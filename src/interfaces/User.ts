import { Category } from '../interfaces/Category';
import { Expense } from './Expense';

export interface User {
    id: string;
    username: string;
    email: string;
    expenses: Expense[];
    categories: Category[];
}