import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/login.jsx";
import Logout from "../pages/logout.jsx";
import Home from "../pages/home.jsx";
import Uhome from "../pages/uhome.jsx";
import Register from "../pages/register.jsx";
import Main from "../pages/main.jsx";
import User from "../pages/user.jsx";
import Admin from "../pages/admin.jsx";

const Routes = () => {
    const { token } = useAuth();

    const routesForPublic = [
    ];

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/user",
                    element: <User />,
                },
                {
                    path: "/logout",
                    element: <Logout/>,
                },
                {
                    path: "/uhome",
                    element: <Uhome/>,
                },
                {
                    path: "/admin",
                    element: <Admin />,
                },
                {
                    path: "/home",
                    element: <Home />,
                }
            ],
        },
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <Main/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },

    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;