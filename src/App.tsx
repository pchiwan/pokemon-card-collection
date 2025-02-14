import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { AppLayout } from "./AppLayout";
import { Dashboard } from "./pages/Dashboard/Dashboard";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="charts" element={<h2>Charts</h2>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export const App = () => {
  return <Router />;
};
