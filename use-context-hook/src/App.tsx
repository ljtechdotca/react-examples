import React, { FormEvent, useState } from "react";
import { useStore } from "./hooks";

const INIT_FORM = () => {
  return {
    key: "",
    value: "",
  };
};

function App() {
  const { store, setStore } = useStore();
  const [form, setForm] = useState(INIT_FORM());

  const handleStore = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newKey = form.key.toLowerCase().replace(/[^a-z]/g, "");
    setStore((currentStore) => ({ ...currentStore, [newKey]: form.value }));
    setForm(INIT_FORM());
  };

  return (
    <div>
      <pre>
        store: <code>{JSON.stringify(store, null, 2)}</code>
      </pre>
      <form onSubmit={handleStore}>
        <input
          type="text"
          id="key"
          name="key"
          placeholder="Key"
          value={form.key}
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              key: event.target.value,
            }))
          }
        />
        <input
          type="text"
          id="value"
          name="value"
          placeholder="Value"
          value={form.value}
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              value: event.target.value,
            }))
          }
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
