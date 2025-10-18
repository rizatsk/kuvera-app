import { MaskInputProps } from 'react-native-mask-input';

export interface RadioInputProps extends MaskInputProps {
    label: string;
    helperMessage?: string;
    isError?: boolean;
    errorMessage?: string;
    selectOptions: Array<string>,
    onSelect: (value: string) => void
}