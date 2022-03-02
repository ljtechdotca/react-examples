import styles from "./Input.module.css";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = ({ ...attributes }: InputProps) => {
  return <input className={styles.root} {...attributes} />;
};

export default Input;
