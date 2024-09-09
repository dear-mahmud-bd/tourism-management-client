import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../utility/useToast";
import { AuthContext } from "../../providers/AuthProvider";

import google from '../../assets/google.png';
import github from '../../assets/github.png';

const Others = () => {
    const { userSignInWithGoogle, userSignInWithGithub } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleSignIn = () => {
        userSignInWithGoogle()
            .then(() => {
                showToast('success', 'Sign In with Google');
                navigate(location?.state ? location.state : '/profile');
            })
            .catch(() => {
                showToast('error', 'Not Sign In via Google');
            });
    };

    const handleGithubSignIn = () => {
        userSignInWithGithub()
            .then(() => {
                showToast('success', 'Sign In with GitHub');
                navigate(location?.state ? location.state : '/profile');
            })
            .catch(() => {
                // console.error("GitHub Sign-In Error:", error);
                showToast('error', 'Failed to Sign In via GitHub.');
            });
    };

    return (
        <>
            <div className="mb-5 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-2/3">
                    Or
                </div>
            </div>
            <div className="flex flex-col items-center mb-2">
                <button onClick={handleGoogleSignIn} className="w-full max-w-md font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                        <img src={google} className="w-4" alt="" />
                    </div>
                    <span className="ml-4">
                        Continue with Google
                    </span>
                </button>

                <button onClick={handleGithubSignIn} className="w-full max-w-md font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="bg-white p-1 rounded-full">
                        <img src={github} className="w-5" alt="" />
                    </div>
                    <span className="ml-4">
                        Continue with GitHub
                    </span>
                </button>
            </div>
        </>
    );
};

export default Others;
