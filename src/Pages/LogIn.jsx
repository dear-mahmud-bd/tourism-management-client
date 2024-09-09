import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthProvider';
import useTogglePassword from '../utility/useTogglePassword';
import { BiLogIn } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { showToast } from '../utility/useToast';
import Others from '../Layouts/Accounts/Others';

const LogIn = () => {
    const { loading, userSignIn } = useContext(AuthContext);
    const [passwordVisible, togglePasswordVisibility] = useTogglePassword();

    const navigate = useNavigate();
    const location = useLocation();
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        const { email, password } = formData;
        userSignIn(email, password)
            .then(() => {
                showToast('success','Log In Successfully');
                navigate(location?.state ? location.state : '/profile');
            })
            .catch(() => {
                showToast('error','Invalid Email or Password');
            });
    };
    return (
        <div className="my-0 sm:my-10 lg:w-1/2 xl:w-5/12 mx-auto">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Log In</title>
            </Helmet>
            <h1 className="text-3xl xl:text-4xl font-extrabold text-center mb-5">Welcome back</h1>

            <div className="mx-auto max-w-md bg-white p-5 rounded">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register('email', {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i, message: "Invalid email address"
                            }
                        })} type="email" placeholder="Email" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <div className="relative">
                        <input
                            {...register('password', {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })} type={passwordVisible ? "text" : "password"} placeholder="Password" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" />
                        <span onClick={togglePasswordVisibility} className="absolute right-3 top-8 cursor-pointer text-3xl">
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <button type='submit' className="mt-5 tracking-wide font-semibold bg-customPaleBeige text-gray-100 w-full py-4 rounded-lg hover:bg-customSandyBrown transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                        <BiLogIn className='text-2xl' />
                        <span className="ml-3"> {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Log In'} </span>
                    </button>
                </form>

                <p className="mt-5 text-xs text-gray-600 text-center ">
                    Don&apos;t have an account? <Link to='/register' className="border-b border-gray-500">Register</Link>
                </p>
                
                <Others></Others>
            </div>
        </div>
    );
};

export default LogIn;