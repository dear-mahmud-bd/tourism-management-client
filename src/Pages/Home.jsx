import Banner from "../Layouts/Home/Banner";
import Countries from "../Layouts/Home/Countries";
import Hero from "../Layouts/Home/Hero";
import Services from "../Layouts/Home/Services";
import TouristsSpot from "../Layouts/Home/TouristsSpot";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <TouristsSpot></TouristsSpot>
            <Hero></Hero>
            <Countries></Countries>
        </div>
    );
};

export default Home;