import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();

  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  return (
    <div className='min-h-screen'>
      <div className='relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16'>
        <motion.div
          className='mb-10 flex flex-col gap-4'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100'>
            <Sparkles size={16} />
            Category showcase
          </div>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
            <h1 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl'>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <p className='max-w-2xl text-sm leading-7 text-slate-400 sm:text-base'>
              Cleaner product framing, stronger pricing emphasis, and more polished hover motion across the catalog.
            </p>
          </div>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {products?.length === 0 && (
            <div className='glass-panel col-span-full rounded-[2rem] px-6 py-14 text-center'>
              <h2 className='text-3xl font-semibold text-white'>No products found</h2>
              <p className='mt-3 text-slate-400'>This category is empty right now.</p>
            </div>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
export default CategoryPage;
