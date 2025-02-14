import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Expense } from "../../interfaces/Expense";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  TableContainer,
  Paper,
  Tooltip,
} from "@mui/material";
import { ArrowBack, ArrowForward, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useModal } from "../../modals/useModal";
import CustomModal from "../../modals/CustomModal";
import EditExpenseForm from "../../forms/EditExpenseForm";
import { Delete } from '@mui/icons-material';
import DeleteExpenseForm from "../../forms/DeleteExpenseForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { hasApiActivity } from "../../utils/hasApiActivityUtil";

type ExpensesTableProps = {
  data: Expense[];
  numSelected?: number;
};

const ROWS_PER_PAGE = 5;
const pageSizeOptions = [5, 10, 25, 50, 100];
const rowSize = 50;

const ExpensesTable: React.FC<ExpensesTableProps> = ({ data }) => {
  const { openModalName, openModal, closeModal } = useModal();
  const [selectedExpenseId, setSelectedExpenseId] = useState('');
  const [pageSize, setPageSize] = useState<number>(5);
  const [rowSelection, setRowSelection] = useState({});
  const [checkedRows, setCheckedRows] = useState<string[]>()

  const deletingExpenses = useSelector((state: RootState) => 
    hasApiActivity(state, 'user/deleteExpenseInList/pending')
  );

  const deletedExpenseSuccess = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/deleteExpenseInList/fulfilled')
  );

  console.log("test", deletingExpenses);
  
  const isLoading = deletingExpenses;

  const handleRowClick = (expenseId: string) => {
    setSelectedExpenseId(expenseId);
    openModal("edit");
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
  }

  const table = useReactTable({
    data,
    columns,
    state: { 
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: pageSize } },
  });

  const currentRows = table.getRowModel().rows;
  const allRows = table.getPrePaginationRowModel().rows;
  const numEmptyRows = ROWS_PER_PAGE - currentRows.length;
  const isAnyRowChecked = Object.keys(rowSelection).length > 0;

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  useEffect(() => {
    if (deletingExpenses) {
      setRowSelection({});
    }
  }, [deletingExpenses]);
  
  useEffect(() => {
    const selectedRowIds = Object.keys(rowSelection)
      .map((rowId) => {
        const selectedRow = allRows.find((row) => row.id === rowId);
        return selectedRow?.original.id;
      })
      .filter(Boolean);
  
    setCheckedRows(selectedRowIds as string[]);
  }, [rowSelection, currentRows]);

  return (
    <TableContainer component={Paper}>
      {isAnyRowChecked && (
        <Tooltip title="Delete expense(s)">
          <IconButton loading={isLoading} disabled={isLoading} onClick={() => openModal("delete")}>
            <Delete sx={{ margin: 2, cursor: 'pointer' }}/>
          </IconButton>    
        </Tooltip>)}
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 600, tableLayout: 'fixed' }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} sx={{ fontWeight: 'bold' }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} sx={{ cursor: "pointer", maxHeight: rowSize }}  >
                {row.getVisibleCells().map((cell) => (          
                  <TableCell key={cell.id} onClick={() => { handleRowClick(row.original.id ?? ''); }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {Array.from({ length: numEmptyRows }).map((_, index) => (
              <TableRow sx={{ height: rowSize }}key={`empty-${index}`}>
                {table.getHeaderGroups()[0].headers.map((header, i) => (
                  <TableCell key={`empty-cell-${i}`} />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mx: 1,
          pt: 1,
          pb: 1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap='wrap'
        >
          <Typography sx={{ mr: 2, alignItems: 'flex-start' }}>
            Rows per page:
          </Typography>
          <Select
            displayEmpty
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            size="small"
          >
            {pageSizeOptions.map((size) => (
              <MenuItem
                key={size}
                value={size.toString()}
              >
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <IconButton
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 1)
            }
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </IconButton>

          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <IconButton
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 1)
            }
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
        <CustomModal open={openModalName === "edit"} onClose={closeModal} title="Edit Expense">
          {selectedExpenseId && (
              <EditExpenseForm expenseId={selectedExpenseId} onSubmit={closeModal} onClose={closeModal} />
          )}
        </CustomModal>
        <CustomModal open={openModalName === "delete"} onClose={closeModal} title="Are you sure?">
          {checkedRows && (
            <DeleteExpenseForm expenses={checkedRows} onSubmit={closeModal} onClose={closeModal} />
          )}
        </CustomModal>
    </TableContainer>
  );
};

export default ExpensesTable;