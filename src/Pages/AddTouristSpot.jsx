import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import { showToast } from '../utility/useToast';

const AddTouristSpot = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();
    useEffect(() => {
        setValue('user_email', user?.email || '');
        setValue('user_name', user?.displayName || '');
    }, [user, setValue]);


    const onSubmit = (formData) => {
        // console.log(formData);
        setLoading(true);
        fetch('https://tourism-server-01.vercel.app/all-spot', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Tourist Spot Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Okay',
                        customClass: {
                            confirmButton: 'btn btn-success text-white'
                        }
                    });
                    reset({
                        user_email: formData.user_email,
                        user_name: formData.user_name,
                        image: '',
                        tourists_spot_name: '',
                        country_Name: '',
                        location: '',
                        short_description: '',
                        average_cost: '',
                        seasonality: '',
                        travel_time: '',
                        totalVisitorsPerYear: '',
                    });
                }
            })
            .catch(() => {
                showToast('error', 'An error occurred while added the spot.');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
    if (loading) return <Loading />;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <Helmet>
                <title>Add Tourist Spot</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center ">Add Tourist Spot</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4">


                <div>
                    <label className="block text-gray-700 font-semibold">Tourist Spot Name</label>
                    <input
                        type="text"
                        {...register('tourists_spot_name', {
                            required: 'Tourist Spot Name is required',
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter Tourist Spot Name"
                    />
                    {errors.tourists_spot_name && <p className="text-red-600">{errors.tourists_spot_name.message}</p>}
                </div>


                <div>
                    <label className="block text-gray-700 font-semibold">Country Name</label>
                    <input
                        type="text"
                        {...register('country_Name', {
                            required: 'Country Name is required',
                            validate: (value) =>
                                ['bangladesh', 'cambodia', 'indonesia', 'malaysia', 'thailand', 'vietnam'].includes(value.toLowerCase()) ||
                                'The value must be a valid country (Bangladesh, Cambodia, Indonesia, Malaysia, Thailand, Vietnam)',
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter Country Name"
                    />
                    {errors.country_Name && <p className="text-red-600">{errors.country_Name.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold">Location</label>
                    <input
                        type="text"
                        {...register('location', {
                            required: 'Location is required',
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter Location"
                    />
                    {errors.location && <p className="text-red-600">{errors.location.message}</p>}
                </div>

                <div className="md:col-span-1">
                    <label className="block text-gray-700 font-semibold">Image URL</label>
                    <input
                        type="url"
                        {...register('image', {
                            required: 'Image URL is required',
                            pattern: {
                                value: /^(ftp|http|https):\/\/[^ "]+$/,
                                message: 'Enter a valid URL',
                            },
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter Image URL"
                    />
                    {errors.image && <p className="text-red-600">{errors.image.message}</p>}
                </div>


                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold">Short Description</label>
                    <textarea
                        {...register('short_description', {
                            required: 'Short Description is required',
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter Short Description"
                    />
                    {errors.short_description && <p className="text-red-600">{errors.short_description.message}</p>}
                </div>


                <div>
                    <label className="block text-gray-700 font-semibold">$ Average Cost</label>
                    <input
                        type="number"
                        {...register('average_cost', {
                            required: 'Average Cost is required',
                            min: {
                                value: 10,
                                message: 'Cost must be at least $10',
                            },
                            validate: value => value > 0 || 'Cost must be a positive number',
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter Average Cost"
                    />
                    {errors.average_cost && <p className="text-red-600">{errors.average_cost.message}</p>}
                </div>


                <div>
                    <label className="block text-gray-700 font-semibold">Seasonality</label>
                    <input
                        type="text"
                        {...register('seasonality', {
                            required: 'Seasonality is required',
                            validate: (value) =>
                                ['summer', 'winter', 'spring', 'autumn'].includes(value.toLowerCase()) ||
                                'Seasonality must be summer, winter, spring, or autumn',
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="e.g., summer, winter"
                    />
                    {errors.seasonality && <p className="text-red-600">{errors.seasonality.message}</p>}
                </div>


                <div>
                    <label className="block text-gray-700 font-semibold">Travel Time (e.g., 7 days)</label>
                    <input
                        type="text"
                        {...register('travel_time', {
                            required: 'Travel Time is required',
                            pattern: {
                                value: /^[0-9]+\s?days?$/,
                                message: 'Enter travel time in days, e.g., "7 days"',
                            },
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter Travel Time"
                    />
                    {errors.travel_time && <p className="text-red-600">{errors.travel_time.message}</p>}
                </div>


                <div>
                    <label className="block text-gray-700 font-semibold">Total Visitors Per Year</label>
                    <input
                        type="number"
                        {...register('totalVisitorsPerYear', {
                            required: 'Total Visitors Per Year is required',
                            min: {
                                value: 1,
                                message: 'Visitors must be at least 1',
                            },
                        })}
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter Total Visitors Per Year"
                    />
                    {errors.totalVisitorsPerYear && <p className="text-red-600">{errors.totalVisitorsPerYear.message}</p>}
                </div>


                <div>
                    <label className="block text-gray-700 font-semibold">User Email</label>
                    <input
                        type="email"
                        {...register('user_email', {
                            required: 'User Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        })}
                        disabled
                        className="w-full cursor-not-allowed px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter User Email"
                    />
                    {errors.user_email && <p className="text-red-600">{errors.user_email.message}</p>}
                </div>


                <div>
                    <label className="block text-gray-700 font-semibold">User Name</label>
                    <input
                        type="text"
                        {...register('user_name', {
                            required: 'User Name is required',
                        })}
                        disabled
                        className="w-full cursor-not-allowed px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Enter User Name"
                    />
                    {errors.user_name && <p className="text-red-600">{errors.user_name.message}</p>}
                </div>


                <div className="md:col-span-2 text-center">
                    <button type="submit" className="mt-4 px-6 py-3 bg-customPaleBeige text-white font-semibold rounded-md hover:bg-customSandyBrown transition duration-300" >
                        Add Spot
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTouristSpot;
