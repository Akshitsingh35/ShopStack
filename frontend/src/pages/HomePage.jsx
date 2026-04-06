import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import AIRecommendations from "../components/AIRecommendations";

const categories = [
    { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
    { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
    { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
    { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8 lg:py-16'>
        <section className='grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className='max-w-3xl'
          >
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100'>
              <Sparkles size={16} />
              Curated fashion, sharper motion, cleaner experience
            </div>
            <h1 className='text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl'>
              Build your next look with a
              <span className='text-gradient block pb-2'>modern storefront feel.</span>
            </h1>
            <p className='mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl'>
              Discover statement essentials, polished layers, and trend-led accessories through an interface
              designed to feel premium, fluid, and current.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-4'>
              <a
                href='#categories'
                className='rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200'
              >
                Browse Collection
              </a>
              <div className='flex items-center gap-2 text-sm text-slate-300'>
                <ArrowRight size={16} className='text-amber-200' />
                Animated cards, cleaner surfaces, faster visual hierarchy
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className='surface-outline glass-panel relative overflow-hidden rounded-[2rem] p-6'
          >
            <div className='absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent' />
            <div className='grid grid-cols-2 gap-4'>
              {categories.slice(0, 4).map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 + index * 0.08 }}
                  className='rounded-3xl border border-white/10 bg-white/6 p-4'
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className='mb-4 h-32 w-full rounded-2xl object-cover'
                    loading='lazy'
                  />
                  <div className='flex items-center justify-between gap-2'>
                    <div>
                      <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>Featured</p>
                      <p className='text-lg font-semibold text-white'>{category.name}</p>
                    </div>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300/14 text-emerald-200'>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id='categories' className='space-y-5'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='text-sm uppercase tracking-[0.32em] text-emerald-200/70'>Categories</p>
              <h2 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl'>Explore the storefront</h2>
            </div>
            <p className='max-w-xl text-sm leading-7 text-slate-400'>
              Large image-led entry points with stronger contrast and hover motion make browsing feel more
              editorial.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
            {categories.map((category, index) => (
              <CategoryItem category={category} key={category.name} index={index} />
            ))}
          </div>
        </section>

        {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}

        <div className='pb-10'>
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
