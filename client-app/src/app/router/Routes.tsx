import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetalis from "../../features/activities/detalis/ActivityDetalis";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetalis /> },
      { path: "createActivity", element: <ActivityForm key="create" /> },
      { path: "manage/:id", element: <ActivityForm key="manage" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
