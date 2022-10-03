import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Counter } from "./pages/Counter";
import { FetchData } from "./pages/FetchData";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import HelmetElement from "./components/routes/HelmetElement";
import PrivateRoute from "./components/routes/PrivateRoute";
import GuestRoute from "./components/routes/GuestRoute";
import { Layout } from "./components/layouts/Layout";
import { History } from "./pages/History";

export const appRoutes = [
  {
    index: true,
    element: <Home />,
    name: "Home",
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
  },
  {
    path: "/not-found",
    element: <NotFound />,
    name: "Not Found",
  },
  {
    path: "/counter",
    element: <Counter />,
    name: "Counter",
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
    name: "Fetch Data",
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    excludeAppBar: true,
    name: "Sign In",
    guest: true,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    excludeAppBar: true,
    name: "Sign Up",
    guest: true,
  },
  {
    path: "/game",
    element: <Game />,
    name: "Game",
  },
  {
    path: "/profile",
    element: <Profile />,
    name: "Profile",
    private: true,
  },
  {
    path: "/history",
    element: <History />,
    name: "History",
    private: true,
  },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<GuestRoute />}>
          {appRoutes
            .filter((route) => route.guest)
            .map((route, index) => {
              const { element, name, ...rest } = route;
              return (
                <Route
                  key={index}
                  {...rest}
                  element={<HelmetElement name={name} element={element} />}
                />
              );
            })}
        </Route>
        <Route element={<PrivateRoute />}>
          {appRoutes
            .filter((route) => route.private)
            .map((route, index) => {
              const { element, name, ...rest } = route;
              return (
                <Route
                  key={index}
                  {...rest}
                  element={<HelmetElement name={name} element={element} />}
                />
              );
            })}
        </Route>
        {appRoutes
          .filter((route) => !route.private)
          .map((route, index) => {
            const { element, name, ...rest } = route;
            return (
              <Route
                key={index}
                {...rest}
                element={
                  name ? (
                    <HelmetElement name={name} element={element} />
                  ) : (
                    element
                  )
                }
              />
            );
          })}
      </Route>
    </Routes>
  );
}
