import { Helmet } from "react-helmet";
import Banner from "../Layouts/Home/Banner";
import Countries from "../Layouts/Home/Countries";
import Hero from "../Layouts/Home/Hero";
import Services from "../Layouts/Home/Services";
import TouristsSpot from "../Layouts/Home/TouristsSpot";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <Services></Services>
            <TouristsSpot></TouristsSpot>
            <Hero></Hero>
            <Countries></Countries>
        </div>
    );
};

export default Home;