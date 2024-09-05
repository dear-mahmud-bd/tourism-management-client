import { useLoaderData } from "react-router-dom";
import TouristSpotCard from "../components/TouristSpotCard";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const AllTouristSpot = () => {
    const spots = useLoaderData();
    // console.log(spots);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
            <Helmet>
                <title>All Tourist Spot </title>
            </Helmet>
            {spots.map((spot, index) => (
                <TouristSpotCard key={index} spot={spot} />
            ))}
        </div>
    );
};

export default AllTouristSpot;