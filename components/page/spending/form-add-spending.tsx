import DateTimeinput from '@/components/input/date-time-input'
import RadioInput from '@/components/input/radio-input'
import { Colors } from '@/constants/theme'
import { AddSpendingSchema } from '@/helper/validation/add-spending-validation'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function FormAddSpending() {
    const [valueFormik, setValueFormik] = useState({
        category: "",
        date: `${new Date()}`
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
                        <TouchableOpacity activeOpacity={0.6} style={{paddingVertical: 10, borderRadius: 8, backgroundColor: Colors.tealKuvera, justifyContent: "center", alignItems: "center"}} onPress={() => FormikProps.handleSubmit()}>
                            <Text style={{fontWeight: "500", color: "white", fontSize: 16}}>Lanjut</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}
