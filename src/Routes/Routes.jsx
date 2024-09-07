import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import axios from "axios";
import Home from "../Pages/Home";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../Layouts/Shared/NotFound";
import AllTouristSpot from "../Pages/AllTouristSpot";
import TouristSpotDetails from "../components/TouristSpotDetails";
import UserProfile from "../Pages/UserProfile";
import AddTouristSpot from "../Pages/AddTouristSpot";
import MyList from "../Pages/MyList";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <h1>Error</h1>,
        children: [
            { path: "/", element: <Home></Home>, },
            {
                path: "/tourists-spot",
                element: <AllTouristSpot></AllTouristSpot>,
                loader: async () => {
                    try {
                        const res = await axios.get('http://localhost:5000/all-spot');
                        return res.data;
                    } catch (error) {
                        throw new Response('Failed to load data', { status: error.response?.status || 500 });
                    }
                },
            },
            {
                path: "/tourists-spot/:_id",
                element: <ProtectedRoute> <TouristSpotDetails></TouristSpotDetails> </ProtectedRoute>,
                loader: async ({ params }) => {
                    try {
                        const res = await axios.get(`http://localhost:5000/all-spot/${params._id}`);
                        return res.data;
                    } catch (error) {
                        throw new Response('Failed to load data', { status: error.response?.status || 500 });
                    }
                },
            },
            { path: "/add-tourists-spot", element: <ProtectedRoute> <AddTouristSpot></AddTouristSpot> </ProtectedRoute>, },
            { path: "/my-list", element: <ProtectedRoute> <MyList></MyList> </ProtectedRoute>, },
            { path: "/profile", element: <ProtectedRoute><UserProfile></UserProfile></ProtectedRoute>, },
            { path: "/contact", element: <h1>Contact </h1>, },
            { path: "/login", element: <LogIn></LogIn>, },
            { path: "/register", element: <Register></Register>, },
            { path: "*", element: <NotFound></NotFound>, },
        ],
    },
]);

export default router;