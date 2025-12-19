import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Search } from "lucide-react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

const AIRecommendations = () => {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const getRecommendations = async (e) => {
        e?.preventDefault();
        if (!query.trim()) {
            toast.error("Please enter what you're looking for");
            return;
        }

        setLoading(true);
        setShowRecommendations(true);
        try {
            const response = await axios.post("/ai/gpt/recommendations", { query });
            setProducts(response.data.products);
            if (response.data.products.length === 0) {
                toast.info("No products found matching your query");
            } else {
                toast.success(`Found ${response.data.products.length} recommendations`);
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to get recommendations");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className='my-8 bg-gray-800 rounded-lg p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='flex items-center gap-2 mb-4'>
                <Sparkles className='h-6 w-6 text-emerald-400' />
                <h2 className='text-2xl font-bold text-emerald-400'>AI-Powered Product Search</h2>
            </div>
            <p className='text-gray-300 mb-6'>
                Describe what you're looking for in natural language, and our AI will find the perfect products for you!
            </p>

            <form onSubmit={getRecommendations} className='flex gap-2 mb-6'>
                <div className='flex-1 relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input
                        type='text'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., 'Something warm for winter' or 'Elegant formal wear'"
                        className='w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                    />
                </div>
                <button
                    type='submit'
                    disabled={loading || !query.trim()}
                    className='bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'
                >
                    {loading ? (
                        <>
                            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                            <span>Searching...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className='h-5 w-5' />
                            <span>Find Products</span>
                        </>
                    )}
                </button>
            </form>

            {loading && (
                <div className='flex justify-center py-8'>
                    <LoadingSpinner />
                </div>
            )}

            {showRecommendations && !loading && products.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className='text-xl font-semibold mb-4 text-gray-200'>
                        Recommended Products ({products.length})
                    </h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </motion.div>
            )}

            {showRecommendations && !loading && products.length === 0 && (
                <div className='text-center py-8 text-gray-400'>
                    <p>No products found. Try a different search query.</p>
                </div>
            )}
        </motion.div>
    );
};

export default AIRecommendations;

