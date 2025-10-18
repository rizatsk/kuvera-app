import DateTimeinput from '@/components/input/date-time-input'
import RadioInput from '@/components/input/radio-input'
import { AddSpendingSchema } from '@/helper/validation/add-spending-validation'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'

export default function FormAddSpending() {
    const [valueFormik, setValueFormik] = useState({
        category: "",
        date: ""
    });

    const ListCategories = ["Shopping", "Kebutuhan", "Bengkel"];

    return (
        <ScrollView style={{ paddingVertical: 5 }}>
            <Formik
                initialValues={valueFormik}
                validationSchema={AddSpendingSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {(FormikProps) => (
                    <View style={{gap: 20}}>
                        <RadioInput
                            accessible={true}
                            label='Category'
                            placeholder="Category"
                            value={FormikProps.values.category}
                            onSelect={(value) => FormikProps.setFieldValue("category", value)}
                            selectOptions={ListCategories}
                            errorMessage={FormikProps.errors.category && FormikProps.touched.category ? FormikProps.errors.category : ""}
                        />
                        <DateTimeinput 
                            label='Date & time spending'
                            onSelectDate={(value) => FormikProps.setFieldValue("date", value)}
                            value={FormikProps.values.date}
                            errorMessage={FormikProps.errors.date && FormikProps.touched.category ? FormikProps.errors.date: ""}
                        />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}
