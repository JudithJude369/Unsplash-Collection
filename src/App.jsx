import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Collections, Error, HomeLayout, Image, Landing } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "landing/:id",
        element: <Image />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
