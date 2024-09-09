import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { showToast } from "../utility/useToast";
import Loading from "../components/Loading";

const MyList = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [spots, setSpots] = useState([]);

    const url = `https://tourism-server-01.vercel.app/user-spot?user_email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log('Fetched User data:', data);
                setSpots(data);
                setLoading(false);
            })
    }, [url]);

    const handleSpotDelete = (name, _id) => {
        // console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete '${name}' spot! `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33333',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://tourism-server-01.vercel.app/all-spot/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            showToast('success', 'Your tourist spot has been deleted.');
                            const remaining = spots.filter(cof => cof._id !== _id);
                            setSpots(remaining);
                        }
                    })
            }
        })
    };

    if (loading)return <Loading />;

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
                                        <button onClick={() => handleSpotDelete(spot?.tourists_spot_name, spot?._id)} className="btn btn-error text-white">Delete</button>
                                    </td>
                                    <td>
                                        <Link to={`/update-spot/${spot?._id}`}>
                                            <button className="btn btn-info text-white">Update</button>
                                        </Link>
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
