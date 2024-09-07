import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const MyList = () => {
    const { user } = useContext(AuthContext);
    const [spots, setSpots] = useState([]);

    const url = `http://localhost:5000/user-spot?user_email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log('Fetched data:', data);
                setSpots(data);
            })
    }, [url]);

    return (
        <div className="max-w-5xl mx-auto">
            <Helmet>
                <title>My List</title>
            </Helmet>

            <h2 className="text-center text-3xl font-semibold mb-8 underline decoration-customLightBrown underline-offset-8">My added list</h2>

            <div className="overflow-x-auto my-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Spot Name</th>
                            <th>Country</th>
                            <th>Location</th>
                            <th>Delete Action</th>
                            <th>Update Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            spots.map((spot, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center gap-3 avatar">
                                            <div className="w-14 rounded">
                                                <img src={spot?.image} alt={spot?.tourists_spot_name} />
                                            </div>
                                            <span className="font-semibold">{spot?.tourists_spot_name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-semibold text-gray-400">
                                            {spot?.country_Name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-semibold text-gray-400">
                                            {spot?.location}
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-error text-white">Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-info text-white">Update</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
            {
                spots.length == 0 &&
                <div className="my-10 text-center">
                    <p className=" text-3xl font-semibold text-customSandyBrown">
                        You have not added any tourist spots yet <br />
                    </p>
                    <Link to='/add-tourists-spot' className="btn btn-sm bg-customPaleBeige hover:bg-customSandyBrown text-white mt-2">Add Tourist Spot</Link>
                </div>
            }
        </div>
    );

};

export default MyList;
