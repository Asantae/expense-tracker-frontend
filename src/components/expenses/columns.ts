import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../../interfaces/Expense";
import { getFrequencyDisplayValue } from "../../utils/enumUtil";

export const columns: ColumnDef<Expense>[] = [
    {
        id: 'displayId',
        header: 'ID',
        cell: ({ row }) => `${row.index + 1}.`,
    },
    {
        accessorKey: "frequency",
        header: "Frequency",
        cell: ({ getValue }) => {
            const value = getValue<string>();
            return getFrequencyDisplayValue(value)
        }
    },
    {
        accessorKey: "categoryName",
        header: "Category",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
    },
];

