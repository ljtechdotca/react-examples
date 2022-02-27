import React, { useState } from "react";
import { FormContext, initialFormState } from "src/hooks/form-context";

interface FormProviderProps {}

const FormProvider = ({
  children,
}: React.PropsWithChildren<FormProviderProps>) => {
  const [form, setForm] = useState({ ...initialFormState });

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
