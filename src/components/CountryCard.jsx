import PropTypes from 'prop-types';

const CountryCard = ({ country }) => {
    const { country: ctry, image, description } = country;
    return (
        <div>
            <article className="mx-auto w-full h-80 shadow-xl bg-cover bg-center transform duration-500 cursor-pointer group"
                style={{ backgroundImage: `url(${image})` }}
            >
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
        </div>
    );
};

CountryCard.propTypes = {
    country: PropTypes.object,
};

export default CountryCard;
