import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormProvider from "./components/common/formProvider/FormProvider";
import Header from "./components/common/header/Header";
import Home from "./components/pages/home/Home";
import All from "./components/pages/posts/All";
import Posts from "./components/pages/posts/Posts";
import Unique from "./components/pages/posts/Unique";

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

function App() {
  return (
    <BrowserRouter>
      <FormProvider>
        <Header />
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
      </FormProvider>
    </BrowserRouter>
  );
}

export default App;
