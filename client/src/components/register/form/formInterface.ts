export interface ValueType {
  username: string;
  email: string;
  birthday: string;
  avatar: File | null;
  country: string;
  password: string;
  confirmPassword: string;
  isSeller: boolean;
  [key: string]: any;
}
export interface OptionType {
  value: string;
  label: string;
}
export interface SelectFormType {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string | undefined;
  options: OptionType[] | undefined;

}

export interface InputFormType {
  pattern: string | undefined;
  required: boolean | undefined;
  // value: string;
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> & {
      target: { name: keyof ValueType; value: string };
    }) => void;
    errorMessage: string | undefined;
  focus: string;
    onBlur: () => void;

}