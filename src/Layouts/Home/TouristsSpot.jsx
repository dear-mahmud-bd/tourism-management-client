import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TouristSpotCard from "../../components/TouristSpotCard";

const TouristsSpot = () => {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/tourist_spots.json');
            setSpots(res.data);
        };
        fetchData();
    }, []);
    return (
        <div className="my-10">
                <h2 className="text-center text-3xl font-semibold mb-8 underline decoration-customLightBrown underline-offset-8">Southeast Asia Tourists Spot</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
                    {spots.slice(0, 8).map((spot, index) => (
                        <TouristSpotCard key={index} spot={spot} />
                    ))}
                </div>
                <div className="text-center">
                    <Link to='/tourists-spot' className="btn bg-customPaleBeige hover:bg-customSandyBrown mt-4">All Tourists Spot</Link>
                </div>
            </div>
    );
};

export default TouristsSpot;