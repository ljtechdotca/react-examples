import React from "react";
import Home from "./components/pages/home/Home";
import ThemeProvider from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
