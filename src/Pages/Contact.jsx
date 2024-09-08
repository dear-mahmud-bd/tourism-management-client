import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineEmail, MdOutlineLocationCity, MdOutlinePhone } from "react-icons/md";
import { AuthContext } from '../providers/AuthProvider';
import { showToast } from '../utility/useToast';
import { Helmet } from 'react-helmet';
import { Typewriter } from 'react-simple-typewriter';

const Contact = () => {
    const { user } = useContext(AuthContext);
    const isLoged = !!user;
    // console.log(user);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        setValue('fullName', user?.displayName || '');
        setValue('email', user?.email || '');
    }, [user, setValue]);

    const handleContactForm = (formData) => {
        console.log(formData);
        showToast('success', 'Message sent successfully!');
        if (isLoged) {
            reset({
                fullName: user?.displayName || '',
                email: user?.email || '',
                message: ''
            });
        } else {
            reset();
        }
    };

    return (
        <div>
            <Helmet>
                <title>Contact Us</title>
            </Helmet>
            <div className="grid max-w-6xl grid-cols-1 p-6 bg-white rounded-md shadow-lg mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div className="py-6 md:py-0 md:px-6 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold">Get in touch</h1>
                    <p className="pt-2 pb-4 text-lg">
                        <Typewriter
                            words={[
                                'Fill in the form to start a conversation...',
                                'Let us help you with your queries...',
                                'We are just a few clicks away...',
                                'Reach out to us anytime...'
                            ]}
                            loop={true}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </p>
                    <div className="space-y-4">
                        <p className="flex items-center">
                            <MdOutlineLocationCity className="text-xl mr-2" />
                            <span>Falguni Housing, Niribili, Savar, Dhaka</span>
                        </p>
                        <p className="flex items-center">
                            <MdOutlinePhone className="text-xl mr-2" />
                            <span>+880 1715 567 401</span>
                        </p>
                        <p className="flex items-center">
                            <MdOutlineEmail className="text-xl mr-2" />
                            <span>dearmahmud.bd@gmail.com</span>
                        </p>
                    </div>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit(handleContactForm)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                {...register('fullName', { required: 'Full name is required' })}
                                type="text"
                                disabled={isLoged}
                                className={`w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${isLoged ? 'cursor-not-allowed' : ''}`}
                                placeholder="Enter your name"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                {...register('email', {
                                    required: 'Email address is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                                type="email"
                                disabled={isLoged}
                                className={`w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${isLoged ? 'cursor-not-allowed' : ''}`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                {...register('message', { required: 'Message is required' })}
                                className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                placeholder="Your Message ..."
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                        </div>
                        <button type="submit" className="btn bg-customPaleBeige hover:bg-customSandyBrown text-white w-full mt-4">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
