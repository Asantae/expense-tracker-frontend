import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { hasApiActivity } from "../utils/hasApiActivityUtil";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { deleteExpensesAction } from "../actions/deleteExpensesAction";

interface DeleteExpenseFormProps {
    expenses: string[];
    onSubmit: () => void;
    onClose: () => void; 
}

const DeleteExpenseForm: React.FC<DeleteExpenseFormProps> = ({ expenses, onClose }) => {
    const dispatch: AppDispatch = useDispatch();

    const isDeletingExpense = useSelector((state: RootState) =>
        hasApiActivity(state, 'user/deleteExpenseInList/pending')
    );

    const isLoading = isDeletingExpense;
    const hasMultipleSelected = expenses.length > 1;

    const handleDeleteExpenses = async (expenses: string[]) => {
        const result = await dispatch(deleteExpensesAction(expenses));

        if (result) {
          onClose();
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography textAlign="center" sx={{ mb: 2 }}>
                You have selected <Typography component="span" color={hasMultipleSelected ? "red":""}>{hasMultipleSelected ? expenses.length : "an"}</Typography> expenses to delete. 
                    <br/>
                Do you wish to proceed?
                    <br/>
                <Typography component="span" variant="subtitle2" color="grey">Warning: expenses will not be recoverable once deleted</Typography>
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} overflow="none">
                <CustomButton
                    isLoading={isLoading}
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeleteExpenses(expenses)}
                    sx={{ minWidth: 100, whiteSpace: "nowrap", margin: "none" }}
                >
                    Yes
                </CustomButton>
                <CustomButton
                    isLoading={isLoading}
                    loading={isLoading}
                    type="button"
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: 100, whiteSpace: "nowrap", margin: "none" }}
                    onClick={onClose}
                >
                    No
                </CustomButton>
            </Box>
        </Container>
    );
};

export default DeleteExpenseForm;