import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet';
import useTogglePassword from '../utility/useTogglePassword';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { showToast } from '../utility/useToast';
import Others from '../Layouts/Accounts/Others';


const Register = () => {
    const { loading, createUser, userUpdateProfile } = useContext(AuthContext);

    const [passwordVisible, togglePasswordVisibility] = useTogglePassword();
    const [confirmPasswordVisible, toggleConfirmPasswordVisibility] = useTogglePassword();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = watch('password');

    const onSubmit = (formData) => {
        const { name, url, email, password } = formData;
        // create user
        createUser(email, password)
            .then(result => {
                // eslint-disable-next-line no-unused-vars
                const user = result.user;
                userUpdateProfile(name, url)
                    .then(() => {
                        showToast('success', 'Profile Updated');
                    }).catch(() => {
                        showToast('warn', 'Profile Not Updated');
                    });

                showToast('success', 'Account Created Successfully');
                
                
            })
            .catch(error => {
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    showToast('error', 'Email already in use.');
                } else {
                    showToast('error', 'Something went wrong! Try again.');
                }
            });
    };

    return (
        <div className="my-0 sm:my-10 lg:w-1/2 xl:w-5/12 mx-auto">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-center mb-5">Register</h1>
            <div className="mx-auto max-w-md bg-white p-5 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register('name', { required: true })}
                        type="text" placeholder="Name" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}

                    <input
                        {...register('url', { required: true })}
                        type="url" placeholder="Enter your photo URL" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                    {errors.url && <p className="text-red-500 text-sm">Photo URL is required.</p>}

                    <input
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Enter a valid email address',
                            },
                        })} type="email" placeholder="Email" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                    {errors.email && <p className="text-red-500 text-sm">Valid email is required.</p>}

                    {/* Password */}
                    <div className="relative">
                        <input
                            {...register('password', {
                                required: true,
                                minLength: {
                                    value: 8, message: 'Password must be at least 8 characters',
                                },
                                validate: {
                                    hasNumber: (value) => /[0-9]/.test(value) || 'Password must have a number',
                                    hasLowerCase: (value) => /[a-z]/.test(value) || 'Password must have a lowercase letter',
                                    hasUpperCase: (value) => /[A-Z]/.test(value) || 'Password must have an uppercase letter',
                                    hasSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must have a special character',
                                },
                            })} type={passwordVisible ? "text" : "password"} placeholder="Password" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        />
                        <span onClick={togglePasswordVisibility} className="absolute right-3 top-8 cursor-pointer text-3xl">
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            {...register('confirmPassword', {
                                required: true,
                                validate: (value) => value === password || 'Passwords do not match',
                            })} type={confirmPasswordVisible ? "text" : "password"} placeholder="Confirm Password" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" />
                        <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-8 cursor-pointer text-3xl">
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                    <button className="mt-5 tracking-wide font-semibold bg-customPaleBeige text-gray-100 w-full py-4 rounded-lg hover:bg-customSandyBrown transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" >
                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /> <circle cx="8.5" cy="7" r="4" /> <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3"> {loading ? 'Loading...' : 'Register'}  </span>
                    </button>
                </form>

                <p className="mt-5 text-xs text-gray-600 text-center">
                    Already have an account? <Link to='/login' className="border-b border-gray-500">Log In</Link>
                </p>
                <Others></Others>
            </div>
        </div>
    );
};

export default Register;