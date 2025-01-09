import React, { useEffect, useState } from 'react';
import { fetchCategories } from './services/api';

interface Category {
    id: number;
    name: string;
}

const App: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                setError('Failed to load categories.');
            }
        };
        loadCategories();
    }, []);


    return (
        <div>
            <h1>Expense Tracker</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
