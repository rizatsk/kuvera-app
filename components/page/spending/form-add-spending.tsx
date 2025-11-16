import CustomText from '@/components/custom-text'
import DateTimeinput from '@/components/input/date-time-input'
import RadioInput from '@/components/input/radio-input'
import { TextInput } from '@/components/input/text-input/text-input'
import { Colors } from '@/constants/theme'
import { cleanRupiahToNumber } from '@/helper/format-rupiah'
import { formatDateTime } from '@/helper/formate-date-time'
import { AddSpendingSchema } from '@/helper/validation/add-spending-validation'
import { CategorySpendType } from '@/service/category-spend/graphQl'
import { useAppSelector } from '@/states'
import { asyncGetCategorySpend } from '@/states/categories-spend/action'
import { asyncAddTransaction } from '@/states/transaction/action'
import { AddTransactionParams, TypeTransaction } from '@/states/transaction/type'
import { setLoading } from '@/states/visible-loading/action'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

export default function FormAddSpending() {
    const categories_spend: CategorySpendType[] = useAppSelector((states) => states.categoriesSpend);
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories_spend.length < 1) {
            dispatch(
                asyncGetCategorySpend({
                    setIsLoading: setLoading
                }) as any
            )
        }
    }, []);

    const initialValuesForm = {
        category: { id: "", name: "" },
        date: `${new Date()}`,
        spend: "",
        notes: ""
    };
    const [valueFormik, setValueFormik] = useState(initialValuesForm);

    const handleSubmitForm = (values: AddTransactionParams) => {
        dispatch(
            asyncAddTransaction({
                param: values,
                successHandler: () => {
                    ToastAndroid.showWithGravity(
                        "Success add spending",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    setValueFormik(initialValuesForm);
                }
            }) as any
        )
    }

    return (
        <ScrollView>
            <CustomText style={{ fontWeight: 600, fontSize: 16, color: Colors.tealKuvera }}>
                Every rupiah is important.
            </CustomText>
            <CustomText>Log your expenses now, and see where your money truly goes. Detailed records prevent regret at the end of the month</CustomText>
            <Formik
                initialValues={valueFormik}
                enableReinitialize={true}
                validationSchema={AddSpendingSchema}
                onSubmit={(values) => {
                    const cleanValue = {
                        category_id: values.category.id,
                        created_dt: formatDateTime(new Date(values.date)),
                        money_spent: cleanRupiahToNumber(values.spend),
                        notes: values.notes,
                        type: 'incoming' as TypeTransaction
                    }
                    handleSubmitForm(cleanValue);
                }}
            >
                {(FormikProps) => (
                    <View style={{ gap: 18, marginTop: 15 }}>
                        <RadioInput
                            accessible={true}
                            label='Category'
                            placeholder="Category"
                            value={FormikProps.values.category.name}
                            onSelect={(value) => FormikProps.setFieldValue("category", value)}
                            selectOptions={categories_spend}
                            errorMessage={FormikProps.errors.category?.id && FormikProps.touched.category?.id ? FormikProps.errors.category.id : ""}
                        />
                        <DateTimeinput
                            label='Date & time spending'
                            onSelectDate={(value) => FormikProps.setFieldValue("date", value)}
                            value={FormikProps.values.date}
                            errorMessage={FormikProps.errors.date && FormikProps.touched.date ? FormikProps.errors.date : ""}
                        />
                        <TextInput
                            label='Money spent'
                            value={FormikProps.values.spend}
                            accessible={true}
                            keyboardType='number-pad'
                            inputType='money'
                            onChangeText={FormikProps.handleChange('spend')}
                            errorMessage={FormikProps.errors.spend && FormikProps.touched.spend ? FormikProps.errors.spend : ""}
                        />
                        <TextInput
                            label='Notes (optional)'
                            value={FormikProps.values.notes}
                            accessible={true}
                            onChangeText={FormikProps.handleChange('notes')}
                            errorMessage={FormikProps.errors.notes && FormikProps.touched.notes ? FormikProps.errors.notes : ""}
                        />
                        <TouchableOpacity activeOpacity={0.6} style={style.button_lanjut} onPress={() => FormikProps.handleSubmit()}>
                            <CustomText style={{ fontWeight: 600, color: "white", fontSize: 16 }}>Save</CustomText>
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