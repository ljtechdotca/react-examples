import styles from "./Button.module.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
}

export const Button = ({ label, ...attributes }: ButtonProps) => {
  return (
    <button className={styles.root} {...attributes}>
      {label}
    </button>
  );
};

export default Button;
