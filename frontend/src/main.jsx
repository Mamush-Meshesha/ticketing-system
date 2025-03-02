import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import UsersPage from "./pages/user.jsx";
import ProtectedRoute from "./components/protected.jsx";
import SettingsPage from "./pages/setting.jsx";
import NotFound from "./pages/notfound.jsx";
import TicketDetailPage from "./pages/tiketDetail.jsx";
import TicketsPage from "./pages/ticket.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import Login from "./pages/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import { store } from "./stores/store.js";
import Register from "./pages/register.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
        <DashboardPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/tickets",
    element: (
      <ProtectedRoute>
        <Layout>
        <TicketsPage />

        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/tickets/:id",
    element: (
      <ProtectedRoute>
        <Layout>
        <TicketDetailPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Layout>
        <UsersPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Layout>
        <SettingsPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store = {store}>
   <RouterProvider router={router} />
   </Provider>
  </StrictMode>
);
