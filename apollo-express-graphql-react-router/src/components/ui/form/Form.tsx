import { initialFormState, useForm } from "src/hooks/form-context";
import styles from "./Form.module.scss";

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form = ({ onSubmit }: FormProps) => {
  const { form, setForm } = useForm();

  return (
    <form className={styles.root} onSubmit={onSubmit}>
      {Object.entries(form).map(([key, value], index) => (
        <input
          key={key}
          id={key}
          name={key}
          placeholder={value.placeholder}
          onChange={(event) =>
            setForm((state) => ({
              ...state,
              [key]: { ...state[index], value: event.target.value },
            }))
          }
          value={value.value}
          readOnly={value.readOnly}
        />
      ))}
      <button type="submit">Submit</button>
      <button type="reset" onClick={() => setForm({ ...initialFormState })}>
        Reset
      </button>
    </form>
  );
};

export default Form;
