import PropTypes from 'prop-types';
import { BiLocationPlus } from 'react-icons/bi';

const TouristSpotCard = ({ spot }) => {
    const {
        _id,
        image,
        location,
        tourists_spot_name,
        short_description,
        country_Name,
        average_cost,
        seasonality,
    } = spot;

    const handleViewDetails = (_id) => {
        console.log(_id);
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
            
            <div className="relative">
                <img src={image} alt={tourists_spot_name} className="w-full h-48 object-cover" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 text-sm flex items-center gap-2">
                    <BiLocationPlus /> {location}
                </div>
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold">{tourists_spot_name}</h3>
                <p className="text-sm text-gray-600 mt-1">{short_description}</p>
                <p className="text-sm text-gray-600 font-semibold mt-auto">
                    Country: <span className='text-customLightBrown'>{country_Name}</span>
                </p>

                <div className="text-xl font-bold text-customLightBrown mt-2 flex items-end gap-2">
                    ${average_cost}.00 <p className="text-sm text-gray-500">Price starts from</p>
                </div>

                <div className="mt-2">
                    <span className="text-sm text-gray-500">Best visited in: </span>
                    <span className="text-sm font-semibold">{seasonality}</span>
                </div>

                <button onClick={() => handleViewDetails(_id)} className="mt-4 w-full bg-customSandyBrown text-white py-2 px-4 rounded-lg hover:bg-customLightBrown" >
                    View Details
                </button>
            </div>
        </div>
    );
};

TouristSpotCard.propTypes = {
    spot: PropTypes.object,
};

export default TouristSpotCard;
