

const services = [
    {
        icon: '🏨', 
        title: 'Hotel Booking',
        description: "Find and book the perfect hotel for your stay, from luxury to budget options worldwide. Enjoy exclusive deals and flexible booking options."
    },
    {
        icon: '✈️',
        title: 'Flight Booking',
        description: "Quickly compare and book flights with ease to your favorite destinations. Benefit from competitive fares and reliable service."
    },
    {
        icon: '🎫',
        title: 'Ticket Booking',
        description: "Get tickets for concerts, sports, and live events with a simple and secure booking process. Experience hassle-free access to top events."
    },
    {
        icon: '🗺',
        title: 'Amazing Tour',
        description: "Join exciting tours and explore new places, making unforgettable memories. Discover hidden gems with our expertly curated itineraries."
    }
];

const Services = () => {
    return (
        <div className="container mx-auto px-2 py-12">
            <h2 className="text-center text-3xl font-semibold mb-8 underline decoration-customLightBrown underline-offset-8">Our Tour Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {services.map((service, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-500">
                        <div className="text-purple-600 text-6xl mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;