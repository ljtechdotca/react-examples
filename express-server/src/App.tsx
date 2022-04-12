import { useRef, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<any>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchResponse = async () => {
    setIsSubmitting(true);
    const timeout = setTimeout(async () => {
      // check if inputRef exists (as it is possibly undefined)
      if (!inputRef || !inputRef.current) throw new Error("No Input Found");
      try {
        const value = inputRef.current.value;

        // talk to the backend express server endpoint /api using the query "?key=value" and GET request method
        const apiResponse = await fetch(`/api?key=${value}`);
        const json = await apiResponse.json();

        setResponse(json);
        setIsSubmitting(false);
        inputRef.current.value = "";

        clearTimeout(timeout);
      } catch (error) {
        setResponse(error);
        setIsSubmitting(false);

        clearTimeout(timeout);
      }
    }, 1000); // setTimeout is used to simulate a delay on the response time
  };

  return (
    <div className={styles.root}>
      <pre>
        <code>{JSON.stringify(response, null, 2)}</code>
      </pre>
      <div className={styles.base}>
        <label htmlFor="input">Input</label>
        <input
          ref={inputRef}
          id="input"
          name="input"
          placeholder="Lorem ipsum"
          type="text"
        />
        {isSubmitting ? (
          <button>Submitting</button>
        ) : (
          <button onClick={fetchResponse}>Fetch</button>
        )}
      </div>
    </div>
  );
}

export default App;
