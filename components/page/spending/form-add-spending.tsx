import CustomText from '@/components/custom-text'
import DateTimeinput from '@/components/input/date-time-input'
import RadioInput from '@/components/input/radio-input'
import { TextInput } from '@/components/input/text-input/text-input'
import { Colors } from '@/constants/theme'
import { cleanRupiahToNumber } from '@/helper/format-rupiah'
import { formatDateTime } from '@/helper/formate-date-time'
import { AddSpendingSchema } from '@/helper/validation/add-spending-validation'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function FormAddSpending() {
    const [valueFormik, setValueFormik] = useState({
        category: "",
        date: `${formatDateTime(new Date())}`,
        spend: "",
        notes: ""
    });

    const ListCategories = ["Shopping", "Kebutuhan", "Bengkel"];

    return (
        <ScrollView style={{ paddingVertical: 5 }}>
            <CustomText style={{fontWeight: "500", fontSize: 16, color: Colors.tealKuvera}}>
                Every rupiah is important.
            </CustomText>
            <CustomText>Log your expenses now, and see where your money truly goes. Detailed records prevent regret at the end of the month</CustomText>
            <Formik
                initialValues={valueFormik}
                validationSchema={AddSpendingSchema}
                onSubmit={(values) => {
                    const cleanValue = {
                        ...values,
                        spend: cleanRupiahToNumber(values.spend)
                    }
                    console.log(cleanValue)
                }}
            >
                {(FormikProps) => (
                    <View style={{gap: 18, marginTop:  15}}>
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
                            errorMessage={FormikProps.errors.date && FormikProps.touched.date ? FormikProps.errors.date: ""}
                        />
                        <TextInput 
                            label='Money spent'
                            value={FormikProps.values.spend}
                            accessible={true}
                            keyboardType='number-pad'
                            inputType='money'
                            onChangeText={FormikProps.handleChange('spend')}
                            errorMessage={FormikProps.errors.spend && FormikProps.touched.spend ? FormikProps.errors.spend: ""}
                        />
                        <TextInput 
                            label='Notes (optional)'
                            value={FormikProps.values.notes}
                            accessible={true}
                            onChangeText={FormikProps.handleChange('notes')}
                            errorMessage={FormikProps.errors.notes && FormikProps.touched.notes ? FormikProps.errors.notes: ""}
                        />
                        <TouchableOpacity activeOpacity={0.6} style={style.button_lanjut} onPress={() => FormikProps.handleSubmit()}>
                            <CustomText style={{fontWeight: "500", color: "white", fontSize: 16}}>Save</CustomText>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    button_lanjut: {
        paddingVertical: 10, 
        borderRadius: 8, 
        backgroundColor: Colors.tealKuvera, 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: 20,
    }
})