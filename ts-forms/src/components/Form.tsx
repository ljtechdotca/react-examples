import React from "react";
import styles from "./Form.module.css";

interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

export const Form = ({
  children,
  ...attributes
}: React.PropsWithChildren<FormProps>) => {
  return (
    <form className={styles.root} {...attributes}>
      {children}
    </form>
  );
};

export default Form;
