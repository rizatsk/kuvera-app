import * as Yup from "yup";

export type ValuesFormAddSpendingType = {
    category: string,
    date: string
}

export const AddSpendingSchema = Yup.object().shape({
  category: Yup.string()
    .required("Category wajib diisi"),
  date: Yup.string()
    .required("Date spending wajib diisi")
});