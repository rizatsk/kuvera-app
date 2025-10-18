import * as Yup from "yup";

export type ValuesFormAddSpendingType = {
    category: string
}

export const AddSpendingSchema = Yup.object().shape({
  category: Yup.string()
    .required("Category wajib diisi")
});