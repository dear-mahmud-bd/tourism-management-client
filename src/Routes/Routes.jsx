import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import AllTouristSpot from "../Pages/AllTouristSpot";
import axios from "axios";
import TouristSpotDetails from "../components/TouristSpotDetails";
import NotFound from "../Layouts/Shared/NotFound";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            { path: "/", element: <Home></Home>, },
            {
                path: "/tourists-spot",
                element: <AllTouristSpot></AllTouristSpot>,
                loader: async () => {
                    try {
                        const res = await axios.get('/tourist_spots.json');
                        return res.data;
                    } catch (error) {
                        throw new Response('Failed to load data', { status: error.response?.status || 500 });
                    }
                },
            },
            {
                path: "/tourists-spot/:_id",
                element: <TouristSpotDetails></TouristSpotDetails>,
                loader: async () => {
                    try {
                        const res = await axios.get('/tourist_spots.json');
                        return res.data;
                    } catch (error) {
                        throw new Response('Failed to load data', { status: error.response?.status || 500 });
                    }
                },
            },
            { path: "/add-tourists-spot", element: <h1>Add Tourists Spot</h1>, },
            { path: "/my-list", element: <h1>My List</h1>, },
            { path: "/contact", element: <h1>Contact </h1>, },
            { path: "/login", element: <LogIn></LogIn>, },
            { path: "/register", element: <Register></Register>, },
            { path: "*", element: <NotFound></NotFound>, },
        ],
    },
]);

export default router;