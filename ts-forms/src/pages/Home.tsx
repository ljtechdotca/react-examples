import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import styles from "./Home.module.scss";
require("dotenv").config();

interface FormInput {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}

const inputs: FormInput[] = [
  {
    id: "firstName",
    label: "First name",
    placeholder: "John",
    type: "text",
  },
  {
    id: "lastName",
    label: "Last name",
    placeholder: "Doe",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "john@acme.com",
    type: "email",
  },
  {
    id: "phone",
    label: "Phone number",
    placeholder: "123 456 7890",
    type: "tel",
  },
  {
    id: "date",
    label: "Booking date",
    placeholder: new Date().toLocaleDateString(),
    type: "date",
  },
  {
    id: "group",
    label: "Group size",
    placeholder: "1",
    type: "number",
  },
];

const phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  group: number;
}

const schema = yup.object().shape({
  firstName: yup.string().min(1).max(32).required().label("First name"),
  lastName: yup.string().min(1).max(32).required().label("Last name"),
  email: yup.string().email().required().label("Email"),
  phone: yup
    .string()
    .matches(
      phoneRegEx,
      "Phone number must match the following pattern: 123 456 7890"
    )
    .required()
    .label("Phone number"),
  date: yup
    .date()
    .min(new Date().toLocaleDateString())
    .required()
    .label("Date"),
  group: yup.number().min(1).max(16).required().label("Group size"),
});

const initialValues: FormValues = {
  firstName: "Landon",
  lastName: "Johnson",
  email: "thefirebasegod@gmail.com",
  phone: "123 456 7890",
  date: new Date().toISOString().split("T")[0],
  group: 1,
};

export const Home = () => {
  return (
    <div className={styles.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (
          values: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>
        ) => {
          console.log("success", values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            {inputs.map((input, index) => (
              <div key={index}>
                <div>
                  <label htmlFor={input.id}>{input.label}</label>
                </div>
                <Field
                  id={input.id}
                  name={input.id}
                  placeholder={input.placeholder}
                />
                {(errors as Record<string, any>)[input.id] &&
                  (touched as Record<string, any>)[input.id] && (
                    <div className={styles.error}>
                      {(errors as Record<string, any>)[input.id]}
                    </div>
                  )}
              </div>
            ))}
            <button type="submit">
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Home;
