export type AsyncAddTransactionParam = {
    param: AddTransactionParams
    successHandler: () => void
}

export type TypeTransaction = 'incoming' | 'outgoing';

export type AddTransactionParams = {
    category_id: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
}