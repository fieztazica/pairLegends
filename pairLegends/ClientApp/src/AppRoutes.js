import { NotFound } from "./pages/404";
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
        title: "Home"
    },
    {
        path: '*',
        element: <NotFound />,
        title: "Not Found"
    },
    {
        path: '/counter',
        element: <Counter />,
        title: "Counter"
    },
    {
        path: '/fetch-data',
        element: <FetchData />,
        title: "Fetch Data"
    },
    {
        path: '/sign-in',
        element: <SignIn />,
        excludeAppBar: true,
        title: "Sign In"
    },
    {
        path: '/sign-up',
        element: <SignUp />,
        excludeAppBar: true,
        title: "Sign Up"
    },
    {
        path: '/game',
        element: <Game />,
        title: "Game"
    },
    {
        path: '/profile',
        element: <Profile />,
        excludeAppBar: true,
        title: "Profile"
    },
];

export default AppRoutes;
