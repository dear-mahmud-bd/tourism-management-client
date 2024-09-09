import { useLoaderData } from "react-router-dom";
import TouristSpotCard from "../components/TouristSpotCard";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

const AllTouristSpot = () => {
    const [loading, setLoading] = useState(true);
    const spots = useLoaderData();
    // console.log(spots);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
    const [touristSpot, setTouristSpot] = useState([]);
    useEffect(() => {
        if (spots) {
            setTouristSpot(spots);
            setLoading(false);
        }
    }, [spots]);
    
    const handleSortChange = (e) => {
        const criteria = e.target.value;
        const sortedSpots = [...touristSpot];
        if (criteria === 'ascending') sortedSpots.sort((a, b) => a.average_cost - b.average_cost); 
        else if (criteria === 'descending') sortedSpots.sort((a, b) => b.average_cost - a.average_cost); 
        setTouristSpot(sortedSpots); 
    };

    if (loading) return <Loading />
    
    return (
        <div >
            <Helmet>
                <title>All Tourist Spot </title>
            </Helmet>
            <div className='my-5 flex justify-center items-center'>
                <select onChange={handleSortChange} className="select select-bordered w-full max-w-xs bg-customSandyBrown font-bold text-white border-0 text-center">
                    <option className='bg-gray-200 text-black' defaultValue>Sort By Average Cost</option>
                    <option value="ascending" className='bg-gray-200 text-black'>Low to High</option>
                    <option value="descending" className='bg-gray-200 text-black'>High to Low</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
                {touristSpot.map((spot, index) => (
                    <TouristSpotCard key={index} spot={spot} />
                ))}
            </div>
        </div>
    );
};

export default AllTouristSpot;