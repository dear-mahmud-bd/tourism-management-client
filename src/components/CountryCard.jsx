import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const CountryCard = ({ country }) => {
    const { country: ctry, image, description, slug } = country;

    const navigate = useNavigate();
    const handleCardClick = (slug) => {
        navigate(`/tourists-spot?country=${slug}`);
    };

    return (
        <div onClick={() => handleCardClick(slug)}>
            <article data-tooltip-id="my-tooltip" data-tooltip-content={`Click to see all tourist spot in ${ctry}`} className="mx-auto w-full h-80 shadow-xl bg-cover bg-center transform duration-500 cursor-pointer group"
                style={{ backgroundImage: `url(${image})` }}>
                <div className="bg-black bg-opacity-20 h-full px-10 flex flex-wrap flex-col justify-end hover:bg-opacity-75 transform duration-300">
                    <h1 className="text-white text-3xl mb-5 transform translate-y-12 group-hover:translate-y-0 duration-300">
                        {ctry}
                    </h1>
                    <div className="w-16 h-2 bg-red-500 rounded-full mb-5 transform translate-y-12 group-hover:translate-y-0 duration-300">
                    </div>
                    <p className="opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500 mb-5">
                        {description}
                    </p>
                </div>
            </article>
            <Tooltip id="my-tooltip" />
        </div>
    );
};

CountryCard.propTypes = {
    country: PropTypes.object,
};

export default CountryCard;
