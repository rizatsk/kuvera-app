export type AsyncAddTransactionParam = {
    param: AddTransactionParams
    successHandler: () => void,
    goToPageSuccess: (values: ResultAddTransaction) => void,
}

export type TypeTransaction = 'incoming' | 'outgoing';

export type AddTransactionParams = {
    category_id: string,
    category_name: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
}

export type ResultAddTransaction = {
    id: string,
    category_name: string,
    category_id: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
    source: string
}