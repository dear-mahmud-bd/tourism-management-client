import { PiPlayCircleBold } from 'react-icons/pi';
import travelImage from '../../assets/travel.png';

const Hero = () => {
    return (
        <div className="relative bg-cover bg-center h-[600px] w-full flex items-center rounded-md p-4" style={{ backgroundImage: `url(${travelImage})` }}>
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">

                <div className="md:w-1/2">
                    <h3 className="text-customLightBrown text-lg mb-2">Find your best travel place</h3>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Prepare yourself and let&apos;s enjoy the beauty of the world</h1>
                    <p className="text-customLightBrown mb-6">Sint est eu sit ipsum enim amet esse sunt incididunt. Occaecat aliquip commodo ipsum officia in Lorem commodo aliquip dolore. Nisi domip excepteur commodo ea nostrud mollit.</p>
                    <button className="bg-customSandyBrown hover:bg-customLightBrown text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
                        <PiPlayCircleBold className='text-2xl'></PiPlayCircleBold> Play Video
                    </button>
                </div>


                <div className="mt-8 md:mt-0 flex justify-center md:justify-end w-full md:w-1/2 space-x-4">
                    <div className="bg-white text-center rounded-lg shadow-lg p-4 w-28">
                        <h3 className="text-2xl font-bold">12K</h3>
                        <p className="text-customLightBrown">Local_Guides</p>
                    </div>
                    <div className="bg-white text-center rounded-lg shadow-lg p-4 w-28">
                        <h3 className="text-2xl font-bold">750+</h3>
                        <p className="text-customLightBrown">Destinations</p>
                    </div>
                    <div className="bg-white text-center rounded-lg shadow-lg p-4 w-28">
                        <h3 className="text-2xl font-bold">100%</h3>
                        <p className="text-customLightBrown">Happiness</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
