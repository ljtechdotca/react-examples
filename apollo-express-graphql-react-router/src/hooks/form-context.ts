import { createContext, useContext } from "react";

export interface InputState {
  placeholder: string;
  value: string;
  readOnly: boolean;
}

export interface FormState extends Record<string, InputState> {}

export const initialFormState: FormState = {
  id: {
    value: "",
    placeholder: "ID",
    readOnly: true,
  },
  title: {
    value: "",
    placeholder: "Title",
    readOnly: false,
  },
  author: {
    value: "",
    placeholder: "Author",
    readOnly: false,
  },
};

export const FormContext = createContext<{
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}>({
  form: { ...initialFormState },
  setForm: () => {},
});

export const useForm = () => {
  const { form, setForm } = useContext(FormContext);

  return { form, setForm };
};
