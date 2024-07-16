import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Username from "./component/Username";
import Signup from "./component/Signup";
import Password from "./component/Password";
import Recovery from "./component/Recovery";
import Reset from "./component/Reset";
import Profile from "./component/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/profile",
    element: <Profile />,
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
