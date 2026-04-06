import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");
                setRecommendations(res.data);
            } catch (error) {
                toast.error(error.response.data.message || "An error occurred while fetching recommendations");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className='mt-8'>
            <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                    <p className='text-sm uppercase tracking-[0.28em] text-emerald-200/70'>Recommended</p>
                    <h3 className='text-2xl font-semibold text-white'>People also bought</h3>
                </div>
                <p className='max-w-xl text-sm leading-7 text-slate-400'>
                    Suggestions inherit the upgraded product card system so this section feels integrated with the rest of the storefront.
                </p>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};
export default PeopleAlsoBought;
