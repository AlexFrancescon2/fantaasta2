import { Navigate, useRoutes } from "react-router-dom";
import { Login } from "./components/pages/login/Login";
import { Home } from "./components/pages/home/Home";
import { Settings } from "./components/pages/settings/Settings";
import { PageWrapper } from "./components/pages/page-wrapper/page-wrapper";
import { Players } from "./components/pages/players/Players";
import { Users } from "./components/pages/users/Users";
import { Auction } from "./components/pages/auction/Auction";
import './App.css'
import { Dashboard } from "./components/pages/dashboard/Dashboard";

export default function App() {
  const isLogged = !!JSON.parse(localStorage.getItem("fantauser"))?.id;
  const routes = useRoutes([
    {
      path: "/",
      element: isLogged ? (
        <PageWrapper>
          <Home />
        </PageWrapper>
      ) : (
        <Navigate to="/login" replace={true} />
      ),
    },
    {
      path: "/calciatori",
      element: isLogged ? (
        <PageWrapper>
          <Players />
        </PageWrapper>
      ) : (
        <Navigate to="/login" replace={true} />
      ),
    },
    {
      path: "/utenti",
      element: isLogged ? (
        <PageWrapper>
          <Users />
        </PageWrapper>
      ) : (
        <Navigate to="/login" replace={true} />
      ),
    },
    {
      path: "/login",
      element: isLogged ? (
        <PageWrapper>
          <Home />
        </PageWrapper>
      ) : (
        <Login />
      ),
    },
    {
      path: "/impostazioni",
      element: isLogged ? (
        <PageWrapper>
          <Settings />
        </PageWrapper>
      ) : (
        <Navigate to="/login" replace={true} />
      ),
    },
    {
      path: "/asta",
      element: isLogged ? (
        <PageWrapper>
          <Auction />
        </PageWrapper>
      ) : (
        <Navigate to="/login" replace={true} />
      ),
    },
    {
      path: "/dashboard",
      element: isLogged ? (
        <PageWrapper>
          <Dashboard />
        </PageWrapper>
      ) : (
        <Navigate to="/login" replace={true} />
      ),
    },
  ]);

  return routes;
}
