import { NotFound } from "./components/404";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Game } from "./components/Game";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />,
    },
    {
        path: '/sign-in',
        element: <SignIn />,
        excludeAppBar: true
    },
    {
        path: '/sign-up',
        element: <SignUp />,
        excludeAppBar: true
    },
    {
        path: '/game',
        element: <Game />
    },
    {
        path: '/profile',
        element: <Profile />,
        excludeAppBar: true
    },
];

export default AppRoutes;
