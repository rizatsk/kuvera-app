import RadioInput from '@/components/radio-input'
import { AddSpendingSchema } from '@/helper/validation/add-spending-validation'
import { Formik } from 'formik'
import React from 'react'
import { ScrollView } from 'react-native'

export default function FormAddSpending() {
    const ListCategories = ["Shopping", "Kebutuhan", "Bengkel"];

    return (
        <ScrollView style={{ paddingVertical: 5 }}>
            <Formik
                initialValues={{ category: "" }}
                validationSchema={AddSpendingSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {(FormikProps) => (
                    <>
                        <RadioInput
                            accessible={true}
                            label='Category'
                            placeholder="Category"
                            value={FormikProps.values.category}
                            onSelect={(value) => FormikProps.setFieldValue("category", value)}
                            selectOptions={ListCategories}
                            errorMessage={FormikProps.errors.category && FormikProps.touched.category ? FormikProps.errors.category : ""}
                        />
                    </>
                )}
            </Formik>
        </ScrollView>
    )
}
