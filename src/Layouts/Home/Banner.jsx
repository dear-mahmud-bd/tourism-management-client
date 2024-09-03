import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Indonesia from '../../assets/indonesia.jpg'
import Malaysia from '../../assets/malaysia.jpg'
import Vietnam from '../../assets/vietnam.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Banner = () => {
    const slides = [
        {
            image: Indonesia,
            heading: 'Unveil the Mystique of Indonesia',
            description: 'Discover the beauty of Bali, the cultural heritage of Borobudur Temple, the unique Komodo National Park, the stunning Raja Ampat Islands, and the historic city of Yogyakarta.',
        },
        {
            image: Malaysia,
            heading: 'Discover the Marvels of Malaysia',
            description: 'Experience the vibrant city life in Kuala Lumpur, the relaxing beaches of Langkawi, the cultural richness of Penang, the cool highlands of Cameron Highlands, and the adventure of Taman Negara National Park.',
        },
        {
            image: Vietnam,
            heading: 'Timeless Beauty of Vietnam',
            description: 'Embark on a journey to Ha Long Bay\'s stunning limestone islands, explore the bustling streets of Ho Chi Minh City, visit the ancient town of Hoi An, discover the caves of Phong Nha, and cruise the Mekong Delta.',
        },
    ];

    return (
        <div>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={true}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                style={{ width: '100%', height: '500px' }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={slide.image} alt={slide.heading} className="w-full h-full object-cover" />
                        <div className="absolute bg-gray-700 text-white inset-0 bg-opacity-50 flex flex-col justify-center items-center text-center p-4 space-y-8">
                            <h2 className="text-5xl font-bold">{slide.heading}</h2>
                            <p className="mt-2 md:w-10/12 text-lg ">{slide.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;