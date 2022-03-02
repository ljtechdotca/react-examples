import React, { useState } from "react";
import { Button, Form, Input } from "../components";
import styles from "./Home.module.css";

export const Home = () => {
  const [formDataValues, setFormDataValues] = useState<
    Record<string, FormDataEntryValue>
  >({});

  const initialForm = () => {
    // Create initial values
    return {
      color: "#ffffff",
      text: "",
      file: "",
    };
  };

  const [form, setForm] = useState<Record<string, string>>(initialForm());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // On submission, HTML web forms will refresh the page, to prevent this use event.preventDefault()
    event.preventDefault();

    // Check target is HTML form element
    if (event.target instanceof HTMLFormElement) {
      const newFormData = new FormData(event.target);
      // 📚 Docs on FormData  `https://developer.mozilla.org/en-US/docs/Web/API/FormData`

      const newFormDataValues = Object.fromEntries(newFormData);
      // Make the FormData values readable easily using Object.fromEntries

      setFormDataValues(newFormDataValues);
      console.log(newFormDataValues);
    }
  };

  return (
    <div className={styles.root}>
      <pre>
        formDataValues: <code>{JSON.stringify(formDataValues, null, 2)}</code>
      </pre>

      <pre>
        form: <code>{JSON.stringify(form, null, 2)}</code>
      </pre>
      <Form onSubmit={handleSubmit}>
        <Input
          id="color"
          name="color"
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              color: event.target.value,
            }))
          }
          value={form.color}
          type="color"
        />
        <Input
          id="text"
          name="text"
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              text: event.target.value,
            }))
          }
          value={form.text}
          placeholder="Text Input"
          type="text"
        />
        <Input
          id="file"
          name="file"
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              file: event.target.value,
            }))
          }
          value={form.file}
          type="file"
        />
        <Button type="submit" label="🎈 Submit" />
      </Form>
    </div>
  );
};

export default Home;
