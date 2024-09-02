import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            { path: "/", element: <h1>This is home</h1>, },
            { path: "/tourists-spot", element: <h1>Tourists Spot</h1>, },
            { path: "/add-tourists-spot", element: <h1>Add Tourists Spot</h1>, },
            { path: "/my-list", element: <h1>My List</h1>, },
            { path: "/contact", element: <h1>Contact </h1>, },
            { path: "/login", element: <h1>LogIn</h1>, },
            { path: "/register", element: <h1>Register</h1>, },
          ],
    },
]);

export default router;