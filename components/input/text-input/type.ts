import { ReactNode } from "react";
import { MaskInputProps } from 'react-native-mask-input';

export interface TextInputProps extends MaskInputProps {
    label: string;
    helperMessage?: string;
    editable?: boolean;
    isError?: boolean;
    errorMessage?: string;
    counter?: number;
    inputIcon?: ReactNode;
    inputType?: 'text' | 'date';
    selectOptions?: Array<string>,
    onSelect?: (value: string) => void,
    onSelectDate?: (value: string) => void,
}