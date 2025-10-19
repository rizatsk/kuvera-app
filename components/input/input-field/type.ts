import { ReactNode } from "react";
import { MaskInputProps } from 'react-native-mask-input';

export interface InputProps extends MaskInputProps {
    label: string;
    helperMessage?: string;
    editable?: boolean;
    isError?: boolean;
    errorMessage?: string;
    counter?: number;
    inputIcon?: ReactNode;
    inputType?: 'text' | 'money';
    selectOptions?: Array<string>,
    onSelect?: (value: string) => void,
    onSelectDate?: (value: string) => void,
}