import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/Login";
import ProtectedPage from "./pages/ProtectedPage";
import HomePage from "./pages/HomePage";
import AuthProvider from "./components/authProvider";
import ErrorPage from "./pages/ErrorPage";
import CreateGroup from "./pages/CreateGroup";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import Notes from "./pages/Notes";
import EditGroup from "./pages/EditGroup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dash",
    element: <ProtectedPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "notes/:id",
        element: <Notes />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },
      {
        path: "edit-note/:id",
        element: <EditNote />,
      },
      {
        path: "create-group",
        element: <CreateGroup />,
      },
      {
        path: "edit-group/:id",
        element: <EditGroup />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
