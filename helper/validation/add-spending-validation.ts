import * as Yup from "yup";

export type ValuesFormAddSpendingType = {
    category: string,
    date: string,
    spend: string,
    notes: string,
}

export const AddSpendingSchema = Yup.object().shape({
  category: Yup.string()
    .required("Select category"),
  date: Yup.string()
    .required("Date cannot be empty"),
  spend: Yup.string()
    .required("Spending cannot be empty"),
  notes: Yup.string(),
});