import { Navigate } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Counter } from "./pages/Counter";
import { FetchData } from "./pages/FetchData";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

const AppRoutes = [
    {
        index: true,
        element: <Home />,
        name: "Home"
    },
    {
        path: '*',
        element: <Navigate to="/not-found" replace />
    },
    {
        path: '/not-found',
        element: <NotFound />,
        name: "Not Found"
    },
    {
        path: '/counter',
        element: <Counter />,
        name: "Counter"
    },
    {
        path: '/fetch-data',
        element: <FetchData />,
        name: "Fetch Data"
    },
    {
        path: '/sign-in',
        element: <SignIn />,
        excludeAppBar: true,
        name: "Sign In"
    },
    {
        path: '/sign-up',
        element: <SignUp />,
        excludeAppBar: true,
        name: "Sign Up"
    },
    {
        path: '/game',
        element: <Game />,
        name: "Game"
    },
    {
        path: '/profile',
        element: <Profile />,
        excludeAppBar: true,
        name: "Profile"
    },
];

export default AppRoutes;
