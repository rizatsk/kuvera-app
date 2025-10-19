import * as Yup from "yup";

export type ValuesFormAddSpendingType = {
    category: string,
    date: string,
    spend: string,
    notes: string,
}

export const AddSpendingSchema = Yup.object().shape({
  category: Yup.string()
    .required("Category wajib diisi"),
  date: Yup.string()
    .required("Date spending wajib diisi"),
  spend: Yup.string()
    .required("spend spending wajib diisi"),
  notes: Yup.string(),
});