import React from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
import { columns } from "./columns";
import { Expense } from "../../interfaces/Expense";
import { Box, getPaginationItemUtilityClass, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

type ExpensesTableProps = {
  data: Expense[];
};

const ExpensesTable: React.FC<ExpensesTableProps> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <Box>
        <table>
        <thead>
            {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
        <Box>
            {table.getCanPreviousPage() && <IconButton
                onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
                disabled={!table.getCanPreviousPage()}
            >
                <ArrowBack />
            </IconButton>}
            <span>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            {table.getCanNextPage() && <IconButton
                onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
                disabled={!table.getCanNextPage()}
            >
                <ArrowForward />
            </IconButton>}
        </Box>
    </Box>
  );
};

export default ExpensesTable;
