import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaUsers } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { useLoaderData, useParams } from "react-router-dom";


const TouristSpotDetails = () => {

    const allSpots = useLoaderData();
    const { _id } = useParams();

    console.log(_id, allSpots);
    const touristSpot = allSpots.find(spot => spot._id === _id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!touristSpot) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>Spot Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Tourist Spot Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the tourist spot you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-2">
            <Helmet>
                <title>Spot Details | {touristSpot.tourists_spot_name}</title>
            </Helmet>
            <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src={touristSpot.image}
                    alt={touristSpot.tourists_spot_name}
                    className="w-full h-[500px] object-cover"
                />
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800">{touristSpot.tourists_spot_name}</h2>
                    <p className="text-xl text-gray-600 mb-4 flex items-center"><IoLocationSharp />{touristSpot.location}</p>
                    <p className="text-gray-700 mb-4">{touristSpot.short_description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Country</h3>
                            <p className="text-gray-600">{touristSpot.country_Name}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Seasonality</h3>
                            <p className="text-gray-600 flex items-center gap-2"><LuCalendarDays />{touristSpot.seasonality}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Travel Time</h3>
                            <p className="text-gray-600 flex items-center gap-2"><MdAccessTime />{touristSpot.travel_time}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Average Cost</h3>
                            <p className="text-gray-600">$ {touristSpot.average_cost}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Visitors Per Year</h3>
                            <p className="text-gray-600 flex items-center gap-2"><FaUsers />{touristSpot.totalVisitorsPerYear.toLocaleString()}</p>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="flex items-center">
                        <div className="mr-4">
                            <h3 className="text-lg font-semibold text-gray-700">Submitted By</h3>
                            <p className="text-gray-600">{touristSpot.user_name}</p>
                            <p className="text-gray-600">{touristSpot.user_email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TouristSpotDetails;
