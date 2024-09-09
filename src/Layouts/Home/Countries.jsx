import axios from "axios";
import { useEffect, useState } from "react";
import CountryCard from "../../components/CountryCard";
import Loading from "../../components/Loading";


const Countries = () => {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // const res = await axios.get('https://tourism-server-01.vercel.app/all-country');
            const res = await axios.get('countries.json');
            setCountries(res.data);
            setLoading(false);
        };
        fetchData();
    }, []);
    // console.log(countries);

    if (loading) return <Loading />;

    return (
        <div>
            <h2 className="text-center text-3xl font-semibold mt-8 underline decoration-customLightBrown underline-offset-8">Explore Southeast Asia Country</h2>
            <section className="container mx-auto p-6 px-0 antialiased">
                <section className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10">
                    {countries.map((country, index) => (
                        <CountryCard key={index} country={country} />
                    ))}
                </section>
            </section>
        </div>
    );
};

export default Countries;