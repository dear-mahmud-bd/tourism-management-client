/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from 'react-helmet';
import err from '../../assets/error.png'

const NotFound = () => {
    return (
        <div className='text-center flex flex-col items-center justify-center h-96 md:h-[500px]'>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <img src={err} className='w-3/5 md:w-2/5' alt="" />
            <p className='text-lg md:text-xl font-semibold text-gray-600 mt-2'>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;