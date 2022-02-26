import { createContext, Dispatch, SetStateAction, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import All from "./components/pages/posts/All";
import Posts from "./components/pages/posts/Posts";
import Unique from "./components/pages/posts/Unique";
import "./styles/App.css";

const routes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "posts",
    element: <Posts />,
    children: [
      {
        path: "",
        element: <All />,
      },
      {
        path: ":postId",
        element: <Unique />,
      },
    ],
  },
];

export const FormContext = createContext<{
  form: Record<string, any>;
  setForm: Dispatch<
    SetStateAction<{ id: string; author: string; title: string }>
  >;
}>({
  form: { id: "", author: "", title: "" },
  setForm: () => {},
});

function App() {
  const [form, setForm] = useState({ id: "", author: "", title: "" });

  return (
    <BrowserRouter>
      <FormContext.Provider value={{ form, setForm }}>
        <header>
          <ul>
            <li>
              <Link to="">Home</Link>
            </li>
            <li>
              <Link to="posts">Posts</Link>
            </li>
          </ul>
        </header>
        <main>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                >
                  {route.children &&
                    route.children.map((slug) => (
                      <Route
                        key={route.path + slug.path}
                        path={slug.path}
                        element={slug.element}
                      />
                    ))}
                </Route>
              );
            })}
          </Routes>
        </main>
      </FormContext.Provider>
    </BrowserRouter>
  );
}

export default App;
