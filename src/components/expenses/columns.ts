import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../../interfaces/Expense";
import { getFrequencyDisplayValue } from "../../utils/enumUtil";
import TableDescription from "./TableDescription";
import ExpenseTableCheckbox from "./ExpenseTableCheckbox";

export const columns: ColumnDef<Expense>[] = [
    {
        id: "select",
        header: ({ table }) =>
            ExpenseTableCheckbox({
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
            }),
        cell: ({ row }) =>
            ExpenseTableCheckbox({
                checked: row.getIsSelected(),
                onChange: row.getToggleSelectedHandler(),
                // rowId: [row.original.id ?? '']
            }),
        enableSorting: false,
        enableColumnFilter: false,
    },
    // {
    //     id: 'displayId',
    //     header: 'ID',
    //     cell: ({ row }) => `${row.index + 1}.`,
    // },
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
        cell: ({ getValue }) => {
            const text = getValue<string>();
            return TableDescription({text});
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
    },
];