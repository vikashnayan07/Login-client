import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Username from "./component/Username";
import Signup from "./component/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
