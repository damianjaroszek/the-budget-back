export interface BudgetEntity {
    budget: number;
    expense: number;
}

export interface NewBudgetEntity extends Omit<BudgetEntity, 'expense'> {
    expense?: number;
}


export interface StatsFromBudget {
    categoryName: string,
    expenseSum: number
};



