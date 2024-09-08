import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { showToast } from '../utility/useToast';
import { AuthContext } from '../providers/AuthProvider';

const UserProfile = () => {
    const { user, loading, setUser, userUpdateProfile } = useContext(AuthContext);
    console.log(user);
    

    const { register, handleSubmit, setValue } = useForm();
    useEffect(() => {
        setValue('newName', user?.displayName || '');
        setValue('photoUrl', user?.photoURL || '');
    }, [user, setValue]);

    const handleUpdateProfile = (formData) => {
        const { newName, photoUrl } = formData;

        userUpdateProfile(newName, photoUrl)
            .then(() => {
                setUser(prevUser => ({
                    ...prevUser,
                    displayName: newName,
                    photoURL: photoUrl,
                }));
                showToast('success','Account Updated Successfully');
            }).catch(() => {
                showToast('error','Something Went Wrong! Try Again');
            });
    };

    return (
        <div>
            <Helmet>
                <title>My Profile</title>
            </Helmet>

            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row bg-white border p-2 rounded-lg overflow-hidden">
                    <div className="md:w-1/2 p-6 flex justify-center items-center bg-gray-100">
                        <div className='flex flex-col items-center'>
                            <img src={user?.photoURL} alt="User Profile" className="w-32 h-32 rounded-full shadow-md" />
                            <h2 className="text-2xl font-semibold mt-4">{user?.displayName}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                    </div>


                    <div className="md:w-1/2 p-6">
                        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

                        <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Name</label>
                                <input {...register('newName', { required: true })}
                                    type="text" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Photo URL</label>
                                <input {...register('photoUrl', { required: true })}
                                    type="url" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" placeholder="Enter your photo URL" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" placeholder={user?.email} disabled className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white hover:cursor-not-allowed" />
                            </div>
                            <button type="submit" className="btn bg-customPaleBeige hover:bg-customSandyBrown text-white w-full mt-4" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
